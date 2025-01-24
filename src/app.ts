import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import { globalCatch } from "./middlewares/global-catch.middleware";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1", userRouter);
app.use(globalCatch);

export { app };