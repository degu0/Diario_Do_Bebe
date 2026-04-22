import type { NotificationAudience, SpecialDateType } from './notification';

export type Event = {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: SpecialDateType;
  location: string;
  audience: NotificationAudience;
  notificationIds: string[];
};
