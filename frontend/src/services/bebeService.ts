import { api, normalizeApiError } from './api';
import type { Bebe } from './types';

export type BebeRequest = Partial<Omit<Bebe, 'id' | 'escola' | 'turma' | 'responsaveis'>> & {
  nome?: string;
  dataNascimento?: string;
  turmaId?: number;
  escolaId?: number;
};

export async function createBebe(payload: BebeRequest) {
  try {
    const { data } = await api.post<Bebe>('/bebes', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao cadastrar bebe.');
  }
}

export async function listBebes() {
  try {
    const { data } = await api.get<Bebe[]>('/bebes');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar bebes.');
  }
}

export async function listBebesByTurma(turmaId: number) {
  try {
    const { data } = await api.get<Bebe[]>(`/bebes/turma/${turmaId}`);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar bebes da turma.');
  }
}

export async function getBebeProfile(bebeId: number) {
  try {
    const { data } = await api.get<Bebe>(`/bebes/perfil/${bebeId}`);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar perfil do bebe.');
  }
}

export async function updateBebe(id: number, payload: BebeRequest) {
  try {
    const { data } = await api.patch<Bebe>(`/bebes/${id}`, payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao atualizar bebe.');
  }
}

export async function deleteBebe(id: number) {
  try {
    await api.delete(`/bebes/${id}`);
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao apagar bebe.');
  }
}
