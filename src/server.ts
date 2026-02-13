import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { error } from "node:console";

dotenv.config();

const PORT = process.env.PORT || "5001";
const MONGO_URI = process.env.MONGO_URI || "no-mongo-uri";

mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MangoDB");
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });

}).catch((error) => console.error("Eror connecting to MangoDB:", error))
