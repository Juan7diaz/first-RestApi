declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string,
    HOST: string,
    PORT_DATABASE: number,
    USERNAME: string,
    PASSWORD: string,
    DATABASE: string,
  }
}