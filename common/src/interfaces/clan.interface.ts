import Line from "./line.interface.js";

export default interface _Clan {
    _id: any;
    name: string;
    village: string;
    description: string;
    line: Line;
}