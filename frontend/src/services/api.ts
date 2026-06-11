import axios, { AxiosError } from 'axios';
import Constants from 'expo-constants';
import { getStoredToken } from './secureStorage';

const extra = Constants.expoConfig?.extra as
  | { apiBaseUrl?: string; apiTimeout?: number | string }
  | undefined;

const baseURL =
  process.env.EXPO_PUBLIC_API_BASE_URL || extra?.apiBaseUrl || 'http://localhost:3000';

const timeout = Number(process.env.EXPO_PUBLIC_API_TIMEOUT || extra?.apiTimeout || 10000);

export type ApiError = {
  status?: number;
  message: string;
};

export const api = axios.create({
  baseURL,
  timeout,
});

api.interceptors.request.use(async (config) => {
  const token = await getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string; message?: string }>) => {
    console.log("ERRO REAL DA API:", error.message, error.code);

    const status = error.response?.status;
    const apiMessage = error.response?.data?.error || error.response?.data?.message;

    const fallbackMessage =
      status === 401
        ? 'Sessao expirada. Faca login novamente.'
        : status === 403
          ? 'Voce nao tem permissao para esta acao.'
          : status && status >= 500
            ? 'Erro no servidor. Tente novamente em instantes.'
            : 'Nao foi possivel concluir a solicitacao.';

    return Promise.reject({
      status,
      message: apiMessage || fallbackMessage,
    } satisfies ApiError);
  },
);

export function normalizeApiError(error: unknown, fallbackMessage: string): ApiError {
  if (error && typeof error === 'object' && 'message' in error) {
    return error as ApiError;
  }

  return { message: fallbackMessage };
}
