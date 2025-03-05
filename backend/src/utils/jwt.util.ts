import jwt from "jsonwebtoken";

const jwtUtil = {
  generateAccessToken: (userId: string) =>
    jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" }),
  generateRefreshToken: (userId: string) =>
    jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" }),
  verifyAccessToken: (token: string) =>
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { userId: string },
  verifyRefreshToken: (token: string) =>
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as { userId: string },
};

export default jwtUtil;
