import { HTTP_STATUS_CODE } from "@/contants/enum";
import { Chat } from "@/models";
import { APIError } from "@/utils/error";
import { NextFunction, Request, Response } from "express";

const chatController = {
  getHistoryChat: async (req: Request, res: Response, next: NextFunction) => {
    const { limit } = req.query;
    const { userId } = req.body;

    if (!limit && !userId) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Yêu cầu không hợp lệ",
      );
    }

    try {
      const chat = await Chat.find({ userId })
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .select("_id title createdAt")
        .exec();
      if (chat.length === 0) {
        res.status(HTTP_STATUS_CODE.NO_CONTENT).json();
        next();
      }
      res.status(HTTP_STATUS_CODE.OK).json(chat);
      next();
    } catch (error) {
      next(error);
    }
  },
  getMessage: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const { userId } = req.body;
    try {
      if (!id && !userId) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Yêu cầu không hợp lệ",
        );
      }
      const chat = await Chat.findById({ _id: id, userId })
        .sort({ createdAt: -1 })
        .select("messages.userMessage  messages.assistantResponse")
        .exec();
      if (chat) {
        const data = chat.messages.map((c) => ({
          user: c.userMessage,
          assistant: c.assistantResponse,
        }));
        res.status(HTTP_STATUS_CODE.OK).json(data);
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  createNewChat: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    try {
      if (userId) {
        const chat = new Chat({ userId, message: [] });
        await chat.save();
        res.status(HTTP_STATUS_CODE.CREATED).json();
        next();
      }
    } catch (error) {
      next(error);
    }
  },
  createSectionChat: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { chatId, userMessage, assistantResponse } = req.body;
    const chat = await Chat.findOne({ _id: chatId });
    try {
      if (chat) {
        chat.messages.push({ userMessage, assistantResponse });
        await chat.save();
        res.status(HTTP_STATUS_CODE.CREATED).json();
        next();
      }

      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Yêu cầu không hợp lệ",
      );
    } catch (error) {
      next(error);
    }
  },
  updateTitleChat: async (req: Request, res: Response, next: NextFunction) => {
    const { chatId, newTitle } = req.body;
    try {
      await Chat.findByIdAndUpdate(chatId, { title: newTitle });
      res.status(HTTP_STATUS_CODE.OK).json();
      next();
    } catch (error) {
      next(error);
    }
  },
  deleteChat: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    try {
      if (!id) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Yêu cầu không hợp lệ",
        );
      }

      await Chat.findByIdAndDelete(id);
      res.status(HTTP_STATUS_CODE.OK).json();
      next();
    } catch (error) {
      next(error);
    }
  },
};

export default chatController;
