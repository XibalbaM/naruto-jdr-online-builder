import {Schema} from "mongoose";

export function removeVersionFromResponse(schema: Schema) {
    let removeVersion = function (doc: any, next: any) {
        if (doc) {
            delete doc.__v;
        }
        next();
    }
    let removeVersions = function (doc: any, next: any) {
        if (doc) {
            doc.forEach((d: any) => delete d.__v);
        }
        next();
    }

    schema.post("findOne", removeVersion);
    schema.post("find", removeVersions);
}