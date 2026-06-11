import { api, normalizeApiError } from './api';
import type { Responsavel } from './types';

export type ResponsavelRequest = Partial<Omit<Responsavel, 'id' | 'bebes'>> & {
  bebeId?: number;
  parentesco?: string;
};

export async function createResponsavel(payload: ResponsavelRequest) {
  try {
    const { data } = await api.post<Responsavel>('/responsaveis', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao cadastrar responsavel.');
  }
}

export async function listResponsaveis() {
  try {
    const { data } = await api.get<Responsavel[]>('/responsaveis');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar responsaveis.');
  }
}

export async function getResponsavelProfile(responsavelId: number) {
  try {
    const { data } = await api.get<Responsavel>(`/responsaveis/${responsavelId}`);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar perfil do responsavel.');
  }
}

export async function updateResponsavel(id: number, payload: ResponsavelRequest) {
  try {
    const { data } = await api.patch<Responsavel>(`/responsaveis/${id}`, payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao atualizar responsavel.');
  }
}

export async function deleteResponsavel(id: number) {
  try {
    await api.delete(`/responsaveis/${id}`);
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao apagar responsavel.');
  }
}
