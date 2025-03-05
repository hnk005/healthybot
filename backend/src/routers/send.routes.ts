import express from "express";
import asyncMiddleware from "@/middlewares/async.middleware";

const sendRoutes = express.Router();

const { sendOTP } = asyncMiddleware;

//public
sendRoutes.post("/email-otp", sendOTP);

export default sendRoutes;
