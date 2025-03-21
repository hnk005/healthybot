import { HTTP_STATUS_CODE } from "@/contants/enum";
import { logger } from "./logger";
import { ValidationError } from "express-validator";

class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HTTP_STATUS_CODE;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HTTP_STATUS_CODE,
    description: string,
    cause: ValidationError[],
    isOperational: boolean,
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.cause = cause;

    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(
    name = "",
    httpCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    description = "Lỗi máy chủ nội bộ",
    cause: ValidationError[] = [],
    isOperational = true,
  ) {
    super(name, httpCode, description, cause, isOperational);
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
