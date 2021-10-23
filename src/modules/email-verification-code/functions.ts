import { checkIftokenExist, createVerificationCode, findEmail, removeVerificationCode } from "../../service/email.service";

const fs = require("fs");

interface verificationSchema {
  code: number,
  token: string
}


exports.addUser = async (email: string, { code, token }: verificationSchema) => {
  let body = { email, code, token};
  return await createVerificationCode(body)
};

exports.removeUser = async (email: string) => {
  return await removeVerificationCode(email)
};

exports.getUser = async (email: string) => {
  return await findEmail({ email })
};

exports.tokenExistence = async (token: string) => {
  return await checkIftokenExist(token)
};
