import { Router } from 'express';
import { signupHandler } from '../controllers/user.controller';
const userRouter = Router();

userRouter.post("/signup", signupHandler);

export { userRouter };