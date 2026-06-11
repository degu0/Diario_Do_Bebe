export type UserType = 'responsible' | 'teacher';

export type Escola = {
  id: number;
  nome: string;
  endereco?: string | null;
  telefone?: string | null;
};

export type Turma = {
  id: number;
  nome?: string | null;
  anoLetivo: number;
  escolaId: number;
};

export type Bebe = {
  id: number;
  nome: string;
  dataNascimento?: string | null;
  genero?: string | null;
  alergias?: string | null;
  medicamentos?: string | null;
  observacoesSaude?: string | null;
  autorizadosBusca?: string | null;
  fotoUrl?: string | null;
  escolaId: number;
  turmaId: number;
  escola?: Escola;
  turma?: Turma;
  responsaveis?: VinculoFamiliar[];
};

export type Responsavel = {
  id: number;
  nome: string;
  cpf: string;
  telefone?: string | null;
  email: string;
  senhaHash?: string;
  local_trabalho?: string | null;
  endereco?: string | null;
  bebes?: VinculoFamiliar[];
};

export type Adi = {
  id: number;
  nome: string;
  matricula: string;
  email: string;
  telefone?: string | null;
  senhaHash?: string;
  escolaId: number;
  escola?: Escola;
  turmas?: Turma[];
};

export type VinculoFamiliar = {
  id: number;
  bebeId: number;
  responsavelId: number;
  parentesco: string;
  bebe?: Bebe;
  responsavel?: Responsavel;
};

export type DiarioIndividual = {
  id: number;
  data: string;
  frequencia: boolean;
  chegadaHumor?: string | null;
  alimentacao?: string | null;
  banho: boolean;
  sono?: string | null;
  desenvolvimentoPedagogico?: string | null;
  observacoesFinais?: string | null;
  atividades?: string | null;
  fralda?: string | null;
  enviadoEm?: string | null;
  bebeId: number;
  adiId: number;
};

export type Evento = {
  id: number;
  titulo: string;
  descricao?: string | null;
  local?: string | null;
  dataEvento?: string | null;
  horario_inicio?: string | null;
  horario_fim?: string | null;
  dataCriacao?: string | null;
  escolaId: number;
  turmaId: number;
};

export type Ocorrencia = {
  id: number;
  titulo: string;
  descricao?: string | null;
  dia: string;
  horario: string;
  prioridade: string;
  bebeId: number;
  adiId: number;
};

export type AuthUser = {
  id: number;
  nome: string;
  email: string;
  type: UserType;
  escolaId?: number;
  escola?: Escola;
  turmas?: Turma[];
  bebes?: VinculoFamiliar[];
};
