import type { Event } from '@/types/event';
import type { NotificationAudience, SpecialDateType } from '@/types/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { v4 as uuidv4 } from 'uuid';
import { scheduleDaySpecial } from './notifications/scheduleLocal';

const STORAGE_KEY = 'events';

const toDateOnly = (value: Date) => {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

type AddEventInput = {
  title: string;
  date: Date;
  description?: string;
  type?: SpecialDateType;
  location?: string;
  audience?: NotificationAudience;
};

export async function getEvents(): Promise<Event[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveEvents(events: Event[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export async function addEvent(input: AddEventInput) {
  const events = await getEvents();

  const newEvent: Event = {
    id: uuidv4(),
    title: input.title,
    description: input.description,
    date: toDateOnly(input.date),
    type: input.type ?? 'holiday',
    location: input.location ?? 'Escola',
    audience: input.audience ?? 'all',
    notificationIds: [],
  };

  const notificationIds = await scheduleDaySpecial({
    id: newEvent.id,
    title: newEvent.title,
    description: newEvent.description,
    date: newEvent.date,
    type: newEvent.type,
    location: newEvent.location,
    audience: 'all',
  });

  newEvent.notificationIds = notificationIds;

  await saveEvents([...events, newEvent]);
  return newEvent;
}

export async function removeEvent(eventId: string) {
  const events = await getEvents();

  const event = events.find((item) => item.id === eventId);
  if (!event) return;

  await Promise.all(
    event.notificationIds.map((notificationId) =>
      Notifications.cancelScheduledNotificationAsync(notificationId),
    ),
  );

  const updatedEvents = events.filter((item) => item.id !== eventId);
  await saveEvents(updatedEvents);
}

export async function listEvents() {
  return getEvents();
}
