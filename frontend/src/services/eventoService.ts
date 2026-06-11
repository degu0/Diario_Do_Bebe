import { api, normalizeApiError } from './api';
import type { Evento } from './types';

export type EventoRequest = Partial<Omit<Evento, 'id' | 'dataCriacao'>>;

export async function createEvento(payload: EventoRequest) {
  try {
    const { data } = await api.post<Evento>('/eventos', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao cadastrar evento.');
  }
}

export async function listEventos() {
  try {
    const { data } = await api.get<Evento[]>('/eventos');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar eventos.');
  }
}

export async function listEventosByTurma(turmaId: number) {
  try {
    const { data } = await api.get<Evento[]>(`/eventos/${turmaId}`);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar calendario da turma.');
  }
}

export async function updateEvento(id: number, payload: EventoRequest) {
  try {
    const { data } = await api.patch<Evento>(`/eventos/${id}`, payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao atualizar evento.');
  }
}

export async function deleteEvento(id: number) {
  try {
    await api.delete(`/eventos/${id}`);
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao apagar evento.');
  }
}
