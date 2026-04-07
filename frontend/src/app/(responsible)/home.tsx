import { useThemeContext } from '@/context/ThemeContext';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const profileIcon = require('@/assets/icon/profile.png');

const kids = [
  { id: 1, image: profileIcon, name: 'Maria Fernanda', age: '1 ano e 2 meses', initials: 'MF' },
  { id: 2, image: profileIcon, name: 'Zeca Silva', age: '3 anos', initials: 'ZS' },
];

export default function Home() {
  const { theme } = useThemeContext();
  const styles = createStyles(theme);

  const name = 'Carlos';
  const selectedKid = kids[0];

  return (
    <View style={styles.container}>
      <View style={styles.apresentation}>
        <Text style={styles.title}>Olá, {name}</Text>
        <Text style={styles.subtitle}>Sexta-feira, 13 de março</Text>

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.purpleDark,
    },

    apresentation: {
      padding: 20,
      paddingTop: 52,
      paddingBottom: 28,
      gap: 6,
    },

    title: {
      fontSize: 26,
      color: theme.colors.white,
      fontWeight: '700',
      marginBottom: 2,
    },

    subtitle: {
      color: theme.colors.white + 'CC',
      fontSize: 13,
      marginBottom: 14,
    },

    banner: {
      backgroundColor: theme.colors.yellowLight,
      borderWidth: 1,
      borderColor: theme.colors.yellowBorder,
      borderRadius: 12,
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
      backgroundColor: theme.colors.white + '26',
      borderRadius: 30,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },

    kidChipSelected: {
      backgroundColor: theme.colors.white + '40',
    },

    kidInitials: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.purpleDark,
      borderWidth: 2,
      borderColor: theme.colors.white + '80',
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
      color: theme.colors.white + 'BF',
    },

    content: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 20,
    },

    bigCard: {
      backgroundColor: theme.colors.grayLight,
      borderRadius: 18,
      padding: 16,
      marginBottom: 14,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
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
      borderRadius: 18,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      marginBottom: 20,
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
