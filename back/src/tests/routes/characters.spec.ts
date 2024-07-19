import {beforeAll, expect, Mock, test} from "vitest";

import VillageModel from "../../models/village.model";
import Character from "../../interfaces/character.interface";
import ClanModel from "../../models/clan.model";
import CharacterModel from "../../models/character.model";
import RankModel from "../../models/rank.model";
import {authenticateRequest, createMockRequest, createMockResponse} from "../../utils/tests.utils.js";
import {getTestToken, getTestUserId} from "../../utils/test.data";
import * as CharacterController from "../../controllers/characters.controller";
import UserModel from "../../models/user.model";
import {CustomSkillModel} from "../../models/skill.model";
import ChakraSpeModel from "../../models/chakraSpe.model";
import RoadModel from "../../models/road.model";

const characterData: Omit<Character, "_id" | "bases" | "commonSkills" | "customSkills" | "chakraSpes" | "nindoPoints" | "shareStatus" | "createdAt" | "updatedAt"> = {
    firstName: "test",
    village: (await VillageModel.findOne().lean().select("_id"))!._id.toString(),
    xp: 100,
    rank: (await RankModel.findOne().lean().select("_id"))!._id.toString(),
    notes: "test",
    nindo: "test",
    clan: (await ClanModel.findOne({}).lean().select("_id"))!._id.toString()
};
let characterId: string;

test("Create", async () => {
    let request = createMockRequest({body: {character: characterData}}, await getTestToken())
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.create(request, response);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith({character: expect.objectContaining(characterData)});
    expect((await UserModel.findById(await getTestUserId()).lean().select("characters"))!.characters.map(value => value.toString())).toContain((response.json as Mock).mock.calls[0][0].character._id.toString());
    characterId = (response.json as Mock).mock.calls[0][0].character._id.toString();
});

