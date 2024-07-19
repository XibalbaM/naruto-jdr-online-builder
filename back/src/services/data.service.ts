import {Model} from "mongoose";

export default class DataService {
    /**
     * @param model The mongoose model to use
     */
    constructor(private model: Model<any>) {}

    async getAll() {
        return (await this.model.find().lean());
    }

    async get(id: string) {
        return this.model.findById(id).lean();
    }

    async create(data: any) {
        if (data._id) delete data._id;
        return await this.model.create(data);
    }

    async update(id: string, data: any) {
        if (data._id) delete data._id;
        await this.model.findByIdAndUpdate(id, data).lean();
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id).lean();
    }
}