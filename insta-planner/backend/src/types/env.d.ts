declare namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      PORT?: string;
      JWT_SECRET: string;
    }
  }  