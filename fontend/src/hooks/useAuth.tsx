import { AuthContext, AuthContextInterface } from "@/providers/Auth.provider";
import { useContext } from "react";

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