test("List", async () => {
    let request = createMockRequest({}, await getTestToken())
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.getCharacters(request, response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith({characters: expect.arrayContaining([expect.objectContaining(characterData)])});
});

test("Get", async () => {
    let expectCanReadCharacter = async (characterId: string) => {
        let request = createMockRequest({params: {id: characterId}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.getCharacter(request, response);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith({character: expect.objectContaining(characterData)});
    }

    {
        await expectCanReadCharacter(characterId);
    }

    {
        let characterId = (await CharacterModel.create({...characterData, shareStatus: "private"}))._id.toString();
        let request = createMockRequest({params: {id: characterId}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.getCharacter(request, response);
        expect(response.status).toBeCalledWith(404);
        expect(response.json).toBeCalledWith({error: "Character not found"});
        await CharacterModel.findByIdAndDelete(characterId);
    }

    {
        let characterId = (await CharacterModel.create({...characterData, shareStatus: "not-referenced"}))._id.toString();
        await expectCanReadCharacter(characterId);
        await CharacterModel.findByIdAndDelete(characterId);
    }

    {
        let characterId = (await CharacterModel.create({...characterData, shareStatus: "public"}))._id.toString();
        await expectCanReadCharacter(characterId);
        await CharacterModel.findByIdAndDelete(characterId);
    }

    {
        let characterId = (await CharacterModel.create({...characterData, shareStatus: "predrawn"}))._id.toString();
        await expectCanReadCharacter(characterId);
        await CharacterModel.findByIdAndDelete(characterId);
    }
});

test("Copy", async () => {
    let request = createMockRequest({params: {id: characterId}}, await getTestToken())
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.copyCharacter(request, response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith({character: expect.objectContaining({...characterData, firstName: "(Copie) " + characterData.firstName})});
    expect((await UserModel.findById(await getTestUserId()).lean().select("characters"))!.characters).toSatisfy((characters: String[]) => {
        return characters.length >= 2;
    });
});

test("Set common skill", async () => {
    let id = characterId;

    {
        let request = createMockRequest({params: {id, skillId: 0}, body: {value: 2}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCommonSkill(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("commonSkills"))!.commonSkills[0]).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, skillId: 0}, body: {value: 0}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCommonSkill(request, response);
        expect(response.status).toBeCalledWith(400);
        expect((await CharacterModel.findById(id).lean().select("commonSkills"))!.commonSkills[0]).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, skillId: 0}, body: {value: 5}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCommonSkill(request, response);
        expect(response.status).toBeCalledWith(400);
        expect((await CharacterModel.findById(id).lean().select("commonSkills"))!.commonSkills[0]).toBe(2);
    }

    {
        await CharacterModel.findByIdAndUpdate(id, {$set: {"commonSkills.0": 10}});
        let request = createMockRequest({params: {id, skillId: 0}, body: {value: 2}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCommonSkill(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("commonSkills"))!.commonSkills[0]).toBe(2);
    }
});

test("Set custom skill", async () => {
    let id = characterId;
    let skillId = (await CustomSkillModel.findOne({type: "combat"}).lean().select("_id"))!._id;
    let clanSkillId = (await CustomSkillModel.findOne({type: "clan"}).lean().select("_id"))!._id;

    {
        let request = createMockRequest({params: {id, skillId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.find(({skill}) => skill.toString() === skillId.toString())!.level).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, skillId}, body: {value: 0}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.find(({skill}) => skill.toString() === skillId.toString())).toBeUndefined();
    }

    {
        let request = createMockRequest({params: {id, skillId}, body: {value: 5}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.status).toBeCalledWith(400);
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.find(({skill}) => skill.toString() === skillId.toString())).toBeUndefined();
    }

    {
        let request = createMockRequest({params: {id, skillId: clanSkillId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.status).toBeCalledWith(400);
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.find(({skill}) => skill.toString() === clanSkillId.toString())).toBeUndefined();
    }

    {
        await CharacterModel.updateOne({_id: id, "customSkills.skill": skillId}, {$set: {"customSkills.$.level": 10}});
        let request = createMockRequest({params: {id, skillId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.find(({skill}) => skill.toString() === skillId.toString())!.level).toBe(2);
    }
});

test("Set base", async () => {
    let id = characterId;
    let baseId = 0;

    {
        let request = createMockRequest({params: {id, baseId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setBase(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("bases"))!.bases[baseId]).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, baseId}, body: {value: 0}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setBase(request, response);
        expect(response.status).toBeCalledWith(400);
        expect((await CharacterModel.findById(id).lean().select("bases"))!.bases[baseId]).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, baseId}, body: {value: 6}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setBase(request, response);
        expect(response.status).toBeCalledWith(400);
        expect((await CharacterModel.findById(id).lean().select("bases"))!.bases[baseId]).toBe(2);
    }

    {
        await CharacterModel.findByIdAndUpdate(id, {$set: {"bases.0": 10}});
        let request = createMockRequest({params: {id, baseId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setBase(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("bases"))!.bases[baseId]).toBe(2);
    }
});

test("Set nindo", async () => {
    let id = characterId;
    let request = createMockRequest({params: {id}, body: {text: "test1"}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setNindo(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect((await CharacterModel.findById(id).lean().select("nindo"))!.nindo).toBe("test1");
});

test("Set nindo points", async () => {
    let id = characterId;
    let request = createMockRequest({params: {id}, body: {points: 2}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setNindoPoints(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect((await CharacterModel.findById(id).lean().select("nindoPoints"))!.nindoPoints).toBe(2);
});

test("Set spe", async () => {
    let id = characterId;
    let spe = (await ChakraSpeModel.findOne().lean())!;
    let speId = spe._id.toString();
    await CharacterModel.findByIdAndUpdate(id, {$set: {rank: await RankModel.findOne({name: "Kage"}), "bases.0": 12, "bases.1": 12}});

    for (let i = 0; i < spe.max; i++) {
        let request = createMockRequest({params: {id, speIndex: i}, body: {id: speId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setSpe(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("chakraSpes"))!.chakraSpes[i].toString()).toBe(speId);
    }

    {
        let request = createMockRequest({params: {id, speIndex: spe.max}, body: {id: speId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setSpe(request, response);
        expect(response.status).toBeCalledWith(400);
        expect((await CharacterModel.findById(id).lean().select("chakraSpes"))!.chakraSpes.length).toBe(spe.max);
        expect(response.json).toBeCalledWith({error: "Spe already maxed"});
    }

    {
        let request = createMockRequest({params: {id, speIndex: 52}, body: {id: speId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setSpe(request, response);
        expect(response.status).toBeCalledWith(400);
        expect((await CharacterModel.findById(id).lean().select("chakraSpes"))!.chakraSpes[52]).toBeUndefined();
        expect(response.json).toBeCalledWith({error: "Spe not yet unlocked"});
    }

    {
        let request = createMockRequest({params: {id, speIndex: spe.max - 1}, body: {id: ""}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setSpe(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("chakraSpes"))!.chakraSpes[spe.max - 1]).toBeUndefined();
    }

    {
        let request = createMockRequest({params: {id, speIndex: spe.max - 1}, body: {id: ""}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setSpe(request, response);
        expect(response.status).toBeCalledWith(400);
        expect(response.json).toBeCalledWith({error: "Spe not set"});
    }
});

test("Set notes", async () => {
    let id = characterId;
    let request = createMockRequest({params: {id}, body: {text: "test1"}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setNotes(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect((await CharacterModel.findById(id).lean().select("notes"))!.notes).toBe("test1");
});

test("Set nindo points", async () => {
    let id = characterId;
    let request = createMockRequest({params: {id}, body: {xp: 2}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setXp(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect((await CharacterModel.findById(id).lean().select("xp"))!.xp).toBe(2);
});

test("Set rank", async () => {
    let id = characterId;
    let rankId = (await RankModel.findOne({name: "Kage"}).lean().select("_id"))!._id
    let request = createMockRequest({params: {id}, body: {id: rankId}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setRank(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect((await CharacterModel.findById(id).lean().select("rank"))!.rank.toString()).toBe(rankId.toString());
});

test("Set village", async () => {
    let id = characterId;
    let villageId = (await VillageModel.findOne({name: "Suna"}).lean().select("_id"))!._id
    let request = createMockRequest({params: {id}, body: {id: villageId}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setVillage(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect((await CharacterModel.findById(id).lean().select("village"))!.village.toString()).toBe(villageId.toString());
});

test("Set name", async () => {
    let id = characterId;
    let request = createMockRequest({params: {id}, body: {text: "test1"}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setName(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect((await CharacterModel.findById(id).lean().select("firstName"))!.firstName).toBe("test1");
});

test("Set clan", async () => {
    let id = characterId;
    {
        let clanId = (await ClanModel.findOne({name: "Akaba"}).lean().select("_id"))!._id;
        let request = createMockRequest({params: {id}, body: {id: clanId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setClan(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("clan"))!.clan.toString()).toBe(clanId.toString());
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.length).toBe(0);
    }
    {
        let clanId = (await ClanModel.findOne({name: "Nara"}).lean().select("_id"))!._id;
        let request = createMockRequest({params: {id}, body: {id: clanId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setClan(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("clan"))!.clan.toString()).toBe(clanId.toString());
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.length).toBe(1);
    }
});

test("Set road", async () => {
    let id = characterId;

    {
        let roadId = (await RoadModel.findOne().lean().select("_id"))!._id;
        let request = createMockRequest({params: {id}, body: {id: roadId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setRoad(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("road"))!.road!.toString()).toBe(roadId.toString());
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.length).toBe(0);
    }

    {
        await CharacterModel.findByIdAndUpdate(id, {$set: {clan: (await ClanModel.findOne({name: "Akaba"}).lean().select("_id"))!._id}});
        let request = createMockRequest({params: {id}, body: {id: ""}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setRoad(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("road"))!.road).toBeUndefined();
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.length).toBe(0);
    }

    {
        await CharacterModel.findByIdAndUpdate(id, {$set: {clan: (await ClanModel.findOne({name: "Nara"}).lean().select("_id"))!._id}});
        let request = createMockRequest({params: {id}, body: {id: ""}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setRoad(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect((await CharacterModel.findById(id).lean().select("road"))!.road).toBeUndefined();
        expect((await CharacterModel.findById(id).lean().select("customSkills"))!.customSkills.length).toBe(1);
    }

    {
        let request = createMockRequest({params: {id}, body: {id: "invalid"}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setRoad(request, response);
        expect(response.status).toBeCalledWith(404);
    }
})

test("Set share status", async () => {
   let id = characterId;

    {
         let request = createMockRequest({params: {id}, body: {status: "public"}}, await getTestToken());
         let response = createMockResponse();
         await authenticateRequest(request, response);
         await CharacterController.setShareStatus(request, response);
         expect(response.sendStatus).toBeCalledWith(200);
         expect((await CharacterModel.findById(id).lean().select("shareStatus"))!.shareStatus).toBe("public");
    }

    {
         let request = createMockRequest({params: {id}, body: {status: "invalid"}}, await getTestToken());
         let response = createMockResponse();
         await authenticateRequest(request, response);
         await CharacterController.setShareStatus(request, response);
         expect(response.status).toBeCalledWith(400);
    }
});

test("Delete", async () => {
    let charactersCountBefore = (await UserModel.findById(await getTestUserId()).lean().select("characters"))!.characters.length;
    let request = createMockRequest({params: {id: characterId}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.deleteCharacter(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(await CharacterModel.findById(characterId)).toBeNull();
    expect((await UserModel.findById(await getTestUserId()).lean().select("characters"))!.characters.length).toBeLessThan(charactersCountBefore);
});