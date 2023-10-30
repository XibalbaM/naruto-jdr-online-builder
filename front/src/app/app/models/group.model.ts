/**
 * Class representing a Group.
 * @class Group
 */
export default class Group {
    _id!: number;
    name!: string;

    constructor(group: Group) {
        Object.assign(this, group);
    }
}
