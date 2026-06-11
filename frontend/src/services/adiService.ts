import { api, normalizeApiError } from './api';
import type { Adi } from './types';

export type AdiRequest = Partial<Omit<Adi, 'id' | 'escola' | 'turmas'>>;

export async function createAdi(payload: AdiRequest) {
  try {
    const { data } = await api.post<Adi>('/adis', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao cadastrar ADI.');
  }
}

export async function listAdis() {
  try {
    const { data } = await api.get<Adi[]>('/adis');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar ADIs.');
  }
}

export async function getAdiProfile(adiId: number) {
  try {
    const { data } = await api.get<Adi>(`/adis/${adiId}`);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar perfil da ADI.');
  }
}

export async function updateAdi(id: number, payload: AdiRequest) {
  try {
    const { data } = await api.patch<Adi>(`/adis/${id}`, payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao atualizar ADI.');
  }
}

export async function deleteAdi(id: number) {
  try {
    await api.delete(`/adis/${id}`);
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao apagar ADI.');
  }
}
