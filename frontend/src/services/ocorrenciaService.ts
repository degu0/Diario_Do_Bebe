import { api, normalizeApiError } from './api';
import type { Ocorrencia } from './types';

export type OcorrenciaRequest = Partial<Omit<Ocorrencia, 'id' | 'dia'>>;

export async function createOcorrencia(payload: OcorrenciaRequest) {
  try {
    const { data } = await api.post<Ocorrencia>('/ocorrencias', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao cadastrar ocorrencia.');
  }
}

export async function listOcorrencias() {
  try {
    const { data } = await api.get<Ocorrencia[]>('/ocorrencias');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar ocorrencias.');
  }
}

export async function updateOcorrencia(id: number, payload: OcorrenciaRequest) {
  try {
    const { data } = await api.patch<Ocorrencia>(`/ocorrencias/${id}`, payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao atualizar ocorrencia.');
  }
}

export async function deleteOcorrencia(id: number) {
  try {
    await api.delete(`/ocorrencias/${id}`);
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao apagar ocorrencia.');
  }
}
