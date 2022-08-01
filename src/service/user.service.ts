import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument } from "../model/user.model";

/**
 * Create user
 * @param input 
 * @returns 
 */
export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Find User
 * @param query 
 * @returns 
 */
export async function findOneUser(query: FilterQuery<UserDocument>): Promise<import("mongoose").LeanDocument<UserDocument> | null> {
  return await User.findOne(query).lean();
}

/**
 * Find Many User
 * @param query 
 * @returns 
 */
export async function findManyUser(query: FilterQuery<UserDocument>,
  perPage: number = 10,
  page: number = 0): Promise<import("mongoose").LeanDocument<UserDocument>[]> {

  return await User.find(query).sort({ updatedAt: -1 }).limit(perPage)
    .skip(perPage * page)
}

/**
 * Validate Password
 * @param param
 * @returns 
 */
export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}): Promise<false | Pick<import("mongoose").LeanDocument<UserDocument>, "_id" | "__v" | "id" | "email" | "firstname" | "lastname" | "createdAt" | "updatedAt" | "comparePassword">> {
  const user: any = await User.findOne({ email: email?.toLowerCase() });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
