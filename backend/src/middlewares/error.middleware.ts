import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '@/utils/error';

const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  res.status(err.status).json({
    status: 'error',
    statusCode: err.status,
    message: err.message,
  });
};

export default errorMiddleware;
