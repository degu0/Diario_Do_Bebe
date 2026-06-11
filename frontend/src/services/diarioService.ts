import { api, normalizeApiError } from './api';
import type { DiarioIndividual } from './types';

export type DiarioRequest = {
  data?: string;
  chegadaHumor?: string | null;
  humor?: string | null;
  alimentacao?: string | null;
  banho?: boolean | 'sim' | 'nao' | null;
  sono?: string | null;
  sonecaInicio?: string | null;
  sonecaFim?: string | null;
  desenvolvimentoPedagogico?: string | number | null;
  observacoes?: string | null;
  observacoesFinais?: string | null;
  atividades?: string[] | string | null;
  fralda?: string | null;
  fraldaTrocada?: boolean | null;
  quantidadeFraldas?: number | null;
  presenca?: 'presente' | 'ausente';
  frequencia?: boolean;
  bebeId?: number;
  adiId?: number;
};

export async function createDiario(payload: DiarioRequest) {
  try {
    const { data } = await api.post<DiarioIndividual>('/diarios', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao salvar diario.');
  }
}

export async function registerPresence(payload: DiarioRequest) {
  try {
    const { data } = await api.post<DiarioIndividual>('/diarios/presenca', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao registrar presenca.');
  }
}

export async function listDiarios() {
  try {
    const { data } = await api.get<DiarioIndividual[]>('/diarios');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar diarios.');
  }
}

export async function getDiario(id: number) {
  try {
    const { data } = await api.get<DiarioIndividual>(`/diarios/${id}`);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar diario.');
  }
}

export async function listDiariosByBebe(bebeId: number, dataFiltro?: string) {
  try {
    const { data } = await api.get<DiarioIndividual[]>(`/diarios/bebe/${bebeId}`, {
      params: dataFiltro ? { data: dataFiltro } : undefined,
    });
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar diarios do bebe.');
  }
}

export async function updateDiario(id: number, payload: DiarioRequest) {
  try {
    const { data } = await api.patch<DiarioIndividual>(`/diarios/${id}`, payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao atualizar diario.');
  }
}

export async function deleteDiario(id: number) {
  try {
    await api.delete(`/diarios/${id}`);
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao apagar diario.');
  }
}
