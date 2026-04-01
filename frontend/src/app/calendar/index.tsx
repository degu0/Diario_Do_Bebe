import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { ptBR } from '../../utils/LocaleCalendarConfig';


LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"


export default function CalendarPage() {
  const [day, setDay] = useState<DateData>();

  return (
    <View style={styles.container}>
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
        markedDates={
          day && {
            [day.dateString]: { selected: true },
          }
        }
        dayComponent={({
          date,
          state,
        }: {
          date?: DateData;
          state?: DayState;
        }) => {
          if (!date) return null;
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
            </TouchableOpacity>
          );
        }}
      />
    </View>
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
});
