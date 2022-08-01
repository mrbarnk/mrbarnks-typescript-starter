import express, { Request, Response } from "express";
import sessionRoutes from "./session.route";
import userRoutes from "./user.route";
import notificationRoutes from "./notification.routes";
import requiresUser from '../middleware/requiresUser';


let router = express.Router();

router.use('/users', userRoutes)
router.use('/sessions', sessionRoutes)
router.use('/notification', [requiresUser], notificationRoutes)
router.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

export default router;