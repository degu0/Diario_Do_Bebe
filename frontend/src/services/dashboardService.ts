import { api, normalizeApiError } from './api';
import type { Bebe, DiarioIndividual, Ocorrencia, Turma, VinculoFamiliar } from './types';

export type TeacherDashboardResponse = {
  perfil: {
    nome: string;
    escola: string;
    saudacao: string;
  };
  estatisticas: {
    preenchidos: number;
    ausentes: number;
    totalTurma: number;
  };
  ocorrencias: Ocorrencia[];
  listaCrianças?: DiarioIndividual[];
  listaCriancas?: DiarioIndividual[];
  turmaAtual: Turma[];
  listarAlunos: Bebe[];
};

export type ParentDashboardResponse = {
  perfil: {
    nome: string;
    escola: string;
    turma: string;
    saudacao: string;
  };
  filhos: VinculoFamiliar[];
  statusHoje:
    | {
        presente: boolean;
        alimentacao?: string | null;
        sono?: string | null;
      }
    | {
        presente: false;
        mensagem: string;
      };
};

export async function getTeacherDashboard(adiId: number, turmaId: number) {
  try {
    const { data } = await api.get<TeacherDashboardResponse>(`/dashboard/${adiId}/${turmaId}`);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar dashboard da professora.');
  }
}

export async function getParentDashboard(parentId: number, babyId: number) {
  try {
    const { data } = await api.get<ParentDashboardResponse>(
      `/dashboard/parents/${parentId}/${babyId}`,
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Erro ao buscar dashboard do responsavel.');
  }
}
