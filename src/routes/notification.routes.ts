import { Router } from 'express';
import { createNotificationHandler, deleteOneNotificationHandler, findManyNotificationHandler, findNotificationHandler, updateOneNotificationHandler } from '../controller/notification.controller';
let router: Router = Router()


router.post("/", createNotificationHandler)
router.get("/:id", findNotificationHandler)
router.get("/", findManyNotificationHandler)
router.put("/:id", updateOneNotificationHandler)
router.delete("/:id", deleteOneNotificationHandler)

export default router;