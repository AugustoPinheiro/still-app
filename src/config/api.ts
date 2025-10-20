import axios, { isAxiosError } from 'axios';

import { EXPO_PUBLIC_API_URL } from '@/config/env';
import { getAccessToken } from '@/config/mmkvStorage';

const api = axios.create({
  baseURL: 'https://still.flukeoperadora.com.br',
  timeout: 30000,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  async (error) => {
    if (isAxiosError(error)) {
      console.error('error.response?.data', error.response?.data);

      return await Promise.reject(error.response?.data);
    }

    return await Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (isAxiosError(error)) {
      const errorHandler = {
        message: error?.response?.data?.message,
        status: error?.response?.status,
      };

      return await Promise.reject(errorHandler);
    }

    return await Promise.reject(error);
  }
);

export { api };
