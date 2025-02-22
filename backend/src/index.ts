import process from "process";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routers/auth.routes";
import morgan from "morgan";

dotenv.config()
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors<Request>());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Kết nối Database
mongoose.connect(process.env.MONGODB_URI + process.env.NAME_DB)
    .then(() => console.log('Đã kết nối Database thành công'))
    .catch((err) => console.log('Lỗi kết nối Database:', err));

app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
