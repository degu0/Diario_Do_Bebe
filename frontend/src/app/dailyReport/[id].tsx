import { InfoRow } from '@/components/InfoRow';
import { Section } from '@/components/Section';
import { useResponsibleChild } from '@/context/ResponsibleChildContext';
import { useThemeContext } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const humorEmoji: Record<string, string> = {
  animado: '😄',
  neutro: '😐',
  triste: '😢',
  agitado: '😠',
};

const alimentacaoLabel: Record<string, { label: string; color: string; bg: string }> = {
  bem: { label: 'Comeu bem', color: '#27ae60', bg: '#EAF3DE' },
  pouco: { label: 'Comeu pouco', color: '#f39c12', bg: '#FEF3D6' },
  nao: { label: 'Nao comeu', color: '#e74c3c', bg: '#FCEBEB' },
};

export default function DailyReportView() {
  const { theme, isDark } = useThemeContext();
  const { selectedChild, getChildById } = useResponsibleChild();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  const childId = Array.isArray(params.id) ? params.id[0] : params.id;
  const child = (childId ? getChildById(childId) : null) ?? selectedChild;

  if (!child) {
    return null;
  }

  const subtitleColor = `${theme.colors.text}99`;
  const borderColor = isDark ? '#2C2440' : '#EDE5F7';
  const cardBg = isDark ? '#191327' : '#FDFBFF';
  const alimentacao = alimentacaoLabel[child.report.alimentacao];

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
            <Image
              source={require('@/assets/icon/profile.png')}
              style={styles.avatar}
              resizeMode="contain"
            />
            <View style={styles.headerText}>
              <Text style={styles.name}>{child.name}</Text>
              <Text style={styles.subtitle}>
                {child.report.schoolClass} • {child.report.dateLabel}
              </Text>
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>Relatorio do dia</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.formCard}>
          <View style={[styles.photoPlaceholder, { borderColor }]}>
            <Ionicons name="image-outline" size={32} color={subtitleColor} />
            <Text style={[styles.photoLabel, { color: subtitleColor }]}>Foto do dia</Text>
            <Text style={[styles.photoHint, { color: subtitleColor }]}>
              A professora ainda nao enviou uma foto
            </Text>
          </View>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: child.report.presenca === 'presente' ? '#EAF3DE' : '#FCEBEB' },
              ]}
            >
              <Ionicons
                name={child.report.presenca === 'presente' ? 'checkmark-circle' : 'close-circle'}
                size={14}
                color={child.report.presenca === 'presente' ? '#27ae60' : '#e74c3c'}
              />
              <Text
                style={[
                  styles.statusBadgeText,
                  {
                    color: child.report.presenca === 'presente' ? '#27ae60' : '#e74c3c',
                  },
                ]}
              >
                {child.report.presenca === 'presente' ? 'Presente' : 'Ausente'}
              </Text>
            </View>

            <View style={styles.humorBadge}>
              <Text style={styles.humorEmoji}>{humorEmoji[child.report.humor]}</Text>
              <Text style={[styles.humorLabel, { color: theme.colors.text }]}>
                {child.report.humor.charAt(0).toUpperCase() + child.report.humor.slice(1)}
              </Text>
            </View>
          </View>

          <Section
            title="Cuidados"
            textColor={theme.colors.text}
            subtitleColor={subtitleColor}
            cardBg={cardBg}
          >
            <InfoRow
              label="Alimentacao"
              value={alimentacao.label}
              textColor={alimentacao.color}
              subtitleColor={subtitleColor}
              borderColor={borderColor}
            />
            <InfoRow
              label="Soneca"
              value={`${child.report.sonecaInicio} - ${child.report.sonecaFim}`}
              textColor={theme.colors.text}
              subtitleColor={subtitleColor}
              borderColor={borderColor}
            />
            <InfoRow
              label="Fralda"
              value={
                child.report.fraldaTrocada
                  ? `Trocou ${child.report.quantidadeFraldas}x`
                  : 'Nao trocou'
              }
              textColor={child.report.fraldaTrocada ? '#27ae60' : '#e74c3c'}
              subtitleColor={subtitleColor}
              borderColor="transparent"
            />
          </Section>

          <Section
            title="Atividades do dia"
            textColor={theme.colors.text}
            subtitleColor={subtitleColor}
            cardBg={cardBg}
          >
            <View style={styles.tagsRow}>
              {child.report.atividades.map((item) => (
                <View key={item} style={[styles.tag, { borderColor }]}>
                  <Text style={[styles.tagText, { color: theme.colors.primary }]}>{item}</Text>
                </View>
              ))}
            </View>
          </Section>

          <Section
            title="Observacoes"
            textColor={theme.colors.text}
            subtitleColor={subtitleColor}
            cardBg={cardBg}
          >
            <Text style={[styles.observacoesText, { color: theme.colors.text }]}>
              {child.report.observacoes}
            </Text>
          </Section>
          <View style={[styles.teacherRow, { borderTopColor: borderColor }]}>
            <View
              style={[styles.teacherAvatar, { backgroundColor: isDark ? '#2C2440' : '#EDE5F7' }]}
            >
              <Text style={[styles.teacherInitials, { color: theme.colors.primary }]}>
                {child.report.teacherInitials}
              </Text>
            </View>
            <View>
              <Text style={[styles.teacherName, { color: theme.colors.text }]}>
                {child.report.teacherName}
              </Text>
              <Text style={[styles.teacherRole, { color: subtitleColor }]}>
                Professora responsavel
              </Text>
            </View>
          </View>
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
      paddingBottom: 40,
    },
    hero: {
      position: 'relative',
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 90,
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
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 22,
      backgroundColor: 'rgba(255,255,255,0.18)',
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.22)',
    },
    headerText: {
      flex: 1,
      gap: 4,
    },
    name: {
      fontSize: 24,
      fontFamily: 'Nunito_700Bold',
      color: '#fff',
    },
    subtitle: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.76)',
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
      fontFamily: 'Nunito_600SemiBold',
    },
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
      gap: 14,
    },
    photoPlaceholder: {
      height: 180,
      borderRadius: 18,
      borderWidth: 1.5,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    photoLabel: {
      fontSize: 14,
      fontFamily: 'Nunito_600SemiBold',
    },
    photoHint: {
      fontSize: 12,
    },
    statusRow: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
    },
    statusBadgeText: {
      fontSize: 13,
      fontFamily: 'Nunito_600SemiBold',
    },
    humorBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: isDark ? '#191327' : '#FDFBFF',
    },
    humorEmoji: {
      fontSize: 18,
    },
    humorLabel: {
      fontSize: 13,
      fontFamily: 'Nunito_600SemiBold',
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tag: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
    },
    tagText: {
      fontSize: 13,
      fontFamily: 'Nunito_500Medium',
    },
    observacoesText: {
      fontSize: 14,
      lineHeight: 22,
    },
    teacherRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingTop: 14,
      borderTopWidth: 0.5,
    },
    teacherAvatar: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    teacherInitials: {
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
    teacherName: {
      fontSize: 14,
      fontFamily: 'Nunito_600SemiBold',
    },
    teacherRole: {
      fontSize: 12,
    },
  });
