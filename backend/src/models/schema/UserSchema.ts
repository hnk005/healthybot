import { Schema } from "mongoose";
import { UserInterface } from "@/contants/interface";
import bcrypt from "bcryptjs";

// Schema User
export const UserSchema: Schema<UserInterface> = new Schema(
  {
    email: {
      type: String,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserSchema.pre<UserInterface>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre<UserInterface>("updateOne", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default UserSchema;
