import express, { Request, Response } from "express";
import sessionRoutes from "./session.route";
import userRoutes from "./user.route";


let router = express.Router();

router.use('/users', userRoutes)
router.use('/sessions', sessionRoutes)
router.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

export default router;