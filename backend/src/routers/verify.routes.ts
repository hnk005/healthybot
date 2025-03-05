import express from "express";
import verifyController from "@/controllers/verify.controller";

const verifyRoutes = express.Router();

const { verifyOTP } = verifyController;

//public
verifyRoutes.post("/otp", verifyOTP);

export default verifyRoutes;
