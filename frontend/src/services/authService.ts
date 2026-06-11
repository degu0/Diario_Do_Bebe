import { api, normalizeApiError } from './api';
import type { AuthUser, UserType } from './types';

export type LoginRequest = {
  email: string;
  password: string;
  type?: UserType;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export async function loginRequest(payload: LoginRequest) {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      email: payload.email,
      password: payload.password,
      type: payload.type,
    });
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao realizar login.');
  }
}

export async function getAuthenticatedUser() {
  try {
    const { data } = await api.get<AuthUser>('/auth/me');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao restaurar sessao.');
  }
}
