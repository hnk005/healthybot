import otpGenerator from "otp-generator";

const otpUtil = {
  generateOTP: (len: number): string => {
    return otpGenerator.generate(len, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
      lowerCaseAlphabets: false,
    });
  },
};
export default otpUtil;
