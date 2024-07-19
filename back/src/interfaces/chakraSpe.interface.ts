import {ObjectId} from "mongoose";

export default interface ChakraSpe {
	_id: ObjectId;
	name: string;
	max: number;
    effect: string;
}