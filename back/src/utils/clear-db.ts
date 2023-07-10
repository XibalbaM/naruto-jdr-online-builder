import mongoose from "mongoose";

import "../database-connect.js";
import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";
import VillageModel from "../models/village.model.js";
import BaseModel from "../models/base.model.js";
import RoadModel from "../models/road.model.js";
import SkillModel from "../models/skill.model.js";
import ClanModel from "../models/clan.model.js";
import RankModel from "../models/rank.model.js";
import ChakraSpeModel from "../models/chakraSpe.model.js";
import CharacterModel from "../models/character.model.js";

/**
 * Clears the database witch the app currently connected to.
 *
 * Must add the new models to the drop function when they are created.
 */
export async function clearDatabase() {
    await mongoose.connection.asPromise();
    await UserModel.collection.drop();
    await GroupModel.collection.drop();
    await VillageModel.collection.drop();
    await BaseModel.collection.drop();
    await RoadModel.collection.drop();
    await ClanModel.collection.drop();
    await SkillModel.collection.drop();
    await RankModel.collection.drop();
    await ChakraSpeModel.collection.drop();
    await CharacterModel.collection.drop();

    console.log("Database cleared");
}