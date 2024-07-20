import {ObjectId} from "mongoose";
import _ChakraSpe from "common/interfaces/chakraSpe";

export default interface ChakraSpe extends _ChakraSpe {
	_id: ObjectId;
}