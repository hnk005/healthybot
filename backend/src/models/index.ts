import { UserInterface } from '@/contants/interface';
import UserSchema from './schema/UserSchema';
import mongoose from 'mongoose';

export const User = mongoose.model<UserInterface>('User', UserSchema);
