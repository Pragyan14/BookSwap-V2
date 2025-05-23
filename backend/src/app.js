import express from "express";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))


import authRoutes from "./routes/auth.routes.js"

app.use("/api/auth",authRoutes)

export {app};