import { useThemeContext } from '@/context/ThemeContext';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileIcon = require('@/assets/icon/profile.png');

const kids = [
  { id: 1, image: profileIcon, name: 'Maria Fernanda', age: '1 ano e 2 meses', initials: 'MF' },
  { id: 2, image: profileIcon, name: 'Zeca Silva', age: '3 anos', initials: 'ZS' },
];

export default function Home() {
  const { theme, isDark } = useThemeContext();
  const styles = createStyles(theme, isDark);

  const name = 'Carlos';
  const selectedKid = kids[0];

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

          <View style={styles.heroTextBlock}>
            <Text style={styles.title}>Olá, {name}</Text>
            <Text style={styles.subtitle}>Sexta-feira, 13 de março</Text>
          </View>

          <View style={styles.banner}>
            <Text style={styles.bannerText}>⚠️ Feriado em 3 dias</Text>
          </View>

          <View style={styles.kidsRow}>
            {kids.map((kid) => {
              const isSelected = kid.id === selectedKid.id;

              return (
                <TouchableOpacity
                  key={kid.id}
                  style={[styles.kidChip, isSelected && styles.kidChipSelected]}
                >
                  <View style={styles.kidInitials}>
                    <Text style={styles.kidInitialsText}>{kid.initials}</Text>
                  </View>

                  {isSelected && (
                    <View>
                      <Text style={styles.kidChipName}>{kid.name}</Text>
                      <Text style={styles.kidChipAge}>{kid.age}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.bigCard}>
            <Text style={styles.titleCard}>Status de hoje</Text>

            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Presente na creche</Text>
            </View>
          </View>

          <View style={styles.smallCardsRow}>
            <View style={styles.smallCard}>
              <Text style={styles.smallCardNumber}>Bem</Text>
              <Text style={styles.smallCardLabel}>Alimentação</Text>
            </View>

            <View style={[styles.smallCard, styles.smallCardDivider]}>
              <Text style={styles.smallCardNumber}>1 h 20 min</Text>
              <Text style={styles.smallCardLabel}>Sono/Soneca</Text>
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
      backgroundColor: isDark ? '#120F1F' : theme.colors.purpleDark,
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
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: 'rgba(255,255,255,0.08)',
      top: -70,
      right: -55,
    },

    heroGlowSmall: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'rgba(255,255,255,0.06)',
      bottom: 28,
      left: -34,
    },

    heroTextBlock: {
      marginBottom: 18,
    },

    title: {
      fontSize: 26,
      color: theme.colors.white,
      fontWeight: '700',
      marginBottom: 4,
    },

    subtitle: {
      color: 'rgba(255,255,255,0.78)',
      fontSize: 13,
    },

    banner: {
      backgroundColor: theme.colors.yellowLight,
      borderWidth: 1,
      borderColor: theme.colors.yellowBorder,
      borderRadius: 16,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginBottom: 16,
      alignItems: 'center',
    },

    bannerText: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.yellowDark,
    },

    kidsRow: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },

    kidChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: 'rgba(255,255,255,0.14)',
      borderRadius: 32,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },

    kidChipSelected: {
      backgroundColor: 'rgba(255,255,255,0.22)',
    },

    kidInitials: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.colors.purpleDark,
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.45)',
      alignItems: 'center',
      justifyContent: 'center',
    },

    kidInitialsText: {
      fontSize: 11,
      fontWeight: '700',
      color: theme.colors.white,
    },

    kidChipName: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.white,
    },

    kidChipAge: {
      fontSize: 10,
      color: 'rgba(255,255,255,0.74)',
    },

    contentCard: {
      marginTop: -44,
      marginHorizontal: 12,
      padding: 16,
      borderRadius: 28,
      backgroundColor: theme.colors.surface,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 18,
      elevation: 8,
    },

    bigCard: {
      backgroundColor: theme.colors.grayLight,
      borderRadius: 20,
      padding: 16,
      marginBottom: 14,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },

    titleCard: {
      fontSize: 13,
      color: theme.colors.gray,
      marginBottom: 8,
    },

    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.green,
    },

    statusText: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
    },

    smallCardsRow: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
      marginBottom: 12,
    },

    smallCard: {
      flex: 1,
      padding: 16,
      gap: 6,
    },

    smallCardDivider: {
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.border,
    },

    smallCardNumber: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.teal,
    },

    smallCardLabel: {
      fontSize: 12,
      color: theme.colors.gray,
      fontWeight: '500',
    },
  });
