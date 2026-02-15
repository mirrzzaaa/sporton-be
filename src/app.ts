import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes"
import { authentication } from "./middleewares/auth.middleware";
import path from "path";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes"


const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use("/api/auth", authRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/product", productRoutes)

app.get("/", (req, res) => {
    res.send("Sporton Backend Api is Running");
})

app.get("/test-middleware", authentication, (req, res) => {
    res.send("Hore, kamu bisa mengakses karena menggunakan token!");
})

export default app;