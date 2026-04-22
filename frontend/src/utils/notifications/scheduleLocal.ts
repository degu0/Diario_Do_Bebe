import type {
  NotificationPlan,
  ResponsibleReportNotificationContext,
  SpecialDateEvent,
  TeacherReportReminderContext,
} from '@/types/notification';
import * as Notifications from 'expo-notifications';
import {
  buildResponsibleReportNotificationPlan,
  buildSpecialDateNotificationPlans,
  buildTeacherReportReminderPlan,
} from './catalog';

async function scheduleNotificationPlan(plan: NotificationPlan) {
  const triggerDate = new Date(plan.triggerAt);

  if (Number.isNaN(triggerDate.getTime()) || triggerDate <= new Date()) {
    return null;
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: plan.title,
      body: plan.body,
      data: {
        category: plan.category,
        audience: plan.audience,
        ...plan.metadata,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    },
  });
}

async function scheduleNotificationPlans(plans: NotificationPlan[]) {
  const scheduledIds = await Promise.all(plans.map((plan) => scheduleNotificationPlan(plan)));
  return scheduledIds.filter((id): id is string => !!id);
}

export async function scheduleDaySpecial(event: SpecialDateEvent) {
  return scheduleNotificationPlans(buildSpecialDateNotificationPlans(event));
}

export async function scheduleResponsibleReportNotification(
  context: ResponsibleReportNotificationContext,
) {
  const notificationId = await scheduleNotificationPlan(
    buildResponsibleReportNotificationPlan(context),
  );

  return notificationId ? [notificationId] : [];
}

export async function scheduleTeacherReminder(context: TeacherReportReminderContext) {
  const notificationId = await scheduleNotificationPlan(buildTeacherReportReminderPlan(context));

  return notificationId ? [notificationId] : [];
}
