import { api, normalizeApiError } from './api';
import type { Turma } from './types';

export type TurmaRequest = Partial<Omit<Turma, 'id'>>;

export async function createTurma(payload: TurmaRequest) {
  try {
    const { data } = await api.post<Turma>('/turmas', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao cadastrar turma.');
  }
}

export async function listTurmas() {
  try {
    const { data } = await api.get<Turma[]>('/turmas');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar turmas.');
  }
}

export async function updateTurma(id: number, payload: TurmaRequest) {
  try {
    const { data } = await api.patch<Turma>(`/turmas/${id}`, payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao atualizar turma.');
  }
}

export async function deleteTurma(id: number) {
  try {
    await api.delete(`/turmas/${id}`);
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao apagar turma.');
  }
}
