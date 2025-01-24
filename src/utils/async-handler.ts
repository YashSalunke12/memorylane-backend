import { NextFunction, Response } from "express"
import { CustomRequest } from "./types"

export const asyncHandler = (requestHandler: (req: CustomRequest, res: Response, next: NextFunction) => void) => {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch(error => next(error));
    }
}