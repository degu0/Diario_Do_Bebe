import type {
  AppUserType,
  BannerVariant,
  HomeBannerNotification,
  NotificationMoment,
  NotificationPlan,
  ResponsibleReportNotificationContext,
  SpecialDateEvent,
  SpecialDateType,
  TeacherReportReminderContext,
} from '@/types/notification';
import {
  mockResponsibleReportNotifications,
  mockSpecialDateEvents,
  mockTeacherReportReminders,
} from './mockData';

const SPECIAL_DATE_OFFSETS: Array<{ days: number; moment: NotificationMoment }> = [
  { days: 7, moment: 'one_week_before' },
  { days: 1, moment: 'one_day_before' },
  { days: 0, moment: 'same_day' },
];

const startOfDay = (value: Date) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const addDays = (value: Date, amount: number) => {
  const date = new Date(value);
  date.setDate(date.getDate() + amount);
  return date;
};

const toDateOnly = (value: Date) => {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const createTriggerAt = (date: string, hour: number, minute: number) => {
  const triggerDate = new Date(`${date}T00:00:00`);
  triggerDate.setHours(hour, minute, 0, 0);
  return triggerDate.toISOString();
};

const getDaysUntil = (date: string, referenceDate = new Date()) => {
  const current = startOfDay(referenceDate).getTime();
  const target = startOfDay(new Date(`${date}T00:00:00`)).getTime();

  return Math.round((target - current) / (1000 * 60 * 60 * 24));
};

export function getBannerVariantForSpecialDate(type: SpecialDateType): BannerVariant {
  return type === 'holiday' || type === 'no_class' ? 'holiday' : 'meeting';
}

export function buildSpecialDateNotificationPlans(event: SpecialDateEvent): NotificationPlan[] {
  return SPECIAL_DATE_OFFSETS.map(({ days, moment }) => {
    const eventDate = new Date(`${event.date}T00:00:00`);
    const triggerDate = addDays(eventDate, -days);
    const triggerAt = createTriggerAt(toDateOnly(triggerDate), 8, 0);

    if (moment === 'same_day') {
      return {
        key: `${event.id}-${moment}`,
        category: 'special_date',
        audience: 'all',
        title: `${event.title} e hoje`,
        body: event.description || `Confira os detalhes de ${event.title}.`,
        triggerAt,
        bannerVariant: getBannerVariantForSpecialDate(event.type),
        metadata: {
          eventId: event.id,
          eventType: event.type,
          eventDate: event.date,
        },
      };
    }

    if (moment === 'one_day_before') {
      return {
        key: `${event.id}-${moment}`,
        category: 'special_date',
        audience: 'all',
        title: `${event.title} e amanha`,
        body: event.description || `Fique atento ao compromisso de ${event.title}.`,
        triggerAt,
        bannerVariant: getBannerVariantForSpecialDate(event.type),
        metadata: {
          eventId: event.id,
          eventType: event.type,
          eventDate: event.date,
        },
      };
    }

    return {
      key: `${event.id}-${moment}`,
      category: 'special_date',
      audience: 'all',
      title: `${event.title} em 1 semana`,
      body: event.description || `Programe-se para ${event.title}.`,
      triggerAt,
      bannerVariant: getBannerVariantForSpecialDate(event.type),
      metadata: {
        eventId: event.id,
        eventType: event.type,
        eventDate: event.date,
      },
    };
  });
}

export function buildResponsibleReportNotificationPlan(
  context: ResponsibleReportNotificationContext,
): NotificationPlan {
  return {
    key: `report-available-${context.childId}-${context.date}`,
    category: 'daily_report_available',
    audience: 'responsible',
    title: 'Relatorio do dia disponivel',
    body: `O relatorio diario de ${context.childName} ja pode ser visualizado.`,
    triggerAt: createTriggerAt(context.date, 17, 30),
    bannerVariant: 'report_available',
    metadata: {
      childId: context.childId,
      childName: context.childName,
      reportId: context.reportId ?? null,
      reportDate: context.date,
    },
  };
}

export function buildTeacherReportReminderPlan(
  context: TeacherReportReminderContext,
): NotificationPlan {
  const reportLabel =
    context.pendingCount === 1
      ? 'Ainda falta 1 relatorio para fechar o dia.'
      : `Ainda faltam ${context.pendingCount} relatorios para fechar o dia.`;

  return {
    key: `report-reminder-${context.className}-${context.date}`,
    category: 'daily_report_reminder',
    audience: 'teacher',
    title: 'Lembrete de relatorio diario',
    body: `${reportLabel} Turma ${context.className}.`,
    triggerAt: createTriggerAt(context.date, 16, 0),
    bannerVariant: 'report_reminder',
    metadata: {
      className: context.className,
      pendingCount: context.pendingCount,
      reportDate: context.date,
    },
  };
}

export function getHomeBannerForUser(
  userType: AppUserType,
  referenceDate = new Date(),
): HomeBannerNotification | null {
  const specialEventCandidate = mockSpecialDateEvents
    .map((event) => ({
      event,
      daysUntil: getDaysUntil(event.date, referenceDate),
    }))
    .filter((item) => [0, 1, 7].includes(item.daysUntil))
    .sort((left, right) => left.daysUntil - right.daysUntil)[0];

  const responsibleCandidate =
    userType === 'responsible'
      ? mockResponsibleReportNotifications.find(
          (item) => getDaysUntil(item.date, referenceDate) === 0,
        )
      : null;

  const teacherCandidate =
    userType === 'teacher'
      ? mockTeacherReportReminders.find((item) => getDaysUntil(item.date, referenceDate) === 0)
      : null;

  if (specialEventCandidate?.daysUntil === 0) {
    return {
      type: getBannerVariantForSpecialDate(specialEventCandidate.event.type),
      title: `${specialEventCandidate.event.title} e hoje`,
      subtitle:
        specialEventCandidate.event.description ||
        `Veja os detalhes de ${specialEventCandidate.event.title}.`,
    };
  }

  if (responsibleCandidate) {
    return {
      type: 'report_available',
      title: 'Relatorio do dia disponivel',
      subtitle: `Veja como foi o dia de ${responsibleCandidate.childName}.`,
    };
  }

  if (teacherCandidate) {
    return {
      type: 'report_reminder',
      title: 'Lembrete de relatorio diario',
      subtitle:
        teacherCandidate.pendingCount === 1
          ? `Ainda falta 1 ficha da ${teacherCandidate.className}.`
          : `Ainda faltam ${teacherCandidate.pendingCount} fichas da ${teacherCandidate.className}.`,
    };
  }

  if (specialEventCandidate?.daysUntil === 1) {
    return {
      type: getBannerVariantForSpecialDate(specialEventCandidate.event.type),
      title: `${specialEventCandidate.event.title} e amanha`,
      subtitle:
        specialEventCandidate.event.description ||
        `Prepare-se para ${specialEventCandidate.event.title}.`,
    };
  }

  if (specialEventCandidate?.daysUntil === 7) {
    return {
      type: getBannerVariantForSpecialDate(specialEventCandidate.event.type),
      title: `${specialEventCandidate.event.title} em 1 semana`,
      subtitle:
        specialEventCandidate.event.description ||
        `Organize-se para ${specialEventCandidate.event.title}.`,
    };
  }

  return null;
}

export function getMockSpecialDateEvents() {
  return mockSpecialDateEvents;
}

export function getMockResponsibleReportNotifications() {
  return mockResponsibleReportNotifications;
}

export function getMockTeacherReportReminders() {
  return mockTeacherReportReminders;
}
