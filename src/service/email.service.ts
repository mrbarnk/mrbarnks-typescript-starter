import { DocumentDefinition, FilterQuery } from "mongoose";
import Email, { emailVerificationDocument } from "../model/email.model";

/**
 * Find Email
 * @param query 
 * @returns 
*/

export async function findEmail(query: FilterQuery<emailVerificationDocument>) {
    return await Email.findOne(query).lean();
}

/**
 * Create Verification code
 * 
 * @param body 
 * @returns 
*/

export const createVerificationCode = async (body: DocumentDefinition<emailVerificationDocument>) => {
    let email = await Email.find({ email: body?.email })
    if (email && email.length > 0) {
        await updateVerificationCode(body)
        return email[0];
        // console.log({email})
        // return await findEmail({ email: body?.email })
    } else {
        return await Email.create(body)
    }
}

/**
 * Update verification code
 * 
 * @param body 
 * @returns 
*/

export const updateVerificationCode = async (body: DocumentDefinition<emailVerificationDocument>) => {
    return await Email.updateOne({ email: body?.email }, { $set: body })
}

/**
 * Remove verification code from db
 * @param email 
 * @returns 
*/

export const removeVerificationCode = async (email: emailVerificationDocument["email"]) => {
    return await Email.deleteOne({ email })
}

/**
 * Check if token exist in db
 * @param token 
 * @returns 
 */
export const checkIftokenExist = async (token: string) => {
    const tokens = await Email.find({})
    
  tokens.forEach((tokenI: emailVerificationDocument) => {
    if (tokenI?.token === token) return { data: token, email: tokenI.email };
  });
  return false;
}