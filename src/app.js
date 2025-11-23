import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import usersRouter from "./routes/users.routes.js";
import loginRouter from "./routes/login.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));


app.use(usersRouter)
app.use(loginRouter)

export default app
