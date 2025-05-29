import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


import authRoutes from "./routes/auth.routes.js"

app.use("/api/auth",authRoutes)

export {app};