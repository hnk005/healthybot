import mongoose from "mongoose";
import { createClient } from "redis";

export const redis = createClient();
export const mongodb = mongoose;
