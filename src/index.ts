import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db";
import { app } from "./app";
import { PORT } from "./constants";

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("error connecting to the database");
});