import { Request } from 'express';

export interface RegisterRequest extends Request {
  body: {
    email: string;
    avatar?: string;
    password: string;
    name: string;
    isValid?: boolean;
  };
}
