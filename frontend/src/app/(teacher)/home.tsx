import Banner from '@/components/Banner';
import { useThemeContext } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileIcon = require('@/assets/icon/profile.png');

const kids = [
  { id: 1, image: profileIcon, name: 'Charles Junior', status: 'Preenchida' },
  { id: 2, image: profileIcon, name: 'Maria Silva', status: 'Ausente' },
  { id: 3, image: profileIcon, name: 'Joao Pedro', status: 'Pendente' },
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
  const alert = {
    type: 'holiday' as const,
    title: 'Feriado em 3 dias',
    subtitle: 'A escola não tera atividades neste periodo.',
  };

  const statusTheme: Record<string, { bg: string; text: string }> = {
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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroGlowLarge} />
          <View style={styles.heroGlowSmall} />

          <View style={styles.dateUser}>
            <Image source={profileIcon} style={styles.imageUser} />
            <View>
              <Text style={styles.title}>Bom dia, {name} 👋</Text>
              <Text style={styles.subtitle}>Sexta-feira, 13 de marco</Text>
              <Text style={styles.subtitle}>Escola | Turma A1</Text>
            </View>
          </View>

          {alert ? <Banner title={alert.title} subtitle={alert.subtitle} type={alert.type} /> : null}
        </View>

        <View style={styles.contentCard}>
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
              <Text style={styles.smallCardLabel}>Ocorrencia</Text>
            </View>
          </View>

          <View style={styles.kidsSection}>
            <View style={styles.kidsSectionHeader}>
              <Text style={styles.kidsSectionTitle}>Criancas da turma</Text>
              <TouchableOpacity onPress={() => router.push('/(teacher)/class')}>
                <Text style={styles.seeMore}>Ver mais</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.kidsList}>
              {kids.map((item) => {
                const statusStyle = statusTheme[item.status] ?? {
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
    dateUser: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      marginBottom: 22,
    },
    imageUser: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: 'rgba(255,255,255,0.18)',
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.22)',
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
    bigCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 16,
      marginBottom: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
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
      borderRadius: 20,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
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
      marginBottom: 12,
    },
    kidsSectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingHorizontal: 2,
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
    kidsList: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    kidRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#222' : '#F1ECFB',
      gap: 12,
    },
    kidAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
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
      fontSize: 20,
      color: theme.colors.text,
      opacity: 0.3,
    },
  });
