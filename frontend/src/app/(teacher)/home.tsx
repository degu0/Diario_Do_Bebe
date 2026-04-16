import { useThemeContext } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileIcon = require('@/assets/icon/profile.png');

const kids = [
  { id: 1, image: profileIcon, name: 'Charles Junior', status: 'Preenchida' },
  { id: 2, image: profileIcon, name: 'Maria Silva', status: 'Ausente' },
  { id: 3, image: profileIcon, name: 'João Pedro', status: 'Pendente' },
  { id: 4, image: profileIcon, name: 'Ana Beatriz', status: 'Preenchida' },
];

export default function Home() {
  const { theme, isDark } = useThemeContext();
  const router = useRouter();

  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  const name = 'Aline';
  const filledCount = 5;
  const totalCount = 8;
  const progress = filledCount / totalCount;

  const statustheme: Record<string, { bg: string; text: string }> = {
    Preenchida: {
      bg: theme.colors.successBackground,
      text: theme.colors.success,
    },
    Ausente: {
      bg: isDark ? '#442222' : '#FBE7E4',
      text: theme.colors.error,
    },
    Pendente: {
      bg: theme.colors.infoBackground,
      text: theme.colors.info,
    },
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.presentation}>
        <View style={styles.dateUser}>
          <Image source={profileIcon} style={styles.imageUser} />
          <Text style={styles.title}>Bom dia, {name} 👋</Text>
        </View>

        <Text style={styles.subtitle}>Sexta-feira, 13 de março</Text>
        <Text style={styles.subtitle}>Escola | Turma A1</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>⚠️ Feriado em 3 dias</Text>
        </View>

        <View style={styles.bigCard}>
          <Text style={styles.titleCard}>Fichas preenchidas</Text>

          <View style={styles.numberCard}>
            <Text style={styles.numberBig}>{filledCount}</Text>
            <Text style={styles.numberSmall}>/{totalCount}</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        <View style={styles.smallCardsRow}>
          <View style={styles.smallCard}>
            <Text style={styles.smallCardNumber}>2</Text>
            <Text style={styles.smallCardLabel}>Ausentes hoje</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={[styles.smallCardNumber, { color: theme.colors.primary }]}>1</Text>
            <Text style={styles.smallCardLabel}>Ocorrência</Text>
          </View>
        </View>

        <View style={styles.kidsSection}>
          <View style={styles.kidsSectionHeader}>
            <Text style={styles.kidsSectionTitle}>Crianças da turma</Text>
            <TouchableOpacity onPress={() => router.push('/(teacher)/class')}>
              <Text style={styles.seeMore}>Ver mais</Text>
            </TouchableOpacity>
          </View>

          {kids.map((item) => {
            const statusStyle = statustheme[item.status] ?? {
              bg: theme.colors.surface,
              text: theme.colors.text,
            };

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.kidRow}
                onPress={() => router.push(`/register/${item.id}`)}
              >
                <Image source={item.image} style={styles.kidAvatar} />
                <Text style={styles.kidName}>{item.name}</Text>

                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>
                    {item.status}
                  </Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? theme.colors.background : theme.colors.secondary,
    },

    presentation: {
      padding: 20,
      paddingBottom: 32,
    },

    dateUser: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      marginBottom: 10,
    },

    imageUser: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: theme.colors.tertiary,
    },

    title: {
      fontSize: 22,
      color: '#FFFFFF',
      fontWeight: '700',
    },

    subtitle: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 13,
      marginTop: 2,
    },

    content: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 20,
    },

    banner: {
      backgroundColor: isDark ? '#3d341a' : '#FFF9C4',
      borderWidth: 1,
      borderColor: '#FBC02D',
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 20,
      alignItems: 'center',
    },

    bannerText: {
      fontSize: 13,
      fontWeight: '600',
      color: isDark ? '#FFF' : '#7F5F00',
    },

    bigCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      padding: 16,
      marginBottom: 14,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },

    titleCard: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },

    numberCard: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 2,
      marginBottom: 12,
    },

    numberBig: {
      fontSize: 42,
      fontWeight: '600',
      color: theme.colors.text,
      lineHeight: 48,
    },

    numberSmall: {
      fontSize: 20,
      fontWeight: '500',
      color: theme.colors.text,
      opacity: 0.5,
      marginBottom: 6,
    },

    progressBar: {
      height: 6,
      backgroundColor: isDark ? '#333' : theme.colors.tertiary,
      borderRadius: 10,
    },

    progressFill: {
      height: 6,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },

    smallCardsRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },

    smallCard: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      padding: 16,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      gap: 6,
    },

    smallCardNumber: {
      fontSize: 36,
      fontWeight: '600',
      color: theme.colors.error,
    },

    smallCardLabel: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.6,
      fontWeight: '500',
    },

    kidsSection: {
      marginBottom: 32,
    },

    kidsSectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },

    kidsSectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },

    seeMore: {
      fontSize: 13,
      color: theme.colors.primary,
      fontWeight: '500',
    },

    kidRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#222' : theme.colors.background,
      gap: 12,
    },

    kidAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.tertiary,
    },

    kidName: {
      flex: 1,
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.text,
    },

    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },

    statusText: {
      fontSize: 11,
      fontWeight: '600',
    },

    chevron: {
      fontSize: 18,
      color: theme.colors.text,
      opacity: 0.3,
    },
  });
