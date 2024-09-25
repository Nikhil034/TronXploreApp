// / <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string;
    readonly PORT:number;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

declare module '*.png'
