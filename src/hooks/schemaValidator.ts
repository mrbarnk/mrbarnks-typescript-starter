import { DocumentDefinition, HookNextFunction, Schema } from "mongoose";

/**
 * Changes the message to readable english.
 * @param schema 
 */
export async function schemaValidator(schema: Schema) {
    schema.post('save', function(error: any, doc: any, next: HookNextFunction) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error(`${Object.keys(error?.keyValue)[0]} already exist in the database.`));
        } else {
            next();
        }
    });

    schema.post("find", function(error: any, doc: any, next: HookNextFunction) {
        // console.log(error)
        if (error.name === 'MongoError' && error.kind === "ObjectId") {
            next(new Error(`Invalid ID.`));
        } else {
            next();
        }
    });

    

    schema.post("findOne", function(error: any, doc: any, next: HookNextFunction) {
        // console.log(error)
        if (error.name === 'MongoError' && error.kind === "ObjectId") {
            next(new Error(`Invalid ID.`));
        } else {
            next();
        }
    });
}