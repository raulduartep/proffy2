declare module NodeJS {
  interface ProcessEnv {
    SECRET_KEY: string;
    BASE_URL: string;
    MAIL_HOST: string;
    MAIL_PORT: number;
    MAIl_USER: string;
    MAIL_PASSWORD: string;
    FRONT_URL: string
  }
}
