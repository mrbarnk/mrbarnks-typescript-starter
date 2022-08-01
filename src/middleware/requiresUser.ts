import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from '../utils/responses.utils';
import { lang } from '../utils/helper.utils';

/**
 * Middleware that makes sure user is logged in before accessing route.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, "user");

  if (!user) {
    return errorResponse(res, lang("login_error"), 403);//res.sendStatus(403);
  }

  return next();
};

export default requiresUser;
