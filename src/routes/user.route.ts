import { createUserHandler } from "../controller/user.controller";
import { Router } from "express";
import { validateRequest } from "../middleware";
import { createUserSchema } from "../schema/user.schema";

let router: Router = Router()
// Register user
router.post("/", validateRequest(createUserSchema), createUserHandler);

export default router;