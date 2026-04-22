import type {
  ResponsibleReportNotificationContext,
  SpecialDateEvent,
  TeacherReportReminderContext,
} from '@/types/notification';

const toDateOnly = (value: Date) => {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const addDays = (baseDate: Date, amount: number) => {
  const nextDate = new Date(baseDate);
  nextDate.setHours(0, 0, 0, 0);
  nextDate.setDate(nextDate.getDate() + amount);
  return nextDate;
};

const today = new Date();

export const mockSpecialDateEvents: SpecialDateEvent[] = [
  {
    id: 'special-meeting-parents',
    title: 'Reuniao de pais',
    description: 'Encontro com a coordenacao para alinhar recados e atividades do mes.',
    date: toDateOnly(addDays(today, 1)),
    type: 'reunion',
    location: 'Sala multiuso',
    timeStart: '18:30',
    timeEnd: '19:30',
    audience: 'all',
  },
  {
    id: 'special-holiday',
    title: 'Feriado escolar',
    description: 'A escola estara fechada e nao havera atividades presenciais.',
    date: toDateOnly(addDays(today, 7)),
    type: 'holiday',
    location: 'Sem aula',
    timeStart: '00:00',
    timeEnd: '00:00',
    audience: 'all',
  },
];

export const mockResponsibleReportNotifications: ResponsibleReportNotificationContext[] = [
  {
    childId: '1',
    childName: 'Maria Clara',
    date: toDateOnly(today),
    reportId: 'daily-report-1',
  },
];

export const mockTeacherReportReminders: TeacherReportReminderContext[] = [
  {
    date: toDateOnly(today),
    className: 'Turma A1',
    pendingCount: 3,
  },
];
