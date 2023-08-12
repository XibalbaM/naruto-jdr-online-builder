import {test, expect} from "vitest";

import * as fetchUtils from "../../utils/tests.utils.js";
import VillageModel from "../../models/village.model";
import Character from "../../classes/character.class";
import SkillModel from "../../models/skill.model";
import ClanModel from "../../models/clan.model";
import BaseModel from "../../models/base.model";
import ChakraSpeModel from "../../models/chakraSpe.model";
import CharacterModel from "../../models/character.model";
import RoadModel from "../../models/road.model";

const characterData: Omit<Character, "_id" | "bases" | "skills" | "chakraSpes" | "nindoPoints"> = {
	firstName: "test",
	village: (await VillageModel.findOne())._id,
	xp: 100,
	notes: "test",
	nindo: "test",
	clan: (await ClanModel.findOne())._id
}

let characterId: string;

test("POST / with character data", async () => {

	const response = await fetchUtils.post("/characters", {character: characterData}, await fetchUtils.getTestToken());

	expect(response.status).toBe(201);
	const json = await response.json();
	expect(json["character"]["_id"]).toBeDefined();
	characterId = json["character"]["_id"];
	expect(json["character"]["firstName"]).toBe("test");
	expect(json["character"]["bases"].length).toBe(7);
});

