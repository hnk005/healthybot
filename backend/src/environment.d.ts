declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            MONGODB_URI: string;
            NAME_DB: string;
            JWT_SECRET: string;
        }
    }
}

export {};