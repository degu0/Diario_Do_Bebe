import { api, normalizeApiError } from './api';
import type { VinculoFamiliar } from './types';

export type VinculoRequest = {
  parentesco: string;
};

export async function vincularFilho(responsavelId: number, bebeId: number, payload: VinculoRequest) {
  try {
    const { data } = await api.post<VinculoFamiliar>(
      `/vinculo/${responsavelId}/${bebeId}`,
      payload,
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao vincular responsavel ao bebe.');
  }
}
