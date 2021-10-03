import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from "../controller/session.controller";
import { Router } from "express";
import { requiresUser, validateRequest } from "../middleware";
import { createUserSessionSchema } from "../schema/user.schema";

let router: Router = Router()
// Login
router.post(
    "/",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
    );

// Get the user's sessions
router.get("/", requiresUser, getUserSessionsHandler);

// Logout
router.delete("/", requiresUser, invalidateUserSessionHandler);
export default router;