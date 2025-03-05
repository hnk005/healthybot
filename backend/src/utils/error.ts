import { HTTP_STATUS_CODE } from "@/contants/enum";
import { logger } from "./logger";

class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HTTP_STATUS_CODE;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HTTP_STATUS_CODE,
    description: string,
    isOperational: boolean,
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(
    name = "",
    httpCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    description = "Lỗi máy chủ nội bộ",
    isOperational = true,
  ) {
    super(name, httpCode, description, isOperational);
  }
}

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await logger.error(
      "Error message from the centralized error-handling component: ",
      err,
    );
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
