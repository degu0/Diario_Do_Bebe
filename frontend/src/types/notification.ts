export type AppUserType = 'teacher' | 'responsible';

export type NotificationAudience = AppUserType | 'all';

export type SpecialDateType = 'holiday' | 'reunion' | 'no_class' | 'tour';

export type BannerVariant = 'holiday' | 'meeting' | 'report_available' | 'report_reminder';

export type NotificationCategory =
  | 'special_date'
  | 'daily_report_available'
  | 'daily_report_reminder';

export type NotificationMoment = 'one_week_before' | 'one_day_before' | 'same_day' | 'custom';

export type NotificationPlan = {
  key: string;
  category: NotificationCategory;
  audience: NotificationAudience;
  title: string;
  body: string;
  triggerAt: string;
  bannerVariant?: BannerVariant;
  metadata?: Record<string, string | number | boolean | null>;
};

export type SpecialDateEvent = {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: SpecialDateType;
  location: string;
  timeStart?: string;
  timeEnd?: string;
  audience: 'all';
};

export type ResponsibleReportNotificationContext = {
  childId: string;
  childName: string;
  date: string;
  reportId?: string;
};

export type TeacherReportReminderContext = {
  date: string;
  className: string;
  pendingCount: number;
};

export type HomeBannerNotification = {
  title: string;
  subtitle?: string;
  type: BannerVariant;
};
