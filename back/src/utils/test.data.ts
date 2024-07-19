import databaseConnect from "../database-connect.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import groupModel from "../models/group.model.js";
import VillageModel from "../models/village.model.js";
import UserModel from "../models/user.model.js";

/**
 * Initializes the test environment.
 */
export async function init() {
    await createTestAccounts();
    await createTestGroup();
}

let testToken: string | null;
let adminToken: string | null;
const discordTestId = "569895047026180135";

/**
 * Create accounts used for authenticated tests.
 */
export async function createTestAccounts() {
    await databaseConnect;
    if (!await userModel.exists({email: 'testdata@test.test'}))
        await userModel.create({email: 'testdata@test.test'});
    if (!await userModel.exists({email: 'admin@test.test'}))
        await userModel.create({email: 'admin@test.test', isAdmin: true});
    testToken = null;
    adminToken = null;
    console.log("Test account created");
}

/**
 * @returns the test token.
 */
export async function getTestToken(): Promise<string> {
    await databaseConnect;
    if (!testToken) {
        testToken = jwt.sign({id: (await userModel.findOne({email: 'testdata@test.test'}))!._id}, config.jwt_secret, {expiresIn: config.jwt_expiration});
    }
    return testToken;
}

/**
 * @returns the admin token.
 */
export async function getAdminToken(): Promise<string> {
    await databaseConnect;
    if (!adminToken) {
        adminToken = jwt.sign({id: (await userModel.findOne({email: 'admin@test.test'}))!._id}, config.jwt_secret, {expiresIn: config.jwt_expiration});
    }
    return adminToken;
}

/**
 * Create group used for tests.
 */
export async function createTestGroup() {
    await databaseConnect;
    const user = (await userModel.findOne({email: 'testdata@test.test'}))!;
    const group = await groupModel.create({name: 'testDataGroup', village: (await VillageModel.findOne({name: "Konoha"}))!._id, users: [{role: "sensei", user: user}]});
    await UserModel.findByIdAndUpdate(user._id, {$push: {groups: {name: group.name, role: "sensei", _id: group.id}}});
    console.log("Test group created");
}

/**
 * @returns the test group's id.
 */
export async function getTestGroupId(): Promise<string> {
    await databaseConnect;
    return (await groupModel.findOne({name: 'testDataGroup'}))!._id.toString();
}

/**
 * @returns the test group's id.
 */
export async function getTestUserId(): Promise<string> {
    await databaseConnect;
    return (await userModel.findOne({email: 'testdata@test.test'}))!._id.toString();
}

/**
 * @returns the test group's id.
 */
export async function addDiscordAccountToTestAccount() {
    await databaseConnect;
    return userModel.findOneAndUpdate({email: "testdata@test.test"}, {discordId: discordTestId});
}

/**
 * @returns the test group's id.
 */
export async function removeDiscordAccountFromTestAccount() {
    await databaseConnect;
    return userModel.findOneAndUpdate({email: "testdata@test.test"}, {$unset : {discordId: 1}});
}