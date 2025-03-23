import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { register, login, logout, forgotPassword } from "@/api/auth";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { updatePassword, updateVerify, userInfo } from "@/api/user";
import Loading from "@/components/base/Loader";
import DialogCommon from "@/components/common/DialogCommon";
import ValidateOtp from "@/components/validation/ValidateOtp";
import { verifyEmail, verifyForgotPassword } from "@/api/validation";
import { sendOtpForgotPassword, sendOtpVerifyEmail } from "@/api/send";
import ChangePassword from "@/components/auth/ChangePassword";

export interface AuthContextInterface {
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOtp: (callback: () => Promise<AxiosResponse>) => Promise<void>;
  resendOtp: (callback: () => Promise<void>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [titleVerifyOtp, setTitleVerifyOtp] = useState("");
  const [emailVerifyOtp, setEmailVerifyOtp] = useState("");
  const [verify, setVerify] =
    useState<(email: string, otp: string) => Promise<AxiosResponse>>();
  const [resend, setReSend] = useState<(email: string) => Promise<void>>();
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [showChangePassword, setShơChangePassword] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: userInfo,
    retry: false,
  });
  const verifyEmailOtp = async (email: string, otp: string) => {
    await verifyEmail(email, otp);
    return await updateVerify();
  };

  const verifyForgotPasswordOtp = async (email: string, otp: string) => {
    const res = await verifyForgotPassword(email, otp);
    setShơChangePassword(true);
    return res;
  };

  const resendOtpVerifyEmail = async (email: string) => {
    await sendOtpVerifyEmail(email);
  };

  const resendOtpForgotPasswrod = async (email: string) => {
    await sendOtpForgotPassword(email);
  };

  const handleShowVerifyOtp = useCallback(
    (
      title: string,
      email: string,
      verifyCallback: (email: string, otp: string) => Promise<AxiosResponse>,
      sendCallback: (email: string) => Promise<void>,
    ) => {
      setTitleVerifyOtp(title);
      setEmailVerifyOtp(email);
      setVerify(() => verifyCallback);
      setReSend(() => sendCallback);
      setShowVerifyOtp(true);
    },
    [],
  );

  const handleCloseVerifyOtp = () => {
    setTitleVerifyOtp("");
    setEmailVerifyOtp("");
    setShowVerifyOtp(false);
  };
  const handleLogin = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      const toastId = toast.loading("Vui lòng chờ...");
      try {
        await login(email, password);
        window.location.reload();
        return true;
      } catch (error) {
        const res = error as AxiosError<{ message: string }>;
        if (res.status === 401) {
          handleShowVerifyOtp(
            "Email chưa xác nhận",
            email,
            verifyEmailOtp,
            resendOtpVerifyEmail,
          );
        }
        toast.update(toastId, {
          render: res.response?.data?.message || res.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return false;
      }
    },
    [handleShowVerifyOtp],
  );

  const handleRegister = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      const toastId = toast.loading("Vui lòng chờ...");
      try {
        const { data } = await register(email, password);
        handleShowVerifyOtp(
          "Xác nhận Email",
          email,
          verifyEmailOtp,
          resendOtpVerifyEmail,
        );

        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        return true;
      } catch (error) {
        const res = error as AxiosError<{ message: string }>;
        toast.update(toastId, {
          render: res.response?.data?.message || res.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });

        return false;
      }
    },
    [handleShowVerifyOtp],
  );

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      const res = error as AxiosError<{ message: string }>;
      toast.error(res.response?.data?.message || res.message);
    }
  }, []);

  const handleChangePassword = useCallback(
    async (newPassword: string): Promise<void> => {
      const toastId = toast.loading("Vui lòng chờ...");
      try {
        const { data } = await updatePassword(newPassword);
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        handleCloseVerifyOtp();
        setShơChangePassword(false);
      } catch (error) {
        const res = error as AxiosError<{ message: string }>;
        toast.update(toastId, {
          render: res.response?.data?.message || res.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    },
    [],
  );

  const handleVerifyOtp = useCallback(
    async (callback: () => Promise<AxiosResponse>): Promise<void> => {
      const toastId = toast.loading("Vui lòng chờ...");
      try {
        const { data } = await callback();
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        handleCloseVerifyOtp();
      } catch (error) {
        const res = error as AxiosError<{ message: string }>;
        toast.update(toastId, {
          render: res.response?.data?.message || res.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    },
    [],
  );

  const handleResendOtp = useCallback(
    async (callback: () => Promise<void>): Promise<void> => {
      try {
        await callback();
      } catch (error) {
        const res = error as AxiosError<{ message: string }>;
        toast.error(res.response?.data?.message || res.message);
      }
    },
    [],
  );

  const handleForgotPassword = useCallback(
    async (email: string): Promise<boolean> => {
      const toastId = toast.loading("Vui lòng chờ...");
      try {
        const { data } = await forgotPassword(email);
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        handleShowVerifyOtp(
          "Xác nhận đặt lại mật khẩu",
          email,
          verifyForgotPasswordOtp,
          resendOtpForgotPasswrod,
        );
        return true;
      } catch (error) {
        const res = error as AxiosError<{ message: string }>;
        toast.update(toastId, {
          render: res.response?.data?.message || res.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return false;
      }
    },
    [handleShowVerifyOtp],
  );

  const contextValue = useMemo(
    () => ({
      user: data?.data,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
      changePassword: handleChangePassword,
      forgotPassword: handleForgotPassword,
      verifyOtp: handleVerifyOtp,
      resendOtp: handleResendOtp,
    }),
    [
      data,
      handleLogin,
      handleRegister,
      handleLogout,
      handleVerifyOtp,
      handleResendOtp,
      handleForgotPassword,
      handleChangePassword,
    ],
  );
  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <DialogCommon open={showVerifyOtp} onClose={() => {}}>
        <ValidateOtp
          title={titleVerifyOtp}
          email={emailVerifyOtp}
          verify={verify}
          resend={resend}
          onClose={handleCloseVerifyOtp}
        />
      </DialogCommon>
      <DialogCommon open={showChangePassword} onClose={() => {}}>
        <ChangePassword />
      </DialogCommon>
    </AuthContext.Provider>
  );
};
