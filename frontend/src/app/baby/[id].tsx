import { colors } from '@/constants/Colors';
import { useThemeContext } from '@/context/ThemeContext';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionCard } from '@/components/SectionCard';
import { AccordionSection } from '@/components/AccordionSection';

export default function BabyProfile() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  const { theme, isDark } = useThemeContext();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  const subtitleColor = `${theme.colors.text}AA`;

  const contacts = [
    { id: 1, name: 'Heloisa Santos', number: '(81) 99111-1111' },
    { id: 2, name: 'Joao Santos', number: '(81) 99222-2222' },
    { id: 3, name: 'Joelma Souza', number: '(81) 99333-3333' },
  ];

  const authorized = [
    { name: 'Heloisa', role: 'Mae' },
    { name: 'Joao', role: 'Pai' },
    { name: 'Joelma', role: 'Avo' },
  ];

  const allergies = ['Amendoim', 'Soja', 'Ovo'];
  const medications = ['Dipirona', 'Amoxicilina', 'Loratadina'];

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroGlowLarge} />
          <View style={styles.heroGlowSmall} />

          <View style={styles.childSummary}>
            <Image source={require('@/assets/icon/profile.png')} style={styles.babyAvatar} />

            <View style={styles.babyTexts}>
              <Text style={styles.babyName}>Maria Clara</Text>
              <Text style={styles.babyMeta}>Perfil da crianca</Text>
              <Text style={styles.babyBirthday}>Aniversario: 01/01/2025</Text>
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>Maternal I</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentCard}>
          <TouchableOpacity
            onPress={() => router.push(`/register/${id}`)}
            style={styles.primaryButton}
            activeOpacity={0.85}
          >
            <Ionicons name="document-text-outline" size={18} color="#fff" />
            <Text style={styles.primaryButtonText}>Preencher relatorio diario</Text>
          </TouchableOpacity>

          <SectionCard
            title="Responsaveis"
            subtitle="Contatos principais da crianca."
            titleColor={theme.colors.text}
            subtitleColor={subtitleColor}
          >
            <View style={styles.responsibleGrid}>
              <View style={[styles.responsibleCard, { backgroundColor: theme.colors.secondary }]}>
                <View style={styles.cardInformation}>
                  <Image
                    source={require('@/assets/icon/profile.png')}
                    style={styles.responsibleAvatar}
                  />
                  <View style={styles.information}>
                    <Text style={styles.responsibleName}>Heloisa Santos</Text>
                    <Text style={styles.responsibleRole}>Mae</Text>
                  </View>
                </View>
                <Text style={styles.responsiblePhone}>(81) 99111-1111</Text>
              </View>

              <View style={[styles.responsibleCard, { backgroundColor: colors.info }]}>
                <View style={styles.cardInformation}>
                  <Image
                    source={require('@/assets/icon/profile.png')}
                    style={styles.responsibleAvatar}
                  />
                  <View style={styles.information}>
                    <Text style={styles.responsibleName}>Joao Santos</Text>
                    <Text style={styles.responsibleRole}>Pai</Text>
                  </View>
                </View>
                <Text style={styles.responsiblePhone}>(81) 99222-2222</Text>
              </View>
            </View>
          </SectionCard>

          <SectionCard
            title="Contato de emergencia"
            subtitle="Pessoas para acionar em situacoes urgentes."
            titleColor={theme.colors.text}
            subtitleColor={subtitleColor}
          >
            <View style={styles.contactList}>
              {contacts.map((item) => (
                <View key={item.id} style={styles.contactRow}>
                  <View>
                    <Text style={styles.contactName}>{item.name}</Text>
                    <Text style={styles.contactLabel}>Telefone</Text>
                  </View>
                  <Text style={styles.contactNumber}>{item.number}</Text>
                </View>
              ))}
            </View>
          </SectionCard>

          <SectionCard
            title="Autorizados para buscar"
            subtitle="Somente essas pessoas podem retirar a crianca."
            titleColor={theme.colors.text}
            subtitleColor={subtitleColor}
          >
            <View style={styles.authorizedGrid}>
              {authorized.map((item, index) => (
                <View key={index} style={styles.authorizedCard}>
                  <Text style={styles.authorizedName}>{item.name}</Text>
                  <Text style={styles.authorizedRole}>{item.role}</Text>
                </View>
              ))}
            </View>
          </SectionCard>

          <SectionCard
            title="Saude"
            subtitle="Informacoes para o cuidado diario da crianca."
            titleColor={theme.colors.text}
            subtitleColor={subtitleColor}
          >
            <AccordionSection
              icon="⚠️"
              title="Alergias"
              items={allergies}
              itemIcon="•"
              titleColor={theme.colors.text}
              subtitleColor={subtitleColor}
              backgroundColor={theme.colors.surface}
              badgeBackground={isDark ? '#1F1A2C' : '#F4EEFF'}
              badgeTextColor={theme.colors.primary}
            />

            <AccordionSection
              icon="💊"
              title="Medicacoes"
              items={medications}
              itemIcon="•"
              titleColor={theme.colors.text}
              subtitleColor={subtitleColor}
              backgroundColor={theme.colors.surface}
              badgeBackground={isDark ? '#1F1A2C' : '#F4EEFF'}
              badgeTextColor={theme.colors.primary}
            />
          </SectionCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: isDark ? '#110E1B' : '#6C4ED9',
    },

    scrollContent: {
      paddingBottom: 160,
    },

    hero: {
      position: 'relative',
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 94,
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

    backButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.18)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.22)',
      marginBottom: 18,
    },

    childSummary: {
      flexDirection: 'row',
      gap: 14,
      alignItems: 'center',
    },

    babyAvatar: {
      width: 72,
      height: 72,
      borderRadius: 24,
      backgroundColor: 'rgba(255,255,255,0.18)',
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.22)',
    },

    babyTexts: {
      flex: 1,
      gap: 4,
    },

    babyName: {
      fontSize: 24,
      fontWeight: '700',
      color: '#fff',
    },

    babyMeta: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.82)',
    },

    babyBirthday: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.72)',
    },

    infoPill: {
      marginTop: 8,
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: 'rgba(255,255,255,0.16)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.20)',
    },

    infoPillText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },

    contentCard: {
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
      gap: 18,
    },

    primaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: 16,
    },

    primaryButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 15,
    },

    responsibleGrid: {
      gap: 12,
    },

    responsibleCard: {
      borderRadius: 18,
      padding: 14,
      gap: 12,
    },

    cardInformation: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    responsibleAvatar: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
    },

    information: {
      gap: 2,
    },

    responsibleName: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
    },

    responsibleRole: {
      fontSize: 12,
      color: '#fff',
      opacity: 0.72,
    },

    responsiblePhone: {
      fontSize: 13,
      fontWeight: '700',
      color: '#fff',
    },

    contactList: {
      gap: 8,
    },

    contactRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 14,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
    },

    contactName: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 2,
    },

    contactLabel: {
      fontSize: 11,
      color: theme.colors.text,
      opacity: 0.55,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    contactNumber: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.gray,
    },

    authorizedGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },

    authorizedCard: {
      minWidth: '30%',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 14,
      alignItems: 'center',
      gap: 4,
    },

    authorizedName: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.text,
    },

    authorizedRole: {
      fontSize: 11,
      color: theme.colors.text,
      opacity: 0.65,
    },
  });
