import {test, expect} from "vitest";

import CharacterModel from "../../models/character.model";
import VillageModel from "../../models/village.model";
import RankModel from "../../models/rank.model";
import ClanModel from "../../models/clan.model";
import {authenticateRequest, createMockRequest, createMockResponse} from "../../utils/tests.utils.js";
import PredrawnController from "../../controllers/predrawn.controller";
import {getTestToken} from "../../utils/test.data";
import Character from "../../classes/character.class";

const dummyPredrawn: Omit<Character, "_id" | "bases" | "commonSkills" | "customSkills" | "chakraSpes" | "nindoPoints" | "createdAt" | "updatedAt"> = {
    firstName: "test",
    village: (await VillageModel.findOne().lean().select("_id"))._id,
    xp: 100,
    rank: (await RankModel.findOne().lean().select("_id"))._id,
    notes: "test",
    nindo: "test",
    clan: (await ClanModel.findOne().lean().select("_id"))._id,
    shareStatus: "predrawn",
}
const dummyPredrawnId = (await CharacterModel.create(dummyPredrawn))._id;

const dummyCharacter: Omit<Character, "_id" | "bases" | "commonSkills" | "customSkills" | "chakraSpes" | "nindoPoints" | "createdAt" | "updatedAt" | "shareStatus"> = {
    firstName: "test",
    village: (await VillageModel.findOne().lean().select("_id"))._id,
    xp: 100,
    rank: (await RankModel.findOne().lean().select("_id"))._id,
    notes: "test",
    nindo: "test",
    clan: (await ClanModel.findOne().lean().select("_id"))._id,
}
const dummyCharacterId = (await CharacterModel.create(dummyCharacter))._id;

test("List", async () => {
    let response = createMockResponse();
    await PredrawnController.list(createMockRequest(), response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith({characters: [dummyPredrawnId.toString()]});
});

test("Take", async () => {
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