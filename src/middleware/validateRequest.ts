import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { errorResponse } from '../utils/responses.utils';

const validate = (schema: AnySchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e: any) {
    log.error(e);
    return errorResponse(res, e.errors[0], 400, e.errors)
    // return res.status(400).send(e.errors);
  }
};

export default validate;
