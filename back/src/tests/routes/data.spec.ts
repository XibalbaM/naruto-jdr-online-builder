import {test, expect} from "vitest";

import * as fetchUtils from "../../utils/tests.utils.js";
import Village from "../../classes/village.class";

let konoha: Village;

//NORMAL USES
test("GET /", async () => {

    const response = await fetchUtils.get("/villages");

    expect(response.status).toBe(200);
    const json = await response.json() as Array<Village>;
    expect(json).toBeInstanceOf(Array);
    expect(json.filter((data) => data.name === "Konoha")[0].logo).toBe("konoha.png");
    konoha = json.filter((data) => data.name === "Konoha")[0];
});

test("GET /:id", async () => {

    const response = await fetchUtils.get(`/villages/${konoha._id}`);

    expect(response.status).toBe(200);
    const json = await response.json() as Village;
    expect(json).toBeInstanceOf(Object);
    expect(json.name).toBe(konoha.name);
    expect(json.logo).toBe(konoha.logo);
});

test("POST /", async () => {

    const response = await fetchUtils.post("/villages", {data: {name: "Salut", logo: "test.png"}}, await fetchUtils.getAdminToken());

    expect(response.status).toBe(201);
    const json = await response.json() as Village;
    expect(json).toBeInstanceOf(Object);
    expect(json.name).toBe("Salut");
    expect(json.logo).toBe("test.png");

    const get = await fetchUtils.get(`/villages/${json._id}`);
    expect(get.status).toBe(200);
    const getJson = await get.json() as Village;
    expect(getJson).toBeInstanceOf(Object);
    expect(getJson.name).toBe("Salut");
    expect(getJson.logo).toBe("test.png");
});

test("PUT /:id", async () => {

    const response = await fetchUtils.put(`/villages/${konoha._id}`, {data: {name: "Coucou", logo: "test2.png"}}, await fetchUtils.getAdminToken());
    console.log(await response.json());

    expect(response.status).toBe(200);

    const get = await fetchUtils.get(`/villages/${konoha._id}`);
    expect(get.status).toBe(200);
    const getJson = await get.json() as Village;
    expect(getJson).toBeInstanceOf(Object);
    expect(getJson.name).toBe("Coucou");
    expect(getJson.logo).toBe("test2.png");
});

test("DELETE /:id", async () => {

    const response = await fetchUtils.del(`/villages/${konoha._id}`, await fetchUtils.getAdminToken());

    expect(response.status).toBe(200);

    const get = await fetchUtils.get(`/villages/${konoha._id}`);
    expect(get.status).toBe(404);
});