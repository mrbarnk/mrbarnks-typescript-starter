import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../logger";
import { errorResponse } from "../utils/responses.utils";

/**
 * Function that handles the creation of users.
 * @param req 
 * @param res 
 * @returns 
 */
export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    log.error(e);
    return errorResponse(res, e.message, 409)
  }
}
