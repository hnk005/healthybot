import jwt from "jsonwebtoken";

const jwtUtil = {
  generateToken: (userId: string, secret: string, expiresIn: any) =>
    jwt.sign({ userId }, secret, { expiresIn: expiresIn }),
  verifyToken: (token: string, secret: string): { userId: string } | null => {
    try {
      return jwt.verify(token, secret) as {
        userId: string;
      };
    } catch (error) {
      const err = error as Error;
      if (err.name === "TokenExpiredError") {
        return null;
      }
      return null;
    }
  },
};

export default jwtUtil;
