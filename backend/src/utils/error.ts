import { HTTP_STATUS } from "@/contants/httpStatus";
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class ErrorHandler extends Error {
    status: number;

    constructor(message: string, status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        super(message);
        this.status = status;
        this.logErrorToFile();
        this.sendErrorEmail();
    }

    private logErrorToFile() {
        const logMessage = `${new Date().toISOString()} - Status: ${this.status} - Message: ${this.message}\n`;
        fs.appendFileSync("error.log", logMessage);
    }

    private async sendErrorEmail() {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: "Server Error Log",
            text: `An error occurred:\n\nStatus: ${this.status}\nMessage: ${this.message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Failed to send error email:", error);
        }
    }
}

export default ErrorHandler;