test("GET /", async () => {

	const response = await fetchUtils.get("/characters", await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const json = await response.json();
	expect(json["characters"]).toBeInstanceOf(Array);
	expect(json["characters"]["length"]).toBe(1);
	expect(json["characters"][0]["firstName"]).toBe("test");
});

test("GET /:id", async () => {

	const response = await fetchUtils.get("/characters/" + characterId, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const json = await response.json();
	expect(json["character"]["firstName"]).toBe("test");
});

test("POST /:characterId/skills/:skillId", async () => {
	const response = await fetchUtils.post("/characters/" + characterId + "/skills/" + (await SkillModel.findOne({name: "Armes Simples"}))._id, {value: 2}, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const character = Character.fromModel(await CharacterModel.findById(characterId));
	const skillId = (await SkillModel.findOne({name: "Armes Simples"}))._id;
	expect(character.skills.find((skill) => skill.skill.toString() === skillId.toString()).level).toBe(2);
});

test("POST /:characterId/skills/:skillId with invalid values", async () => {
	//TODO UNALLOWED SKILL, REMOVING CLAN SKILL
	let response = await fetchUtils.post("/characters/" + characterId + "/skills/" + (await SkillModel.findOne({name: "Armes Simples"}))._id, {value: 6}, await fetchUtils.getTestToken());

	expect(response.status).toBe(400);
	let json = await response.json();
	expect(json["error"]).toBe("Invalid value");

	response = await fetchUtils.post("/characters/" + characterId + "/skills/" + (await SkillModel.findOne({name: "Armes Simples"}))._id, {value: -1}, await fetchUtils.getTestToken());

	expect(response.status).toBe(400);
	json = await response.json();
	expect(json["error"]).toBe("Invalid value");
});

test("POST /:characterId/bases/:baseId", async () => {
	const response = await fetchUtils.post("/characters/" + characterId + "/bases/" + (await BaseModel.findOne({shortName: "COR"}))._id, {value: 2}, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const character = Character.fromModel(await CharacterModel.findById(characterId));
	expect(character.bases.find(async (base) => base.base === (await BaseModel.findOne({shortName: "COR"}))._id).level).toBe(2);
});

test("POST /:characterId/bases/:baseId with invalid values", async () => {
	let response = await fetchUtils.post("/characters/" + characterId + "/bases/" + (await BaseModel.findOne({shortName: "COR"}))._id, {value: 0}, await fetchUtils.getTestToken());

	expect(response.status).toBe(400);
	let json = await response.json();
	expect(json["error"]).toBe("Invalid value");
});

test("POST /:characterId/nindo", async () => {
	const response = await fetchUtils.post("/characters/" + characterId + "/nindo", {text: "hello"}, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const character = Character.fromModel(await CharacterModel.findById(characterId));
	expect(character.nindo).toBe("hello");
});

test("POST /:characterId/nindoPoints", async () => {
	const response = await fetchUtils.post("/characters/" + characterId + "/nindoPoints", {points: 12}, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const character = Character.fromModel(await CharacterModel.findById(characterId));
	expect(character.nindoPoints).toBe(12);
});

test("PUT /:characterId/spes/:speId", async () => {
	const speId = (await ChakraSpeModel.findOne({name: "Rémanent"}))._id;
	const response = await fetchUtils.put("/characters/" + characterId + "/spes/" + speId, {}, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const character = Character.fromModel(await CharacterModel.findById(characterId));
	expect(character.chakraSpes.find((spe) => spe.spe.toString() === speId.toString()).level).toBe(1);
});

test("PUT /:characterId/spes/:speId with already maxed spe", async () => {
	const response = await fetchUtils.put("/characters/" + characterId + "/spes/" + (await ChakraSpeModel.findOne({name: "Rémanent"}))._id, {}, await fetchUtils.getTestToken());

	expect(response.status).toBe(400);
	const json = await response.json();
	expect(json["error"]).toBe("Spe already maxed");
});

test("DELETE /:characterId/spes/:speId", async () => {
	const response = await fetchUtils.del("/characters/" + characterId + "/spes/" + (await ChakraSpeModel.findOne({name: "Rémanent"}))._id, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const character = Character.fromModel(await CharacterModel.findById(characterId));
	expect(character.chakraSpes.find(async (spe) => spe.spe === (await ChakraSpeModel.findOne({name: "Rémanent"}))._id).level).toBe(0);
});

test("DELETE /:characterId/spes/:speId with already 0 spe", async () => {
	const response = await fetchUtils.del("/characters/" + characterId + "/spes/" + (await ChakraSpeModel.findOne({name: "Rémanent"}))._id, await fetchUtils.getTestToken());

	expect(response.status).toBe(400);
	const json = await response.json();
	expect(json["error"]).toBe("Spe already at 0");
});

test("POST /:characterId/notes", async () => {
	const response = await fetchUtils.post("/characters/" + characterId + "/notes", {text: "hello"}, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const character = Character.fromModel(await CharacterModel.findById(characterId));
	expect(character.notes).toBe("hello");
});

test("POST /:characterId/xp", async () => {
	const response = await fetchUtils.post("/characters/" + characterId + "/xp", {xp: 12}, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);
	const character = Character.fromModel(await CharacterModel.findById(characterId));
	expect(character.xp).toBe(12);
});

test("POST /:characterId/village", async () => {
    const kiriId = (await VillageModel.findOne({name: "Kiri"}))._id.toString();
    let response = await fetchUtils.post("/characters/" + characterId + "/village", {id: kiriId}, await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    let character = Character.fromModel(await CharacterModel.findById(characterId));
    expect(character.village.toString()).toBe(kiriId);

    response = await fetchUtils.post("/characters/" + characterId + "/village", {id: 'hello'}, await fetchUtils.getTestToken());

    expect(response.status).toBe(404);
    const json = await response.json();
    expect(json["error"]).toBe("Village not found");
    character = Character.fromModel(await CharacterModel.findById(characterId));
    expect(character.village.toString()).toBe(kiriId);
});

test("POST /:characterId/name", async () => {
    const response = await fetchUtils.post("/characters/" + characterId + "/name", {text: "hello"}, await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    const character = Character.fromModel(await CharacterModel.findById(characterId));
    expect(character.firstName).toBe("hello");
});

test("POST /:characterId/clan", async () => {
    const naraId = (await ClanModel.findOne({name: "Nara"}))._id.toString();
    let response = await fetchUtils.post("/characters/" + characterId + "/clan", {id: naraId}, await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    let character = Character.fromModel(await CharacterModel.findById(characterId));
    expect(character.clan.toString()).toBe(naraId);
    //TODO: Add clan attributes removal
    response = await fetchUtils.post("/characters/" + characterId + "/clan", {id: 'hello'}, await fetchUtils.getTestToken());

    expect(response.status).toBe(404);
    const json = await response.json();
    expect(json["error"]).toBe("Clan not found");
    character = Character.fromModel(await CharacterModel.findById(characterId));
    expect(character.clan.toString()).toBe(naraId);
});

test("POST /:characterId/road", async () => {
    const kriegstierId = (await RoadModel.findOne({name: "Kriegstier"}))._id.toString();
    let response = await fetchUtils.post("/characters/" + characterId + "/road", {id: kriegstierId}, await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    let character = Character.fromModel(await CharacterModel.findById(characterId));
    expect(character.road.toString()).toBe(kriegstierId);

    response = await fetchUtils.post("/characters/" + characterId + "/road", {id: ''}, await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    character = Character.fromModel(await CharacterModel.findById(characterId));
    expect(character.road).toBeUndefined();

    response = await fetchUtils.post("/characters/" + characterId + "/road", {id: 'hello'}, await fetchUtils.getTestToken());

    expect(response.status).toBe(404);
    const json = await response.json();
    expect(json["error"]).toBe("Road not found");
    character = Character.fromModel(await CharacterModel.findById(characterId));
    expect(character.road).toBeUndefined();
});

test("DELETE /:characterId", async () => {
	let response = await fetchUtils.del("/characters/" + characterId, await fetchUtils.getTestToken());

	expect(response.status).toBe(200);

	response = await fetchUtils.get("/characters", await fetchUtils.getTestToken());
	const json = await response.json();
	expect(json["characters"]["length"]).toBe(0);
});