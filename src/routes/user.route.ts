import { Router } from "express";
import { addContentHandler, signinHandler, signupHandler } from "../controllers/user.controller";
import { userAuth } from "../middlewares/user-auth.middleware";
const userRouter = Router();

userRouter.post("/signup", signupHandler);
userRouter.post("/signin", signinHandler);
userRouter.get("/add-content", userAuth, addContentHandler);

export { userRouter };
