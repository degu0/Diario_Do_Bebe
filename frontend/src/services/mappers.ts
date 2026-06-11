import type { ResponsibleChild } from '@/types/responsibleChild';
import type { TeacherChild } from '@/types/teacherChild';
import type { Bebe, DiarioIndividual, VinculoFamiliar } from './types';

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function formatDateLabel(value?: string | null) {
  if (!value) return 'Hoje';

  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date(value));
}

function ageFromBirthDate(value?: string | null) {
  if (!value) return 'Idade nao informada';

  const birth = new Date(value);
  const today = new Date();
  const years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth() + years * 12;

  if (months < 12) return `${Math.max(months, 0)} meses`;
  return `${Math.floor(months / 12)} anos`;
}

function parseSono(sono?: string | null) {
  const [inicio = '--:--', fim = '--:--'] = (sono || '').split(' - ');
  return { inicio, fim };
}

function parseFralda(fralda?: string | null) {
  if (!fralda || fralda.toLowerCase().includes('nao')) {
    return { fraldaTrocada: false, quantidadeFraldas: 0 };
  }

  const quantidade = Number(fralda.match(/\d+/)?.[0] || 1);
  return { fraldaTrocada: true, quantidadeFraldas: quantidade };
}

function parseAtividades(value?: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
}

const feedingLabels: Record<string, string> = {
  bem: 'Comeu bem',
  pouco: 'Comeu pouco',
  nao: 'Nao comeu',
};

export function mapResponsibleChild(vinculo: VinculoFamiliar, diario?: DiarioIndividual | null): ResponsibleChild {
  const bebe = vinculo.bebe;
  const name = bebe?.nome || 'Crianca';
  const sono = parseSono(diario?.sono);
  const fralda = parseFralda(diario?.fralda);
  const presente = diario?.frequencia ?? false;
  const alimentacao = (diario?.alimentacao || 'nao') as ResponsibleChild['report']['alimentacao'];
  const feedingLabel = feedingLabels[diario?.alimentacao ?? ''] || 'Aguardando';

  return {
    id: String(vinculo.bebeId),
    name,
    age: ageFromBirthDate(bebe?.dataNascimento),
    initials: initialsFromName(name),
    home: {
      attendanceLabel: presente ? 'Presente na creche' : 'Aguardando registro',
      attendanceColor: presente ? '#22C55E' : '#EF4444',
      feedingLabel,
      feedingColor: diario?.alimentacao === 'bem' ? '#3B82F6' : '#F59E0B',
      napLabel: diario?.sono || 'Aguardando',
    },
    report: {
      dateLabel: formatDateLabel(diario?.data),
      schoolClass: bebe?.turma?.nome || 'Turma',
      presenca: presente ? 'presente' : 'ausente',
      humor: (diario?.chegadaHumor || 'neutro') as ResponsibleChild['report']['humor'],
      alimentacao,
      sonecaInicio: sono.inicio,
      sonecaFim: sono.fim,
      fraldaTrocada: fralda.fraldaTrocada,
      quantidadeFraldas: fralda.quantidadeFraldas,
      banho: diario?.banho ?? false,
      desenvolvimentoPedagogico: diario?.desenvolvimentoPedagogico ?? null,
      atividades: parseAtividades(diario?.atividades),
      observacoes: diario?.observacoesFinais || 'Ainda nao ha observacoes para este dia.',
      teacherName: 'Professora',
      teacherInitials: 'PR',
    },
  };
}

export function mapTeacherChild(bebe: Bebe, diario?: DiarioIndividual | null): TeacherChild {
  const attendance = diario ? (diario.frequencia ? 'present' : 'absent') : 'unmarked';

  return {
    id: String(bebe.id),
    name: bebe.nome,
    className: bebe.turma?.nome || String(bebe.turmaId),
    attendance,
    reportStatus: diario
      ? diario.frequencia
        ? diario.chegadaHumor || diario.desenvolvimentoPedagogico
          ? 'Preenchida'
          : 'Pendente'
        : 'Ausente'
      : 'Pendente',
  };
}
