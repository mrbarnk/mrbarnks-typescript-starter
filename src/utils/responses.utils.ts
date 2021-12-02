import { Response } from "express";

export const successResponse = (res: Response, message: String, statusCode: number = 200, data: any = []) => {
    return res.status(statusCode).json({ status: true, message, data })
}
export const errorResponse = (res: Response, message: String = 'Something went wrong', statusCode: number = 500, error: any = {}) => {
    return res.status(statusCode).json({ status: false, message, error })
}