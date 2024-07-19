import {test, expect} from "vitest";

import VillageModel from "../../models/village.model";
import DataController from "../../controllers/data.controller";
import {createMockRequest, createMockResponse} from "../../utils/tests.utils.js";

let kiri = (await VillageModel.findOne({name: "Kiri"}).lean())!;
let controller = new DataController(VillageModel);

test("ETag", async () => {
    let testEtag = DataController.getETag("test");
    expect(testEtag).toBe(DataController.getETag("test"));
    expect(testEtag).not.toBe(DataController.getETag("test2"));
});

test("Resource sending", async () => {
    let noDataResponse = createMockResponse();
    DataController.sendDataOr304(createMockRequest({header: () => null}), noDataResponse, "test");
    expect(noDataResponse.status).toBeCalledWith(200);
    expect(noDataResponse.json).toBeCalledWith("test");
    expect(noDataResponse.set).toBeCalledWith("ETag", DataController.getETag("test"));
    expect(noDataResponse.set).toBeCalledWith('Cache-Control', `public, max-age=${60 * 60}`);

    let dataResponse = createMockResponse();
    DataController.sendDataOr304(createMockRequest({header: () => DataController.getETag("test")}), dataResponse, "test");
    expect(dataResponse.sendStatus).toBeCalledWith(304);
    expect(dataResponse.json).not.toBeCalled();

    let changedDataResponse = createMockResponse();
    DataController.sendDataOr304(createMockRequest({header: () => DataController.getETag("test")}), changedDataResponse, "test1");
    expect(changedDataResponse.status).toBeCalledWith(200);
    expect(changedDataResponse.json).toBeCalledWith("test1");
    expect(changedDataResponse.set).toBeCalledWith("ETag", DataController.getETag("test1"));
});

test("Get all", async () => {
    let response = createMockResponse();
    await controller.getAll(createMockRequest({header: () => null}), response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(expect.arrayContaining([kiri]));
});

test("Get one", async () => {
    let response = createMockResponse();
    await controller.get(createMockRequest({header: () => null, params: {id: kiri._id}}), response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(kiri);
});

test("Create", async () => {
    let response = createMockResponse();
    let newVillage = {name: "Test"}
    await controller.create(createMockRequest({header: () => null, body: {data: newVillage}}), response);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith(expect.objectContaining({name: "Test"}));
});

test("Update", async () => {
    let response = createMockResponse();
    let newVillage = {name: "Test1"}
    await controller.update(createMockRequest({header: () => null, params: {id: kiri._id}, body: {data: newVillage}}), response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith({message: "Successfully updated"});
    expect(await VillageModel.findById(kiri._id).lean()).toMatchObject(newVillage);
});

test("Delete", async () => {
    let response = createMockResponse();
    await controller.delete(createMockRequest({header: () => null, params: {id: kiri._id}}), response);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith({message: "Successfully deleted"});
    expect(await VillageModel.exists({ _id: kiri._id })).toBeFalsy();
});