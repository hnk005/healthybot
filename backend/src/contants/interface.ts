import { Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  avatar: string;
  email: string;
  password: string;
  isVerified: boolean;
  comparePassword: (password: string) => Promise<boolean>;
}
