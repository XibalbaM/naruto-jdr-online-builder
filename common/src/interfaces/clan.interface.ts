import Line from "./line.interface";

export default interface _Clan {
    _id: any;
    name: string;
    village: string;
    description: string;
    line: Line;
}