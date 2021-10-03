import { Response } from "express";

export const successResponse = (res: Response, message: String, statusCode: number = 200) => {
    return res.status(statusCode).json({status: true, message})
}
export const errorResponse = (res: Response, message: String = 'Something went wrong', statusCode: number = 400) => {
    return res.status(statusCode).json({status: false, message})
}