import {test, expect} from "vitest";

import CharacterModel from "../../models/character.model.js";
import VillageModel from "../../models/village.model.js";
import RankModel from "../../models/rank.model.js";
import ClanModel from "../../models/clan.model.js";
import {authenticateRequest, createMockRequest, createMockResponse} from "../../utils/tests.utils.js";
import PredrawnController from "../../controllers/predrawn.controller.js";
import {getTestToken} from "../../utils/test.data.js";
import Character from "../../interfaces/character.interface.js";

const dummyPredrawn: Omit<Character, "_id" | "bases" | "commonSkills" | "customSkills" | "chakraSpes" | "nindoPoints" | "createdAt" | "updatedAt"> = {
    firstName: "test",
    village: (await VillageModel.findOne().lean().select("_id"))!._id.toString(),
    xp: 100,
    rank: (await RankModel.findOne().lean().select("_id"))!._id.toString(),
    notes: "test",
    nindo: "test",
    clan: (await ClanModel.findOne().lean().select("_id"))!._id.toString(),
    shareStatus: "predrawn",
}
const dummyPredrawnId = (await CharacterModel.create(dummyPredrawn))._id;

const dummyCharacter: Omit<Character, "_id" | "bases" | "commonSkills" | "customSkills" | "chakraSpes" | "nindoPoints" | "createdAt" | "updatedAt" | "shareStatus"> = {
    firstName: "test",
    village: (await VillageModel.findOne().lean().select("_id"))!._id.toString(),
    xp: 100,
    rank: (await RankModel.findOne().lean().select("_id"))!._id.toString(),
    notes: "test",
    nindo: "test",
    clan: (await ClanModel.findOne().lean().select("_id"))!._id.toString(),
}
const dummyCharacterId = (await CharacterModel.create(dummyCharacter))._id;

test("List", async () => {
    let response = createMockResponse();
    await PredrawnController.list(createMockRequest(), response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith({characters: [expect.objectContaining({_id: dummyPredrawnId})]});
});

test("Take", async () => {
    console.log(dummyPredrawnId);
    let request = createMockRequest({params: {id: dummyPredrawnId}}, await getTestToken());
    let response = createMockResponse();
    await authenticateRequest(request, response);
    await PredrawnController.take(request, response);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith({character: expect.objectContaining({...dummyPredrawn, _id: expect.anything(), shareStatus: "private"})});
});

test("Add", async () => {
    let response = createMockResponse();
    await PredrawnController.add(createMockRequest({body: {id: dummyCharacterId}}), response);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith({id: expect.any(String)});
});

test("Remove", async () => {
    let response = createMockResponse();
    let req = createMockRequest({params: {id: dummyPredrawnId}});
    await PredrawnController.remove(req, response);
    expect(response.sendStatus).toBeCalledWith(200);

    let response2 = createMockResponse();
    await PredrawnController.remove(createMockRequest({params: {id: dummyCharacterId}}), response2);
    expect(response2.status).toBeCalledWith(400);
});