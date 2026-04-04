import { CardDateSpecial } from '@/components/CardDateSpecial';
import Colors from '@/constants/Colors';
import { typeConfig } from '@/utils/typeConfig';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { ptBR } from '../../utils/LocaleCalendarConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

const daySpecial = [
  {
    date: '2026-04-03',
    title: 'Feriado Nacional',
    timeStart: '00:00',
    timeEnd: '00:00',
    type: 'holiday' as const,
    location: 'Feriado',
  },
  {
    date: '2026-04-10',
    title: 'Reunião de Pais',
    timeStart: '18:00',
    timeEnd: '20:00',
    type: 'reunion' as const,
    location: 'Sala de reuniões',
  },
  {
    date: '2026-04-15',
    title: 'Sem Aula',
    timeStart: '00:00',
    timeEnd: '00:00',
    type: 'no_class' as const,
    location: 'Maternal',
  },
  {
    date: '2026-04-22',
    title: 'Visita ao Parque',
    timeStart: '08:00',
    timeEnd: '11:00',
    type: 'tour' as const,
    location: 'Parque Estadual',
  },
  {
    date: '2026-04-28',
    title: 'Reunião Pedagógica',
    timeStart: '14:00',
    timeEnd: '16:00',
    type: 'reunion' as const,
    location: 'Auditório',
  },
];

export default function CalendarScreen() {
  const [day, setDay] = useState<DateData>();

  const selectedDaySpecial = daySpecial.find(
    (item) => item.date === day?.dateString,
  );

  const markedDates = daySpecial.reduce(
    (acc, item) => {
      acc[item.date] = { marked: true, dotColor: Colors.colors.purple_dark };
      return acc;
    },
    {} as Record<string, object>,
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Calendar
        style={styles.calendar}
        renderArrow={(direction: 'right' | 'left') => (
          <Feather size={24} color="#E8E8E8" name={`chevron-${direction}`} />
        )}
        headerStyle={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#E8E8E8',
          paddingBottom: 10,
          marginBottom: 10,
        }}
        theme={{
          textMonthFontSize: 18,
          monthTextColor: '#E8E8E8',
          todayTextColor: Colors.colors.purple_dark,
          selectedDayBackgroundColor: Colors.colors.purple_dark,
          selectedDayTextColor: '#E8E8E8',
          calendarBackground: '#585858',
          textDayStyle: { color: '#E8E8E8' },
          textDisabledColor: '#717171',
          arrowStyle: {
            margin: 0,
            padding: 0,
          },
        }}
        minDate={new Date().toDateString()}
        hideExtraDays
        onDayPress={setDay}
        markedDates={{
          ...markedDates,
          ...(day && {
            [day.dateString]: {
              selected: true,
              marked: !!markedDates[day.dateString],
            },
          }),
        }}
        dayComponent={({
          date,
          state,
        }: {
          date?: DateData;
          state?: DayState;
        }) => {
          if (!date) return null;
          const specialInfo = daySpecial.find(
            (item) => item.date === date.dateString,
          );
          const hasEvent = !!markedDates[date.dateString];
          return (
            <TouchableOpacity
              style={[
                styles.day,
                date.dateString === day?.dateString && styles.daySelected,
              ]}
              onPress={() => setDay(date)}
            >
              <Text
                style={[
                  styles.dayText,
                  (state === 'inactive' || state === 'disabled') &&
                    styles.disabled,
                  state === 'today' && styles.today,
                  date.dateString === day?.dateString && styles.dayTextSelected,
                ]}
              >
                {date.day}
              </Text>
              {hasEvent && (
                <View
                  style={[
                    styles.dot,
                    date.dateString === day?.dateString && styles.dotSelected,
                    {
                      backgroundColor: specialInfo?.type ? typeConfig[specialInfo?.type].border : undefined
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.eventsSection}>
        {selectedDaySpecial ? (
          <CardDateSpecial
            date={selectedDaySpecial.date}
            title={selectedDaySpecial.title}
            timeStart={selectedDaySpecial.timeStart}
            timeEnd={selectedDaySpecial.timeEnd}
            type={selectedDaySpecial.type}
            location={selectedDaySpecial.location}
          />
        ) : (
          day && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nenhum evento para este dia</Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0fa',
    padding: 16,
  },
  calendar: {
    borderRadius: 18,
    overflow: 'hidden',
    paddingBottom: 12,
    shadowColor: '#b39dcc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  day: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: {
    backgroundColor: Colors.colors.purple_dark,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E8E8E8',
  },
  dayTextSelected: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  disabled: {
    color: '#717171',
  },
  today: {
    color: Colors.colors.purple_dark,
    fontWeight: '700',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  dotSelected: {
    backgroundColor: '#fff',
  },
  eventsSection: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 13,
    color: '#9a9a9a',
  },
});
