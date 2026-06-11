import { api, normalizeApiError } from './api';
import type { Escola } from './types';

export type EscolaRequest = Partial<Omit<Escola, 'id'>>;

export async function createEscola(payload: EscolaRequest) {
  try {
    const { data } = await api.post<Escola>('/escolas', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao cadastrar escola.');
  }
}

export async function listEscolas() {
  try {
    const { data } = await api.get<Escola[]>('/escolas');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar escolas.');
  }
}

export async function updateEscola(id: number, payload: EscolaRequest) {
  try {
    const { data } = await api.patch<Escola>(`/escolas/${id}`, payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao atualizar escola.');
  }
}

export async function deleteEscola(id: number) {
  try {
    await api.delete(`/escolas/${id}`);
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao apagar escola.');
  }
}
