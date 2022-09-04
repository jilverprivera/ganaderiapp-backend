export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOCAL_PG_HOST: string;
      LOCAL_PG_PORT: string;
      LOCAL_PG_USER: string;
      LOCAL_PG_PASSWORD: string;
      LOCAL_PG_DATABASE: string;
      JWT_ACCESS_TOKEN_SECRET_SEED: string;
      JWT_EXPIRE_TIME: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_CLOUD_API_KEY: number;
      CLOUDINARY_CLOUD_API_SECRET: string;
    }
  }
}
