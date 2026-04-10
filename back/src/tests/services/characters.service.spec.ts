import {afterEach, expect, test} from "vitest";

import CharactersService from "../../services/characters.service.js";
import UserModel from "../../models/user.model.js";
import CharacterModel from "../../models/character.model.js";
import VillageModel from "../../models/village.model.js";
import RankModel from "../../models/rank.model.js";
import ClanModel from "../../models/clan.model.js";
import RoadModel from "../../models/road.model.js";
import {CustomSkillModel} from "../../models/skill.model.js";
import {getTestUserId} from "../../utils/test.data.js";
import Line from "naruto-jdr-online-builder-common/src/interfaces/line.interface";

const createdCharacterIds: string[] = [];

async function createCharacter(overrides: any = {}) {
    const village = (await VillageModel.findOne().lean().select("_id"))!._id.toString();
    const rank = (await RankModel.findOne().lean().select("_id"))!._id.toString();
    const clan = overrides.clan ?? {id: (await ClanModel.findOne().lean().select("_id"))!._id.toString()};

    const character = await CharacterModel.create({
        firstName: "Service Spec",
        village,
        xp: 100,
        rank,
        notes: "",
        nindo: "Tester nindo",
        clan,
        bases: [],
        commonSkills: [],
        customSkills: [],
        chakraSpes: [],
        ...overrides
    });

    createdCharacterIds.push(character._id.toString());
    return character;
}

async function addCharacterToTestUser(characterId: string) {
    await UserModel.findByIdAndUpdate(await getTestUserId(), {$addToSet: {characters: characterId}});
}

async function getTestUser() {
    return (await UserModel.findById(await getTestUserId()).lean())!;
}

afterEach(async () => {
    if (createdCharacterIds.length === 0) {
        return;
    }
    await CharacterModel.deleteMany({_id: {$in: createdCharacterIds}});
    await UserModel.updateMany({}, {$pull: {characters: {$in: createdCharacterIds}}});
    createdCharacterIds.length = 0;
});

test("returns a readable public character even when user is not the owner", async () => {
    const character = await createCharacter({shareStatus: "public"});
    const user = await getTestUser();

    const foundCharacter = await CharactersService.getCharacter(user, character._id.toString());

    expect(foundCharacter._id.toString()).toBe(character._id.toString());
});

test("throws when trying to read a private character that does not belong to the user", async () => {
    const character = await createCharacter({shareStatus: "private"});
    const user = await getTestUser();

    await expect(CharactersService.getCharacter(user, character._id.toString())).rejects.toThrow("Character not found");
});

test("copies a readable character with private share status and links it to the requester", async () => {
    const sourceCharacter = await createCharacter({firstName: "Original", shareStatus: "public"});
    const userBeforeCopy = await getTestUser();

    const copy = await CharactersService.copyCharacter(userBeforeCopy, sourceCharacter._id.toString());
    createdCharacterIds.push(copy._id.toString());

    const updatedUser = await getTestUser();
    expect(copy.firstName).toBe("(Copie) Original");
    expect(copy.shareStatus).toBe("private");
    expect(updatedUser.characters.map(value => value.toString())).toContain(copy._id.toString());
});

test("prevents removing a clan skill from a non-custom clan", async () => {
    const clan = (await ClanModel.findOne({name: "Nara"}).lean().select(["_id", "line"]))!;
    const clanSkillId = (clan.line as Line).skills[0];
    const character = await createCharacter({
        clan: {id: clan._id.toString()},
        customSkills: [{skill: clanSkillId, level: 1}]
    });
    await addCharacterToTestUser(character._id.toString());
    const user = await getTestUser();

    await expect(CharactersService.setCustomSkill(user, character._id.toString(), clanSkillId.toString(), 0)).rejects.toThrow("Cannot remove clan skill");
    expect((await CharacterModel.findById(character._id).lean().select("customSkills"))!.customSkills).toEqual(expect.arrayContaining([
        expect.objectContaining({skill: clanSkillId, level: 1})
    ]));
});

test("clears the road and restores clan line skills when road is unset", async () => {
    const clan = (await ClanModel.findOne({name: "Nara"}).lean().select(["_id", "line"]))!;
    const roadId = (await RoadModel.findOne().lean().select("_id"))!._id.toString();
    const randomSkillId = (await CustomSkillModel.findOne({type: "combat"}).lean().select("_id"))!._id.toString();
    const character = await createCharacter({
        clan: {id: clan._id.toString()},
        road: roadId,
        customSkills: [{skill: randomSkillId, level: 3}]
    });
    await addCharacterToTestUser(character._id.toString());
    const user = await getTestUser();

    await CharactersService.setRoad(user, character._id.toString(), "");

    const updatedCharacter = (await CharacterModel.findById(character._id).lean().select(["road", "customSkills"]))!;
    expect(updatedCharacter.road).toBeUndefined();
    expect(updatedCharacter.customSkills).toEqual(expect.arrayContaining((clan.line as Line).skills.map(skill => expect.objectContaining({skill, level: 1}))));
});

test("throws when setting a road with an invalid id", async () => {
    const character = await createCharacter();
    await addCharacterToTestUser(character._id.toString());
    const user = await getTestUser();

    await expect(CharactersService.setRoad(user, character._id.toString(), "invalid-id")).rejects.toThrow("Road not found");
});

test("builds summary names with custom and regular clan names", async () => {
    const customCharacter = await createCharacter({
        firstName: "Custom",
        clan: {id: "custom", clanName: "Hyuga Prime"}
    });
    const regularClan = (await ClanModel.findOne({name: "Nara"}).lean().select(["_id", "name"]))!;
    const regularCharacter = await createCharacter({
        firstName: "Regular",
        clan: {id: regularClan._id.toString()},
        xp: 321
    });
    await addCharacterToTestUser(customCharacter._id.toString());
    await addCharacterToTestUser(regularCharacter._id.toString());
    const user = await getTestUser();

    const summary = await CharactersService.summaryCharacters(user);

    expect(summary).toEqual(expect.arrayContaining([
        expect.objectContaining({_id: customCharacter._id.toString(), name: "Custom Hyuga Prime"}),
        expect.objectContaining({_id: regularCharacter._id.toString(), name: `Regular ${regularClan.name}`, xp: 321})
    ]));
});

test("returns only public characters with their owner name fallback", async () => {
    const publicCharacter = await createCharacter({shareStatus: "public"});
    const privateCharacter = await createCharacter({shareStatus: "private"});
    await addCharacterToTestUser(publicCharacter._id.toString());

    const characters = await CharactersService.getPublicCharacters();

    expect(characters).toEqual(expect.arrayContaining([
        expect.objectContaining({
            character: expect.objectContaining({_id: publicCharacter._id}),
            ownerName: "Ninja sans nom"
        })
    ]));
    expect(characters.find(entry => entry.character._id.toString() === privateCharacter._id.toString())).toBeUndefined();
});

