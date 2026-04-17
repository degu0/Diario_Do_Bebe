import { CardDateSpecial } from '@/components/CardDateSpecial';
import { useThemeContext } from '@/context/ThemeContext';
import { typeConfig } from '@/utils/typeConfig';
import { Feather } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { SafeAreaView } from 'react-native-safe-area-context';
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
];

export default function CalendarScreen() {
  const { theme, isDark } = useThemeContext();
  const [day, setDay] = useState<DateData>();

  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  const selectedDaySpecial = daySpecial.find((item) => item.date === day?.dateString);

  const markedDates = useMemo(() => {
    return daySpecial.reduce(
      (acc, item) => {
        acc[item.date] = { marked: true, dotColor: theme.colors.secondary };
        return acc;
      },
      {} as Record<string, object>,
    );
  }, [theme]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroGlowLarge} />
          <View style={styles.heroGlowSmall} />

          <Text style={styles.title}>Calendario</Text>
          <Text style={styles.subtitle}>Veja eventos, feriados e datas importantes.</Text>
        </View>

        <View style={styles.contentCard}>
          <Calendar
            style={styles.calendar}
            renderArrow={(direction: 'right' | 'left') => (
              <Feather size={24} color={theme.colors.text} name={`chevron-${direction}`} />
            )}
            headerStyle={styles.calendarHeader}
            theme={{
              textMonthFontSize: 18,
              monthTextColor: theme.colors.text,
              todayTextColor: theme.colors.primary,
              selectedDayBackgroundColor: theme.colors.primary,
              selectedDayTextColor: theme.colors.surface,
              calendarBackground: theme.colors.surface,
              textDayStyle: { color: theme.colors.text },
              textDisabledColor: isDark ? '#555' : '#ccc',
              arrowStyle: { margin: 0, padding: 0 },
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
            dayComponent={({ date, state }: { date?: DateData; state?: DayState }) => {
              if (!date) return null;
              const specialInfo = daySpecial.find((item) => item.date === date.dateString);
              const hasEvent = !!markedDates[date.dateString];
              const isSelected = date.dateString === day?.dateString;

              return (
                <TouchableOpacity
                  style={[styles.day, isSelected && styles.daySelected]}
                  onPress={() => setDay(date)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      (state === 'inactive' || state === 'disabled') && styles.disabled,
                      state === 'today' && styles.today,
                      isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {date.day}
                  </Text>
                  {hasEvent && (
                    <View
                      style={[
                        styles.dot,
                        isSelected && styles.dotSelected,
                        {
                          backgroundColor: specialInfo?.type
                            ? typeConfig[specialInfo?.type].border
                            : theme.colors.secondary,
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#120F1F' : '#6C4ED9',
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 160,
    },
    hero: {
      position: 'relative',
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 88,
      overflow: 'hidden',
    },
    heroGlowLarge: {
      position: 'absolute',
      width: 240,
      height: 240,
      borderRadius: 120,
      backgroundColor: 'rgba(255,255,255,0.10)',
      top: -90,
      right: -60,
    },
    heroGlowSmall: {
      position: 'absolute',
      width: 130,
      height: 130,
      borderRadius: 65,
      backgroundColor: 'rgba(255,255,255,0.08)',
      bottom: 20,
      left: -40,
    },
    title: {
      fontSize: 24,
      color: '#FFFFFF',
      fontWeight: '700',
      marginBottom: 4,
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.76)',
      fontSize: 13,
      marginTop: 2,
    },
    contentCard: {
      marginTop: -44,
      marginHorizontal: 12,
      padding: 16,
      borderRadius: 28,
      backgroundColor: theme.colors.background,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 18,
      elevation: 8,
    },
    calendar: {
      borderRadius: 18,
      overflow: 'hidden',
      paddingBottom: 12,
      elevation: 4,
      marginBottom: 20,
      backgroundColor: theme.colors.surface,
      shadowColor: isDark ? '#000' : theme.colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
    },
    calendarHeader: {
      borderBottomWidth: 0.5,
      borderBottomColor: isDark ? '#444' : '#E8E8E8',
      paddingBottom: 10,
      marginBottom: 10,
      backgroundColor: theme.colors.surface,
    },
    day: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    daySelected: {
      backgroundColor: theme.colors.primary,
    },
    dayText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text,
    },
    dayTextSelected: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.surface,
    },
    disabled: {
      opacity: 0.3,
    },
    today: {
      color: theme.colors.primary,
      fontWeight: '700',
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginTop: 2,
    },
    dotSelected: {
      backgroundColor: theme.colors.surface,
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
      color: theme.colors.text,
      opacity: 0.6,
    },
  });
