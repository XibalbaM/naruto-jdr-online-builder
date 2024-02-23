import {expect, Mock, test} from "vitest";

import VillageModel from "../../models/village.model";
import Character from "../../classes/character.class";
import ClanModel from "../../models/clan.model";
import CharacterModel from "../../models/character.model";
import RankModel from "../../models/rank.model";
import {authenticateRequest, createMockRequest, createMockResponse} from "../../utils/tests.utils.js";
import {getTestToken, getTestUserId} from "../../utils/test.data";
import * as CharacterController from "../../controllers/characters.controller";
import UserModel from "../../models/user.model";
import User from "../../classes/user.class";
import {CustomSkillModel} from "../../models/skill.model";
import {CustomSkill} from "../../classes/skill.class";
import ChakraSpeModel from "../../models/chakraSpe.model";
import ChakraSpe from "../../classes/chakraSpe.class";
import RoadModel from "../../models/road.model";

const characterData: Omit<Character, "_id" | "bases" | "commonSkills" | "customSkills" | "chakraSpes" | "nindoPoints" | "isPredrawn"> = {
    firstName: "test",
    village: (await VillageModel.findOne().lean().select("_id"))._id,
    xp: 100,
    rank: (await RankModel.findOne().lean().select("_id"))._id,
    notes: "test",
    nindo: "test",
    clan: (await ClanModel.findOne({}).lean().select("_id"))._id
};

test("Create", async () => {
    let request = createMockRequest({body: {character: characterData}}, await getTestToken())
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.create(request, response);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith({character: expect.objectContaining(characterData)});
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
    let request = createMockRequest({params: {id: (await CharacterModel.findOne().lean().select("_id"))._id}}, await getTestToken())
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.getCharacter(request, response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith({character: expect.objectContaining(characterData)});
});

test("Copy", async () => {
    let request = createMockRequest({params: {id: (await CharacterModel.findOne().lean().select("_id"))._id}}, await getTestToken())
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.copyCharacter(request, response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith({character: expect.objectContaining({...characterData, firstName: "(Copie) " + characterData.firstName})});
    expect(User.fromModel(await UserModel.findById(await getTestUserId()).lean().select("characters")).characters).toSatisfy((characters: String[]) => {
        console.log(characters.length);
        return characters.length === 2;
    });
});

test("Set common skill", async () => {
    let id = (await CharacterModel.findOne().lean().select("_id"))._id;

    {
        let request = createMockRequest({params: {id, skillId: 0}, body: {value: 2}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCommonSkill(request, response);
        console.log((response.json as Mock).mock.calls);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id).lean().select("commonSkills")).commonSkills[0]).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, skillId: 0}, body: {value: 0}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCommonSkill(request, response);
        expect(response.status).toBeCalledWith(400);
        expect(Character.fromModel(await CharacterModel.findById(id).lean().select("commonSkills")).commonSkills[0]).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, skillId: 0}, body: {value: 5}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCommonSkill(request, response);
        expect(response.status).toBeCalledWith(400);
        expect(Character.fromModel(await CharacterModel.findById(id).lean().select("commonSkills")).commonSkills[0]).toBe(2);
    }

    {
        await CharacterModel.findByIdAndUpdate(id, {$set: {"commonSkills.0": 10}});
        let request = createMockRequest({params: {id, skillId: 0}, body: {value: 2}}, await getTestToken())
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCommonSkill(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id).lean().select("commonSkills")).commonSkills[0]).toBe(2);
    }
});

