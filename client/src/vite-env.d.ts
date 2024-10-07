// / <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string;
    readonly PORT:number;
    readonly VITE_LIGHTHOUSE_ID: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

declare module '*.png'
