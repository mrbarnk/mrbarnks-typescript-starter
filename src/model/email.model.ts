import mongoose from "mongoose";
import { schemaValidator } from "../hooks/schemaValidator";
import { UserDocument } from "./user.model";

export interface emailVerificationDocument extends mongoose.Document {
    email: UserDocument["email"];
    code: Number;
    token: String;
}

const emailSchema = new mongoose.Schema(
    {
        email: {type: mongoose.Schema.Types.String, ref: "User"},
        code: { type: Number, required: true },
        token: { type: String, required: true },
        expirateDate: { type: String, default: new Date(new Date().getTime() + 1000 * 60 * 60) },
    },
    { timestamps: true }
)


schemaValidator(emailSchema)

const Email = mongoose.model<emailVerificationDocument>("Email", emailSchema)

export default Email;