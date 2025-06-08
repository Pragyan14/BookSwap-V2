import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


import authRoutes from "./routes/auth.routes.js"
import bookRoutes from "./routes/book.routes.js"

app.use("/api/auth", authRoutes)
app.use("/api/book", bookRoutes)

app.use(errorHandler)

export { app };