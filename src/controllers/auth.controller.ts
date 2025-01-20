import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { UserModel } from "../models/user.model";


export const signupHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;
    
        const userExists = await UserModel.findOne({ email });
        if(userExists) {
            res.status(409).json({ message: "user already exists" });
            return;
        }
    
        const user = await UserModel.create({
            username,
            email,
            password,
        });
    
        res.status(201).json({ message: "user created successfully" });
    } catch (error) {
        console.log("signup error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const signinHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
    
        const existingUser = await UserModel.findOne({ email, password });
        if(!existingUser) {
            res.status(404).json({ message: "user doesn't exists or incorrect password" });
            return;
        }
    
        const token = sign({ id: existingUser._id }, process.env.JWT_SECRET as string);
    
        res.status(200).json({ message: "signup successful", token });
    } catch (error) {
        console.log("signin error", error)
        res.status(500).json({ message: "Internal server error" });
    }
}
