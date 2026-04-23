import { useThemeContext } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CardHasReportType = {
  onPress: () => void;
  selectedReportViewed: boolean;
};

export function CardHasReport({ onPress, selectedReportViewed }: CardHasReportType) {
  const { theme, isDark } = useThemeContext();
  const styles = createStyles(theme, isDark);

  return (
    <>
      <TouchableOpacity
        style={[styles.reportCard, { backgroundColor: isDark ? '#1E1630' : '#F4EEFF' }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={[styles.reportIconBox, { backgroundColor: theme.colors.primary }]}>
          <Ionicons name="document-text-outline" size={20} color="#fff" />
        </View>

        <View style={styles.reportCardText}>
          <View style={styles.reportCardTitleRow}>
            <Text style={[styles.reportCardTitle, { color: theme.colors.text }]}>
              Relatório do dia
            </Text>
            {!selectedReportViewed && (
              <View style={[styles.newBadge, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.newBadgeText}>Novo</Text>
              </View>
            )}
          </View>
          <Text style={[styles.reportCardSubtitle, { color: `${theme.colors.text}99` }]}>
            Veja como foi o dia de Maria Clara
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={18} color={`${theme.colors.text}66`} />
      </TouchableOpacity>
    </>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    reportCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isDark ? '#2C2440' : '#E0D0F8',
    },
    reportIconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    reportCardText: { flex: 1, gap: 3 },
    reportCardTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    reportCardTitle: {
      fontSize: 14,
      fontFamily: 'Nunito_600SemiBold',
    },
    reportCardSubtitle: {
      fontSize: 12,
    },
    newBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 20,
    },
    newBadgeText: {
      color: '#fff',
      fontSize: 10,
      fontFamily: 'Nunito_700Bold',
    },
  });
