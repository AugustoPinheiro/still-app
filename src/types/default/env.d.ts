declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_IS_DEV: string;
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_COMETCHAT_APP_ID: string;
      EXPO_PUBLIC_COMETCHAT_REGION: string;
      EXPO_PUBLIC_COMETCHAT_AUTH_KEY: string;
      EXPO_PUBLIC_XIMILAR_URL: string;
      EXPO_PUBLIC_XIMILAR_KEY: string;
      EXPO_PUBLIC_AMPLITUDE_API_KEY: string;
      EXPO_PUBLIC_ONE_SIGNAL_APP_ID: string;
    }
  }
}

export {};
