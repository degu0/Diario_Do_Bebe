import { useTeacherAttendance } from '@/context/TeacherAttendanceContext';
import { useThemeContext } from '@/context/ThemeContext';
import type { TeacherChild } from '@/types/teacherChild';
import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileIcon = require('@/assets/icon/profile.png');

export default function Claass() {
  const { theme, isDark } = useThemeContext();
  const { children, markAttendance } = useTeacherAttendance();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
  const [search, setSearch] = useState('');
  const swipeableRefs = useRef<Record<string, Swipeable | null>>({});

  const filteredKids = useMemo(
    () => children.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
    [children, search],
  );

  const handleAttendanceConfirm = (
    child: TeacherChild,
    attendance: 'present' | 'absent',
    direction: 'left' | 'right',
  ) => {
    const swipeableRef = swipeableRefs.current[child.id];
    const attendanceLabel = attendance === 'present' ? 'presente' : 'ausente';

    Alert.alert('Confirmar presenca', `Deseja marcar ${child.name} como ${attendanceLabel}?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => swipeableRef?.close(),
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          await markAttendance(child.id, attendance);
          swipeableRef?.close();
        },
      },
    ]);
  };

  const handleSwipeOpen = (child: TeacherChild, direction: 'left' | 'right') => {
    const attendance = direction === 'right' ? 'present' : 'absent';
    handleAttendanceConfirm(child, attendance, direction);
  };

  const renderAttendanceAction = (
    label: string,
    description: string,
    backgroundColor: string,
    alignment: 'left' | 'right',
  ) => (
    <View
      style={[
        styles.swipeAction,
        {
          backgroundColor,
          justifyContent: alignment === 'left' ? 'flex-start' : 'flex-end',
        },
      ]}
    >
      <View style={styles.swipeActionContent}>
        <Text style={styles.swipeActionLabel}>{label}</Text>
        <Text style={styles.swipeActionDescription}>{description}</Text>
      </View>
    </View>
  );

  const getAttendanceBadge = (child: TeacherChild) => {
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
              Arraste para a esquerda para marcar presente e para a direita para marcar ausente.
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

              return (
                <Swipeable
                  key={item.id}
                  ref={(ref) => {
                    swipeableRefs.current[item.id] = ref;
                  }}
                  overshootLeft={false}
                  overshootRight={false}
                  leftThreshold={70}
                  rightThreshold={70}
                  onSwipeableOpen={(direction) => handleSwipeOpen(item, direction)}
                  renderLeftActions={() =>
                    renderAttendanceAction(
                      'Ausente',
                      'Deslize para marcar ausencia',
                      theme.colors.error,
                      'left',
                    )
                  }
                  renderRightActions={() =>
                    renderAttendanceAction(
                      'Presente',
                      'Deslize para confirmar presenca',
                      theme.colors.success,
                      'right',
                    )
                  }
                >
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.navigate(`/baby/${item.id}`)}
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
                    <Text style={styles.chevron}>›</Text>
                  </TouchableOpacity>
                </Swipeable>
              );
            })}
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
    swipeAction: {
      flex: 1,
      paddingHorizontal: 20,
    },
    swipeActionContent: {
      justifyContent: 'center',
      height: '100%',
    },
    swipeActionLabel: {
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
      color: '#FFFFFF',
    },
    swipeActionDescription: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.88)',
      marginTop: 2,
    },
    placeholder: {
      color: isDark ? '#8E8AA5' : '#94A3B8',
    },
  });
