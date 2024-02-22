import {Model} from "mongoose";

export default class DataService {
    /**
     * @param model The mongoose model to use
     * @param modelToClass A function that converts the mongoose model to a class sendable to the client
     */
    constructor(private model: Model<any>, private modelToClass: (model: any) => any) {}

    async getAll() {
        return (await this.model.find()).map((data: any) => this.modelToClass(data));
    }

    async get(id: string) {
        const data = await this.model.findById(id);
        return data ? this.modelToClass(data) : null;
    }

    async create(data: any) {
        if (data._id) delete data._id;
        return this.modelToClass(await this.model.create(data));
    }

    async update(id: string, data: any) {
        if (data._id) delete data._id;
        await this.model.findByIdAndUpdate(id, data);
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
    }
}