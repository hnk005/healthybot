import { Schema, UpdateQuery } from "mongoose";
import { UserInterface } from "@/contants/shema";
import bcrypt from "bcryptjs";

// Schema User
export const UserSchema: Schema<UserInterface> = new Schema(
  {
    email: {
      type: String,
      required: true,
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

UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<UserInterface>;

  if (update.password) {
    const salt = await bcrypt.genSalt(12);
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update);
  }

  next();
});

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default UserSchema;
