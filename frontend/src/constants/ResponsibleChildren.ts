import type { ResponsibleChild } from '@/types/responsibleChild';

export const responsibleChildren: ResponsibleChild[] = [
  {
    id: '1',
    name: 'Maria Fernanda',
    age: '1 ano e 2 meses',
    initials: 'MF',
    home: {
      attendanceLabel: 'Presente na creche',
      attendanceColor: '#22C55E',
      feedingLabel: 'Bem',
      feedingColor: '#3B82F6',
      napLabel: '1 h 20 min',
    },
    report: {
      dateLabel: 'Segunda, 14 de Agosto',
      schoolClass: 'Maternal I',
      presenca: 'presente',
      humor: 'animado',
      alimentacao: 'bem',
      sonecaInicio: '13:00',
      sonecaFim: '14:30',
      fraldaTrocada: true,
      quantidadeFraldas: 3,
      atividades: ['Pintura', 'Musicalizacao', 'Parque'],
      observacoes:
        'Maria Fernanda teve um dia muito animado. Participou com entusiasmo das atividades e brincou bastante com os colegas.',
      teacherName: 'Rafaela Azevedo',
      teacherInitials: 'RA',
    },
  },
  {
    id: '2',
    name: 'Zeca Silva',
    age: '3 anos',
    initials: 'ZS',
    home: {
      attendanceLabel: 'Ausente hoje',
      attendanceColor: '#EF4444',
      feedingLabel: 'Comeu pouco',
      feedingColor: '#F59E0B',
      napLabel: 'Sem soneca',
    },
    report: {
      dateLabel: 'Segunda, 14 de Agosto',
      schoolClass: 'Maternal II',
      presenca: 'ausente',
      humor: 'neutro',
      alimentacao: 'pouco',
      sonecaInicio: '--:--',
      sonecaFim: '--:--',
      fraldaTrocada: false,
      quantidadeFraldas: 0,
      atividades: ['Leitura', 'Musica'],
      observacoes:
        'Zeca nao compareceu em periodo integral. A familia sinalizou ausencia parcial e acompanhamento em casa.',
      teacherName: 'Bianca Rocha',
      teacherInitials: 'BR',
    },
  },
];
