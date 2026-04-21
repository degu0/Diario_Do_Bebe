import CardSettings from '@/components/CardSettings';
import { useThemeContext } from '@/context/ThemeContext';
import { useMemo } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const { theme, isDark } = useThemeContext();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO */}
          <View style={styles.hero}>
            <View style={styles.heroGlowLarge} />
            <View style={styles.heroGlowSmall} />

            <View style={styles.childSummary}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={require('../../../assets/icon/profile.png')}
                  style={styles.avatar}
                />
                <View style={styles.avatarBadge} />
              </View>

              <View style={styles.headerInfo}>
                <Text style={styles.profileName}>Rafaela Bezerra</Text>

                <View style={styles.phonePill}>
                  <Text style={styles.phoneText}>Professora</Text>
                </View>
              </View>
            </View>
          </View>

          {/* CARD */}
          <View style={styles.formCard}>
            <View style={styles.cardRow}>
              <View style={[styles.cardSmall, { marginRight: 6 }]}>
                <Text style={styles.cardLabel}>Creche que atua</Text>
                <Text style={styles.cardValue}>Creche Sol Lindo</Text>

                <View style={styles.hoursBadge}>
                  <Text style={styles.hoursText}>8 às 18h</Text>
                </View>
              </View>

              <View style={[styles.cardSmall, { marginLeft: 6 }]}>
                <Text style={styles.cardLabel}>Turma</Text>
                <Text style={styles.cardValue}>Maternal I</Text>
              </View>
            </View>

            <View style={styles.cardSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionDot} />
                <Text style={styles.sectionTitle}>Contato</Text>
                <View style={styles.sectionLine} />
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Email</Text>
                <Text style={styles.infoVal}>contatomeu@gmail.com</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Telefone</Text>
                <Text style={styles.infoVal}>(00)99999-9999</Text>
              </View>
              <View style={styles.divider} />
            </View>

            <CardSettings />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: isDark ? '#110E1B' : '#6C4ED9',
    },

    scrollContent: {
      paddingBottom: 40,
    },

    /* HERO */
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
      backgroundColor: 'rgba(255,255,255,0.10)',
      top: -70,
      right: -40,
    },

    heroGlowSmall: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'rgba(255,255,255,0.08)',
      bottom: 18,
      left: -28,
    },

    childSummary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 18,
    },

    avatarWrapper: {
      position: 'relative',
    },

    avatar: {
      width: 72,
      height: 72,
      borderRadius: 22,
      borderWidth: 3,
      borderColor: 'rgba(255,255,255,0.4)',
      backgroundColor: 'rgba(255,255,255,0.18)',
    },

    avatarBadge: {
      position: 'absolute',
      bottom: -3,
      right: -3,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: '#5FC7B1',
      borderWidth: 2,
      borderColor: '#fff',
    },

    headerInfo: {
      flex: 1,
      gap: 8,
    },

    profileName: {
      fontSize: 22,
      fontWeight: '700',
      color: '#fff',
    },

    phonePill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.16)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.22)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },

    phoneText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#fff',
    },

    /* CARD */
    formCard: {
      marginTop: -40,
      marginHorizontal: 12,
      padding: 18,
      borderRadius: 28,
      backgroundColor: theme.colors.background,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.14,
      shadowRadius: 20,
      elevation: 8,
      gap: 12,
    },

    cardRow: {
      flexDirection: 'row',
    },

    cardSmall: {
      flex: 1,
      backgroundColor: isDark ? '#191327' : '#FDFBFF',
      borderRadius: 18,
      padding: 14,
      shadowColor: isDark ? '#000' : '#b39dcc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 3,
      gap: 2,
    },

    cardLabel: {
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      color: theme.colors.secondary,
      marginBottom: 4,
    },

    cardValue: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.text,
      lineHeight: 19,
    },

    hoursBadge: {
      backgroundColor: isDark ? '#2C2440' : '#EDE5F7',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      alignSelf: 'flex-start',
      marginTop: 6,
    },

    hoursText: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.primary,
    },

    cardSection: {
      backgroundColor: isDark ? '#191327' : '#FDFBFF',
      borderRadius: 18,
      padding: 16,
      shadowColor: isDark ? '#000' : '#b39dcc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 3,
    },

    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 14,
    },

    sectionDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },

    sectionTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
    },

    sectionLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDark ? '#2C2440' : 'rgba(0,0,0,0.05)',
    },

    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 11,
    },

    divider: {
      height: 1,
      backgroundColor: isDark ? '#2C2440' : 'rgba(0,0,0,0.04)',
    },

    infoKey: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: theme.colors.secondary,
    },

    infoVal: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
    },
  });