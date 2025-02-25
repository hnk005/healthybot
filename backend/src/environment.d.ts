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
            GOOGLE_CLIENT_ID: string,
            GOOGLE_CLIENT_SECRET: string,
            FACEBOOK_CLIENT_ID: string,
            FACEBOOK_CLIENT_SECRET: string,
            GITHUB_CLIENT_ID: string,
            GITHUB_CLIENT_SECRET: strnig,

    }
}
}

export { };