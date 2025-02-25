import { HTTP_STATUS } from "@/contants/httpStatus";
import { RegisterRequest } from "@/contants/request";
import authWorker from "@/worker/verify.worker";
import { Response } from "express";
import { v4 as uuidv4 } from 'uuid';

const { addJobVerifyEmailToQueue } = authWorker;

const verifyMiddleware = {
    verifyUser: async (req: RegisterRequest, res: Response) => {
        try {

            const { email, isValid } = req.body;

            if (!isValid) {
                await addJobVerifyEmailToQueue({ email, id: uuidv4() });
            }

        } catch (err) {
            console.error(err);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Lỗi server" });
        }

    }
}

export default verifyMiddleware;