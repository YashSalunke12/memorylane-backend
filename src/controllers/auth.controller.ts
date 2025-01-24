import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { UserModel } from "../models/user.model";
import { asyncHandler } from "../utils/async-handler";
import { ApiResponse } from "../utils/api-response";
import { ApiError } from "../utils/api-error-response";

export const signupHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      throw new ApiError(409, "user already exists");
    }

    const user = await UserModel.create({
      username,
      email,
      password,
    });

    const response = new ApiResponse(201, {}, "user created successfully");
    res.status(response.statusCode).json(response);
  }
);

export const signinHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw new ApiError(404, "User does not exist");
    }

    // const isPasswordValid = await compare(password, existingUser.password);
    // if (!isPasswordValid) {
    //   throw new ApiError(401, "Incorrect password");
    // }

    const token = sign(
      { id: existingUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    const response = new ApiResponse(200, { token }, "Signin successful");
    res.status(response.statusCode).json(response);
  }
);
