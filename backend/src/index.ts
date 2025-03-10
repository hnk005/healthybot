import process from "process";
import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./routers";
import { createClient } from "redis";
import errorMiddleware from "./middlewares/error.middleware";
import requestLogger from "./middlewares/logger.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

export const redisClient = createClient();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(requestLogger);
app.use(cookieParser());
app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded({ limit: "500kb", extended: true }));
app.use(
  session({
    secret: process.env.SECTION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Đã kết nối Database thành công"))
  .catch((err) => console.error("Lỗi kết nối Database:", err));

redisClient
  .connect()
  .then(() => console.log("Đã kết nối Redis thành công"))
  .catch((err) => console.error("Lỗi kết nối Redis:", err));

// Routes
app.use("/api", router);

// Error handling middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
