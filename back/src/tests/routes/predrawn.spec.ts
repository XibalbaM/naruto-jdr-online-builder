import {test, expect} from "vitest";

import * as fetchUtils from "../../utils/tests.utils.js";
import CharacterModel from "../../models/character.model";
import VillageModel from "../../models/village.model";
import RankModel from "../../models/rank.model";
import ClanModel from "../../models/clan.model";

const character = {
    firstName: "test",
    village: (await VillageModel.findOne())._id,
    xp: 100,
    rank: (await RankModel.findOne())._id,
    notes: "test",
    nindo: "test",
    clan: (await ClanModel.findOne())._id
}

const characterId = (await CharacterModel.create(character))._id;
let predrawnId: string;

test("POST /", async () => {

    const response = await fetchUtils.post("/predrawn", {id: characterId.toString()}, await fetchUtils.getAdminToken());

    expect(response.status).toBe(201);
    const json: any = await response.json();
    expect(json.id).toBeDefined();
    predrawnId = json.id;
});

test("GET /", async () => {

    const response = await fetchUtils.get("/predrawn");

    expect(response.status).toBe(200);
    const json: any = await response.json();
    expect(json.characters.length).toEqual(1);
    expect(json.characters[0]).toBeTypeOf("string");
});

test("PUT /:id", async () => {

    const response = await fetchUtils.put(`/predrawn/${predrawnId.toString()}`, {}, await fetchUtils.getTestToken());

    expect(response.status).toBe(201);
    const json: any = await response.json();
    expect(json.character).toBeDefined();
    expect(json.character.clan.toString()).toBe(character.clan.toString());
});

test("DELETE /:id", async () => {

    const response = await fetchUtils.del(`/predrawn/${predrawnId.toString()}`, await fetchUtils.getAdminToken());

    expect(response.status).toBe(200);

    const response2 = await fetchUtils.get("/predrawn");

    expect(response2.status).toBe(200);
    const json: any = await response2.json();
    expect(json.characters.length).toEqual(0);
});