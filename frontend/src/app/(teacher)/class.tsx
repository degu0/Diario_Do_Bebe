import { useTeacherAttendance } from '@/context/TeacherAttendanceContext';
import { useThemeContext } from '@/context/ThemeContext';
import type { TeacherChild } from '@/types/teacherChild';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileIcon = require('@/assets/icon/profile.png');

export default function Claass() {
  const { theme, isDark } = useThemeContext();
  const { children, markAttendance } = useTeacherAttendance();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
  const [search, setSearch] = useState('');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedAbsentIds, setSelectedAbsentIds] = useState<string[]>([]);
  const [attendanceConfirmed, setAttendanceConfirmed] = useState(false);

  const filteredKids = useMemo(
    () => children.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
    [children, search],
  );

  const selectedAbsentIdSet = useMemo(() => new Set(selectedAbsentIds), [selectedAbsentIds]);

  const toggleAbsentSelection = (childId: string) => {
    setSelectedAbsentIds((currentIds) => {
      const nextIds = currentIds.includes(childId)
        ? currentIds.filter((selectedId) => selectedId !== childId)
        : [...currentIds, childId];

      if (nextIds.length === 0) {
        setSelectionMode(false);
      }

      return nextIds;
    });
  };

  const handleChildLongPress = (childId: string) => {
    setAttendanceConfirmed(false);
    setSelectionMode(true);
    setSelectedAbsentIds((currentIds) =>
      currentIds.includes(childId) ? currentIds : [...currentIds, childId],
    );
  };

  const handleChildPress = (childId: string) => {
    if (selectionMode) {
      setAttendanceConfirmed(false);
      toggleAbsentSelection(childId);
      return;
    }

    router.navigate(`/baby/${childId}`);
  };

  const handleConfirmAttendance = async () => {
    await Promise.all(
      children.map((child) =>
        markAttendance(child.id, selectedAbsentIdSet.has(child.id) ? 'absent' : 'present'),
      ),
    );

    setAttendanceConfirmed(true);
    setSelectionMode(false);
    setSelectedAbsentIds([]);
  };

  const getAttendanceBadge = (child: TeacherChild) => {
    if (!attendanceConfirmed) {
      if (selectedAbsentIdSet.has(child.id)) {
        return {
          label: 'Ausente',
          backgroundColor: isDark ? '#442222' : '#FBE7E4',
          color: theme.colors.error,
        };
      }

      return {
        label: 'Standby',
        backgroundColor: theme.colors.infoBackground,
        color: theme.colors.info,
      };
    }

    if (child.attendance === 'present') {
      return {
        label: 'Presente',
        backgroundColor: theme.colors.successBackground,
        color: theme.colors.success,
      };
    }

    if (child.attendance === 'absent') {
      return {
        label: 'Ausente',
        backgroundColor: isDark ? '#442222' : '#FBE7E4',
        color: theme.colors.error,
      };
    }

    return {
      label: 'Sem check-in',
      backgroundColor: theme.colors.infoBackground,
      color: theme.colors.info,
    };
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
        </View>

        <View style={styles.contentCard}>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Check-in rapido</Text>
            <Text style={styles.tipText}>
              Segure uma crianca por 3 segundos para marcar ausencia. Depois, toque nos demais nomes
              para ajustar a selecao antes de confirmar.
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.inputSearch}
              placeholder="Pesquisar crianca..."
              placeholderTextColor={styles.placeholder.color}
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.buttonSearch}>
              <Image source={require('@/assets/icon/search.png')} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.listCard}>
            {filteredKids.map((item) => {
              const attendanceBadge = getAttendanceBadge(item);
              const isAbsentSelected = !attendanceConfirmed && selectedAbsentIdSet.has(item.id);
              const isStandby = !attendanceConfirmed && !isAbsentSelected;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.card,
                    isStandby && styles.standbyCard,
                    isAbsentSelected && styles.absentSelectedCard,
                  ]}
                  onPress={() => handleChildPress(item.id)}
                  onLongPress={() => handleChildLongPress(item.id)}
                  delayLongPress={1000}
                  activeOpacity={0.9}
                >
                  <Image source={profileIcon} style={styles.imageKid} />
                  <View style={styles.informationContainer}>
                    <Text style={styles.kidName}>{item.name}</Text>
                    <Text style={styles.kidClass}>Turma {item.className}</Text>
                  </View>
                  <View
                    style={[
                      styles.attendanceBadge,
                      { backgroundColor: attendanceBadge.backgroundColor },
                    ]}
                  >
                    <Text style={[styles.attendanceBadgeText, { color: attendanceBadge.color }]}>
                      {attendanceBadge.label}
                    </Text>
                  </View>
                  {isAbsentSelected ? (
                    <View style={styles.selectedIcon}>
                      <Text style={styles.selectedIconText}>✓</Text>
                    </View>
                  ) : null}
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {selectionMode && selectedAbsentIds.length > 0 ? (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmAttendance}
              activeOpacity={0.9}
            >
              <Text style={styles.confirmButtonText}>Confirmar Presencas</Text>
            </TouchableOpacity>
          ) : null}
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
      gap: 14,
    },
    tipCard: {
      borderRadius: 16,
      padding: 14,
      backgroundColor: isDark ? '#191327' : '#F4EEFF',
      borderWidth: 1,
      borderColor: isDark ? '#2C2440' : '#E7DDF7',
    },
    tipTitle: {
      fontSize: 13,
      color: theme.colors.primary,
      fontFamily: 'Nunito_700Bold',
      marginBottom: 4,
    },
    tipText: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.75,
      lineHeight: 18,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 10,
      gap: 8,
    },
    inputSearch: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text,
    },
    buttonSearch: {
      padding: 2,
    },
    searchIcon: {
      width: 18,
      height: 18,
      tintColor: theme.colors.text,
    },
    listCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#222' : '#F1ECFB',
      backgroundColor: theme.colors.surface,
      borderLeftWidth: 4,
      borderLeftColor: 'transparent',
    },
    standbyCard: {
      opacity: 0.42,
    },
    absentSelectedCard: {
      backgroundColor: isDark ? '#241721' : '#FFF7F5',
      borderLeftColor: theme.colors.error,
    },
    imageKid: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: theme.colors.tertiary,
    },
    informationContainer: {
      flexDirection: 'column',
      gap: 4,
      flex: 1,
    },
    kidName: {
      fontSize: 14,
      fontFamily: 'Nunito_600SemiBold',
      color: theme.colors.text,
    },
    kidClass: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.7,
    },
    attendanceBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
    },
    attendanceBadgeText: {
      fontSize: 11,
      fontFamily: 'Nunito_700Bold',
    },
    chevron: {
      fontSize: 20,
      color: theme.colors.text,
      opacity: 0.3,
    },
    selectedIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.error,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedIconText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
    confirmButton: {
      minHeight: 48,
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    confirmButtonText: {
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
      color: '#FFFFFF',
    },
    placeholder: {
      color: isDark ? '#8E8AA5' : '#94A3B8',
    },
  });