test("Set custom skill", async () => {
    let id = (await CharacterModel.findOne().lean().select("_id"))._id;
    let skillId = CustomSkill.fromModel(await CustomSkillModel.findOne({type: "combat"}).lean().select("_id"))._id;
    let clanSkillId = CustomSkill.fromModel(await CustomSkillModel.findOne({type: "clan"}).lean().select("_id"))._id;

    {
        let request = createMockRequest({params: {id, skillId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id)).customSkills.find(({skill}) => skill.toString() === skillId.toString()).level).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, skillId}, body: {value: 0}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id)).customSkills.find(({skill}) => skill === skillId)).toBeUndefined();
    }

    {
        let request = createMockRequest({params: {id, skillId}, body: {value: 5}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.status).toBeCalledWith(400);
        expect(Character.fromModel(await CharacterModel.findById(id)).customSkills.find(({skill}) => skill === skillId)).toBeUndefined();
    }

    {
        let request = createMockRequest({params: {id, skillId: clanSkillId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.status).toBeCalledWith(400);
        expect(Character.fromModel(await CharacterModel.findById(id)).customSkills.find(({skill}) => skill === clanSkillId)).toBeUndefined();
    }

    {
        await CharacterModel.updateOne({_id: id, "customSkills.skill": skillId}, {$set: {"customSkills.$.level": 10}});
        let request = createMockRequest({params: {id, skillId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setCustomSkill(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id)).customSkills.find(({skill}) => skill.toString() === skillId.toString()).level).toBe(2);
    }
});

test("Set base", async () => {
    let id = (await CharacterModel.findOne())._id;
    let baseId = 0;

    {
        let request = createMockRequest({params: {id, baseId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setBase(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id)).bases[baseId]).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, baseId}, body: {value: 0}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setBase(request, response);
        expect(response.status).toBeCalledWith(400);
        expect(Character.fromModel(await CharacterModel.findById(id)).bases[baseId]).toBe(2);
    }

    {
        let request = createMockRequest({params: {id, baseId}, body: {value: 6}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setBase(request, response);
        expect(response.status).toBeCalledWith(400);
        expect(Character.fromModel(await CharacterModel.findById(id)).bases[baseId]).toBe(2);
    }

    {
        await CharacterModel.findByIdAndUpdate(id, {$set: {"bases.0": 10}});
        let request = createMockRequest({params: {id, baseId}, body: {value: 2}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setBase(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id)).bases[baseId]).toBe(2);
    }
});

test("Set nindo", async () => {
    let id = (await CharacterModel.findOne())._id;
    let request = createMockRequest({params: {id}, body: {text: "test1"}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setNindo(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(Character.fromModel(await CharacterModel.findById(id)).nindo).toBe("test1");
});

test("Set nindo points", async () => {
    let id = (await CharacterModel.findOne())._id;
    let request = createMockRequest({params: {id}, body: {points: 2}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setNindoPoints(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(Character.fromModel(await CharacterModel.findById(id)).nindoPoints).toBe(2);
});

test("Set spe", async () => {
    let id = (await CharacterModel.findOne())._id;
    let spe = ChakraSpe.fromModel((await ChakraSpeModel.findOne()));
    let speId = spe._id.toString();
    await CharacterModel.findByIdAndUpdate(id, {$set: {rank: await RankModel.findOne({name: "Kage"}), "bases.0": 12, "bases.1": 12}});

    for (let i = 0; i < spe.max; i++) {
        let request = createMockRequest({params: {id, speIndex: i}, body: {id: speId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setSpe(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id)).chakraSpes[i].toString()).toBe(speId.toString());
    }

    {
        let request = createMockRequest({params: {id, speIndex: spe.max}, body: {id: speId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setSpe(request, response);
        expect(response.status).toBeCalledWith(400);
        expect(Character.fromModel(await CharacterModel.findById(id)).chakraSpes.length).toBe(spe.max);
        expect(response.json).toBeCalledWith({error: "Spe already maxed"});
    }

    {
        let request = createMockRequest({params: {id, speIndex: 52}, body: {id: speId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setSpe(request, response);
        expect(response.status).toBeCalledWith(400);
        expect(Character.fromModel(await CharacterModel.findById(id)).chakraSpes[52]).toBeUndefined();
        expect(response.json).toBeCalledWith({error: "Spe not yet unlocked"});
    }

    {
        let request = createMockRequest({params: {id, speIndex: spe.max - 1}, body: {id: ""}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setSpe(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id)).chakraSpes[spe.max - 1]).toBeUndefined();
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
    let id = (await CharacterModel.findOne())._id;
    let request = createMockRequest({params: {id}, body: {text: "test1"}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setNotes(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(Character.fromModel(await CharacterModel.findById(id)).notes).toBe("test1");
});

test("Set nindo points", async () => {
    let id = (await CharacterModel.findOne())._id;
    let request = createMockRequest({params: {id}, body: {xp: 2}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setXp(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(Character.fromModel(await CharacterModel.findById(id)).xp).toBe(2);
});

test("Set rank", async () => {
    let id = (await CharacterModel.findOne())._id;
    let rankId = (await RankModel.findOne({name: "Kage"}))._id
    let request = createMockRequest({params: {id}, body: {id: rankId}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setRank(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(Character.fromModel(await CharacterModel.findById(id)).rank.toString()).toBe(rankId.toString());
});

test("Set village", async () => {
    let id = (await CharacterModel.findOne())._id;
    let villageId = (await VillageModel.findOne({name: "Suna"}))._id
    let request = createMockRequest({params: {id}, body: {id: villageId}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setVillage(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(Character.fromModel(await CharacterModel.findById(id)).village.toString()).toBe(villageId.toString());
});

test("Set name", async () => {
    let id = (await CharacterModel.findOne())._id;
    let request = createMockRequest({params: {id}, body: {text: "test1"}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setName(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(Character.fromModel(await CharacterModel.findById(id)).firstName).toBe("test1");
});

test("Set clan", async () => {
    let id = (await CharacterModel.findOne())._id;
    let clanId = (await ClanModel.findOne({name: "Nara"}))._id; //TODO add clan skills
    let request = createMockRequest({params: {id}, body: {id: clanId}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.setClan(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(Character.fromModel(await CharacterModel.findById(id)).clan.toString()).toBe(clanId.toString());
    expect(Character.fromModel(await CharacterModel.findById(id)).customSkills.length).toBe(0);
});

test("Set road", async () => {
    let id = (await CharacterModel.findOne())._id;

    {
        let roadId = (await RoadModel.findOne())._id; //TODO add road skills
        let request = createMockRequest({params: {id}, body: {id: roadId}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setRoad(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id)).road.toString()).toBe(roadId.toString());
        expect(Character.fromModel(await CharacterModel.findById(id)).customSkills.length).toBe(0);
    }

    {
        let request = createMockRequest({params: {id}, body: {id: ""}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setRoad(request, response);
        expect(response.sendStatus).toBeCalledWith(200);
        expect(Character.fromModel(await CharacterModel.findById(id)).road).toBeUndefined();
        expect(Character.fromModel(await CharacterModel.findById(id)).customSkills.length).toBe(0);
    }

    {
        let request = createMockRequest({params: {id}, body: {id: "invalid"}}, await getTestToken());
        let response = createMockResponse();
        await authenticateRequest(request, response);
        await CharacterController.setRoad(request, response);
        expect(response.status).toBeCalledWith(404);
        expect(Character.fromModel(await CharacterModel.findById(id)).road).toBeUndefined();
        expect(Character.fromModel(await CharacterModel.findById(id)).customSkills.length).toBe(0);
    }
})

test("Delete", async () => {
    let id = (await CharacterModel.findOne())._id;
    let request = createMockRequest({params: {id}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await CharacterController.deleteCharacter(request, response);
    expect(response.sendStatus).toBeCalledWith(200);
    expect(await CharacterModel.findById(id)).toBeNull();
    expect(User.fromModel(await UserModel.findById(await getTestUserId())).characters.length).toBe(1);
});