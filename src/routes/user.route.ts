import { Router } from "express";
import { signinHandler, signupHandler } from "../controllers/auth.controller";
import { userAuth } from "../middlewares/user-auth.middleware";
import {
  addContentHandler,
  createShareLinkHandler,
  deleteContentHandler,
  getContentHandler,
  shareBrainHandler,
} from "../controllers/content.controller";
const userRouter = Router();

// auth-routes
userRouter.post("/signup", signupHandler);
userRouter.post("/signin", signinHandler);

// content-routes
userRouter.post("/add-content", userAuth, addContentHandler);
userRouter.get("/contents", userAuth, getContentHandler);
userRouter.delete("/content", userAuth, deleteContentHandler);
userRouter.post("/brain/share", userAuth, createShareLinkHandler);
userRouter.get("/share/:shareLink", shareBrainHandler);

export { userRouter };
