declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGODB_URI: string;
      SECTION_SECRET: string;
      ACCESS_TOKEN_SECRET: string;
      EXISTS_ACCESS_TOKEN: string;
      EXISTS_REFRESH_TOKEN: string;
      REFRESH_TOKEN_SECRET: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
    }
  }
}

export {};
