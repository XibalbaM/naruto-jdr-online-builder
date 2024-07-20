export default interface _Group {
    _id: any;
    name: string;
    village: string;
    users: {role: "sensei" | "player", user: string}[];
}