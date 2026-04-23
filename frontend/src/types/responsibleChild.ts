export type ResponsibleChildHomeSnapshot = {
  attendanceLabel: string;
  attendanceColor: string;
  feedingLabel: string;
  feedingColor: string;
  napLabel: string;
};

export type ResponsibleChildDailyReport = {
  dateLabel: string;
  schoolClass: string;
  presenca: 'presente' | 'ausente';
  humor: 'animado' | 'neutro' | 'triste' | 'agitado';
  alimentacao: 'bem' | 'pouco' | 'nao';
  sonecaInicio: string;
  sonecaFim: string;
  fraldaTrocada: boolean;
  quantidadeFraldas: number;
  atividades: string[];
  observacoes: string;
  teacherName: string;
  teacherInitials: string;
};

export type ResponsibleChild = {
  id: string;
  name: string;
  age: string;
  initials: string;
  home: ResponsibleChildHomeSnapshot;
  report: ResponsibleChildDailyReport;
};
