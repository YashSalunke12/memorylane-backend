import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error-response";

export const globalCatch = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    const isDev = process.env.NODE_ENV === "development";

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        stack: isDev ? err.stack : undefined,
    });
};
