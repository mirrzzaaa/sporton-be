import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes"
import { authentication } from "./middleewares/auth.middleware";


const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Sporton Backend Api is Running");
})

app.get("/test-middleware", authentication, (req, res) => {
    res.send("Hore, kamu bisa mengakses karena menggunakan token!");
})

export default app;