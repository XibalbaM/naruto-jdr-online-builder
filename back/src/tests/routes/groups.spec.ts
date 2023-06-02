import {test, expect} from "vitest";

import * as fetchUtils from "../../utils/tests.utils.js";
import VillageModel from "../../models/village.model";

//NORMAL USES
test("POST / with group data", async () => {

    const response = await fetchUtils.post("/groups", {name: "testGroup", village: (await VillageModel.findOne({name: "Konoha"}))._id}, await fetchUtils.getTestToken());

    expect(response.status).toBe(201);
    const json = await response.json();
    expect(json["group"]["_id"]).toBeDefined();
    expect(json["group"]["name"]).toBe("testGroup");
    expect(json["group"]["users"][0]["user"]["email"]).toBe("testdata@test.test");
});

test("GET /", async () => {

    const response = await fetchUtils.get("/groups", await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json["groups"]).toBeInstanceOf(Array);
    expect(json["groups"]["length"]).toBe(2); //Because of the test group
    expect(json["groups"][1]["name"]).toBe("testGroup");
});

test("GET /:id", async () => {

    const response = await fetchUtils.get("/groups/" + await fetchUtils.getTestGroupId(), await fetchUtils.getTestToken());

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json["group"]["name"]).toBe("testDataGroup");
});

//BAD USES
test("GET /:id with invalid id", async () => {

    const response = await fetchUtils.get("/groups/" + "invalidId", await fetchUtils.getTestToken());

    expect(response.status).toBe(404);
    const json = await response.json();
    expect(json["error"]).toBe("Group not found");
});


//LONG TESTS