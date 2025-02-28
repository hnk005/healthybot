declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            MONGODB_URI: string;
            NAME_DB: string;
            ACCESS_TOKEN_SECRET: string;
            REFRESH_TOKEN_SECRET: string;
            EMAIL_USER: string;
            EMAIL_PASS: string;
    }
}
}

export { };