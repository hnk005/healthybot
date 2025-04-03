import express from "express";
import authMiddleware from "@/middlewares/auth.middleware";
import chatController from "@/controllers/chat.controller";

const chatRoutes = express.Router();

const { verifyToken } = authMiddleware;

const {
  getHistoryChat,
  getMessage,
  createNewChat,
  createSectionChat,
  updateTitleChat,
  deleteChat,
} = chatController;

// //use
chatRoutes.use(verifyToken);

chatRoutes.get("/get", getHistoryChat);
chatRoutes.get("/get/messages", getMessage);
chatRoutes.post("/create", createNewChat);
chatRoutes.post("/create/section", createSectionChat);
chatRoutes.put("/update/title", updateTitleChat);
chatRoutes.delete("/delete", deleteChat);

export default chatRoutes;
