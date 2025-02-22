import mongoose, { Schema } from "mongoose";
import { UserRole } from "~/contants/enum";
import { UserInterface } from "~/contants/interface";
import bcrypt from "bcryptjs";

// Schema User
export const UserSchema: Schema<UserInterface> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: Object.values(UserRole), // Chỉ nhận "admin" hoặc "user"
            default: UserRole.USER, // Mặc định là user
        },
    },
    { timestamps: true } // Thêm createdAt, updatedAt
);

UserSchema.pre<UserInterface>("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// Hàm kiểm tra mật khẩu
UserSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;