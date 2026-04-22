import { CardDateSpecial } from '@/components/CardDateSpecial';
import { useAuth } from '@/context/AuthContext';
import { useThemeContext } from '@/context/ThemeContext';
import { getMockSpecialDateEvents } from '@/utils/notifications/catalog';
import { typeConfig } from '@/utils/typeConfig';
import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ptBR } from '../../utils/LocaleCalendarConfig';
import { CardHasReport } from '@/components/CardHasReport';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

const daySpecial = getMockSpecialDateEvents();

const DAILY_REPORT_DATES = ['2026-04-14', '2026-04-15', '2026-04-16'];
const STORAGE_KEY = 'viewed_reports';

export default function CalendarScreen() {
  const { theme, isDark } = useThemeContext();
  const { user } = useAuth();
  const router = useRouter();
  const [day, setDay] = useState<DateData>();
  const [viewedReports, setViewedReports] = useState<string[]>([]);

  const isResponsible = user?.type === 'responsible';
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setViewedReports(JSON.parse(stored));
    };
    load();
  }, []);

  const markAsViewed = async (date: string) => {
    if (viewedReports.includes(date)) return;
    const updated = [...viewedReports, date];
    setViewedReports(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const selectedDaySpecial = daySpecial.find((item) => item.date === day?.dateString);
  const selectedHasReport = isResponsible && DAILY_REPORT_DATES.includes(day?.dateString ?? '');
  const selectedReportViewed = viewedReports.includes(day?.dateString ?? '');

  const markedDates = useMemo(() => {
    const acc: Record<string, object> = {};

    daySpecial.forEach((item) => {
      acc[item.date] = { marked: true, dotColor: typeConfig[item.type].border };
    });

    if (isResponsible) {
      DAILY_REPORT_DATES.forEach((date) => {
        const alreadyViewed = viewedReports.includes(date);
        acc[date] = {
          ...(acc[date] ?? {}),
          marked: true,
          dotColor: alreadyViewed ? (isDark ? '#666' : '#bbb') : theme.colors.primary,
        };
      });
    }

    return acc;
  }, [theme, isDark, isResponsible, viewedReports]);

  const handleOpenReport = () => {
    if (day?.dateString) {
      markAsViewed(day.dateString);
      router.push('/dailyReport/1');
    }
  };

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
          <Text style={styles.title}>Calendário</Text>
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
              selectedDayBackgroundColor: theme.colors.success,
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
                  ...(markedDates[day.dateString] ?? {}),
                  selected: true,
                },
              }),
            }}
            dayComponent={({ date, state }: { date?: DateData; state?: DayState }) => {
              if (!date) return null;

              const specialInfo = daySpecial.find((item) => item.date === date.dateString);
              const hasSpecial = !!specialInfo;
              const hasReport = isResponsible && DAILY_REPORT_DATES.includes(date.dateString);
              const reportViewed = viewedReports.includes(date.dateString);
              const isSelected = date.dateString === day?.dateString;

              return (
                <TouchableOpacity
                  style={[
                    styles.day,
                    isSelected && styles.daySelected,
                    hasReport && !reportViewed && !isSelected && styles.dayWithReport,
                  ]}
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

                  <View style={styles.dotsRow}>
                    {hasSpecial && (
                      <View
                        style={[
                          styles.dot,
                          { backgroundColor: typeConfig[specialInfo.type].border },
                        ]}
                      />
                    )}
                    {hasReport && (
                      <View
                        style={[
                          styles.dot,
                          {
                            backgroundColor: reportViewed
                              ? isDark
                                ? '#555'
                                : '#ccc'
                              : theme.colors.primary,
                          },
                          isSelected && styles.dotSelected,
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          {isResponsible && (
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
                <Text style={[styles.legendText, { color: theme.colors.text }]}>
                  Relatório disponível
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: isDark ? '#555' : '#bbb' }]} />
                <Text style={[styles.legendText, { color: theme.colors.text }]}>
                  Já visualizado
                </Text>
              </View>
            </View>
          )}

          <View style={styles.eventsSection}>
            {selectedHasReport && (
              <CardHasReport
                onPress={handleOpenReport}
                selectedReportViewed={selectedReportViewed}
              />
            )}
            {selectedDaySpecial && (
              <CardDateSpecial
                date={selectedDaySpecial.date}
                title={selectedDaySpecial.title}
                timeStart={selectedDaySpecial.timeStart ?? '00:00'}
                timeEnd={selectedDaySpecial.timeEnd ?? '00:00'}
                type={selectedDaySpecial.type}
                location={selectedDaySpecial.location}
              />
            )}
            {day && !selectedDaySpecial && !selectedHasReport && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Nenhum evento para este dia</Text>
              </View>
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
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 160 },

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
      color: 'rgba(255,255,255,0.76)',
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
      marginBottom: 12,
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
    dayWithReport: {
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
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
    disabled: { opacity: 0.3 },
    today: { color: theme.colors.primary, fontWeight: '700' },

    dotsRow: {
      flexDirection: 'row',
      gap: 3,
      marginTop: 1,
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
    },
    dotSelected: {
      backgroundColor: theme.colors.surface,
    },
    legend: {
      flexDirection: 'row',
      gap: 16,
      paddingHorizontal: 4,
      paddingBottom: 12,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendText: {
      fontSize: 12,
    },

    eventsSection: { gap: 10 },
    emptyState: { alignItems: 'center', paddingVertical: 24 },
    emptyText: { fontSize: 13, color: theme.colors.text, opacity: 0.6 },
  });
