import { Request, Response } from "express";
import { createNotification, deleteOneNotification, findManyNotification, findOneNotification, updateOneNotification } from "../service/notification.service";
import { successResponse, errorResponse } from '../utils/responses.utils';
import { UserDocument } from '../model/user.model';
import { findManyUser } from "../service/user.service";
import { LeanDocument } from 'mongoose';
import log from '../logger/index';

/**
 * Create Notification Handler
 * @param req 
 * @param res 
 * @returns 
 */
export async function createNotificationHandler(
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> {
    try {
        return successResponse(res, "Notification created successfully!", 200, await createNotification(req.body))
    } catch (error: any) {
        return errorResponse(res, "Something went wrong!", 500, error.message)
    }
}

/**
 * Find One Notification
 * @param req 
 * @param res 
 * @returns 
 */
export async function findNotificationHandler(
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> {
    try {
        return successResponse(res, "Notification fetched successfully!", 200, await findOneNotification({ _id: req.params.id }))
    } catch (error: any) {
        return errorResponse(res, "Something went wrong!", 500, error.message)
    }
}

/**
 * Find Many Notification
 * @param req 
 * @param res 
 * @returns 
 */
export async function findManyNotificationHandler(
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> {
    try {
        return successResponse(res, "Notification fetched successfully!", 200, await findManyNotification({ user_id: req.body.user_id }))
    } catch (error: any) {
        return errorResponse(res, "Something went wrong!", 500, error.message)
    }
}

/**
 * Update One Notification Handler
 * @param req 
 * @param res 
 * @returns 
 */
export async function updateOneNotificationHandler(
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> {
    try {
        return successResponse(res, "Notification updated successfully!", 200, await updateOneNotification({
            _id: req.params.id
        },
            req.body))
    } catch (error: any) {
        return errorResponse(res, "Something went wrong!", 500, error.message)
    }
}

/**
 * Delete One Notification Handler
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteOneNotificationHandler(
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> {
    try {
        return successResponse(res, "Notification deleted successfully!", 200, await deleteOneNotification({
            _id: req.params.id
        }))
    } catch (error: any) {
        return errorResponse(res, "Something went wrong!", 500, error.message)
    }
}