import { Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { CustomRequest } from "../utils/types";

export const userAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization } = req.headers;
    const decoded = verify(
      authorization as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({ message: "token is missing" });
      return;
    }
  } catch (error) {
    console.log("wrong token");
    res.status(500).json({ message: "token is worng or malformed" });
  }
};
