import DataUser from '@/components/DataUser';
import { useAuth } from '@/context/AuthContext';
import { useTeacherAttendance } from '@/context/TeacherAttendanceContext';
import { useThemeContext } from '@/context/ThemeContext';
import { createOcorrencia } from '@/services/ocorrenciaService';
import { listOcorrencias } from '@/services/ocorrenciaService';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileIcon = require('@/assets/icon/profile.png');

const PRIORIDADE_OPTIONS = [
  { label: 'Baixa', value: 'BAIXA' },
  { label: 'Media', value: 'MEDIA' },
  { label: 'Alta', value: 'ALTA' },
];

export default function Home() {
  const { theme, isDark } = useThemeContext();
  const { user } = useAuth();
  const { children, refreshChildren } = useTeacherAttendance();
  const router = useRouter();

  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
  const [ocorrenciasCount, setOcorrenciasCount] = useState<number | null>(null);

  // Modal de nova ocorrência
  const [modalVisible, setModalVisible] = useState(false);
  const [ocTitulo, setOcTitulo] = useState('');
  const [ocPrioridade, setOcPrioridade] = useState('BAIXA');
  const [ocDescricao, setOcDescricao] = useState('');
  const [ocSaving, setOcSaving] = useState(false);
  const [ocError, setOcError] = useState('');
  const modalAnim = useRef(new Animated.Value(0)).current;

  const openModal = () => {
    setOcTitulo('');
    setOcPrioridade('BAIXA');
    setOcDescricao('');
    setOcError('');
    setModalVisible(true);
    Animated.spring(modalAnim, { toValue: 1, useNativeDriver: true, bounciness: 4 }).start();
  };

  const closeModal = () => {
    Animated.timing(modalAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() =>
      setModalVisible(false),
    );
  };

  const handleSaveOcorrencia = async () => {
    if (!ocTitulo.trim()) {
      setOcError('O titulo e obrigatorio.');
      return;
    }
    if (!user || user.type !== 'teacher') return;

    setOcSaving(true);
    setOcError('');
    try {
      await createOcorrencia({
        titulo: ocTitulo.trim(),
        prioridade: ocPrioridade,
        descricao: ocDescricao.trim() || undefined,
        adiId: user.id,
      });
      closeModal();
      listOcorrencias()
        .then((ocorrencias) => {
          const hoje = new Date().toDateString();
          setOcorrenciasCount(
            ocorrencias.filter((item) => new Date(item.dia).toDateString() === hoje).length,
          );
        })
        .catch(() => {});
    } catch {
      setOcError('Nao foi possivel salvar. Tente novamente.');
    } finally {
      setOcSaving(false);
    }
  };

  const fetchOcorrencias = useCallback(() => {
    if (user?.type !== 'teacher') return;

    listOcorrencias()
      .then((ocorrencias) => {
        const hoje = new Date().toDateString();
        setOcorrenciasCount(
          ocorrencias.filter((item) => new Date(item.dia).toDateString() === hoje).length,
        );
      })
      .catch(() => setOcorrenciasCount(0));
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchOcorrencias();
      refreshChildren();
    }, [fetchOcorrencias, refreshChildren]),
  );

  const name = user?.nome?.split(' ')[0] || 'Professora';
  const filledCount = children.filter((child) => child.reportStatus === 'Preenchida').length;
  const totalCount = children.length;
  const absentCount = children.filter((child) => child.attendance === 'absent').length;
  const progress = totalCount > 0 ? filledCount / totalCount : 0;
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

  const modalScale = modalAnim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] });
  const modalOpacity = modalAnim;

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

          <DataUser name={name} />

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
              <Text style={styles.smallCardNumber}>{absentCount}</Text>
              <Text style={styles.smallCardLabel}>Ausentes hoje</Text>
            </View>

            <TouchableOpacity style={styles.smallCard} onPress={openModal} activeOpacity={0.8}>
              <View style={styles.ocorrenciasHeader}>
                <Text style={[styles.smallCardNumber, { color: theme.colors.primary }]}>
                  {ocorrenciasCount === null ? '—' : ocorrenciasCount}
                </Text>
                <View style={styles.addBadge}>
                  <Text style={[styles.addBadgeText, { color: theme.colors.primary }]}>+</Text>
                </View>
              </View>
              <Text style={styles.smallCardLabel}>Ocorrencias hoje</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.kidsSection}>
            <View style={styles.kidsSectionHeader}>
              <Text style={styles.kidsSectionTitle}>Criancas da turma</Text>
              <TouchableOpacity onPress={() => router.replace('/(teacher)/class')}>
                <Text style={styles.seeMore}>Ver mais</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.kidsList}>
              {children.map((item) => {
                const statusStyle = statusTheme[item.reportStatus] ?? {
                  bg: theme.colors.surface,
                  text: theme.colors.text,
                };

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.kidRow}
                    onPress={() => router.push(`/register/${item.id}`)}
                  >
                    <Image source={profileIcon} style={styles.kidAvatar} />
                    <Text style={styles.kidName}>{item.name}</Text>

                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                      <Text style={[styles.statusText, { color: statusStyle.text }]}>
                        {item.reportStatus}
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

      <Modal transparent animationType="none" visible={modalVisible} onRequestClose={closeModal}>
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Animated.View
            style={[
              styles.modalCard,
              { opacity: modalOpacity, transform: [{ scale: modalScale }] },
            ]}
          >
            <Pressable>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Nova Ocorrencia
              </Text>

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Titulo *</Text>
              <TextInput
                style={[styles.modalInput, { color: theme.colors.text, borderColor: isDark ? '#2C2440' : '#E7DDF7', backgroundColor: isDark ? '#191327' : '#FBF8FF' }]}
                placeholder="Titulo da ocorrencia"
                placeholderTextColor={isDark ? '#8E8AA5' : '#94A3B8'}
                value={ocTitulo}
                onChangeText={setOcTitulo}
              />

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Prioridade</Text>
              <View style={styles.prioridadeRow}>
                {PRIORIDADE_OPTIONS.map((op) => (
                  <TouchableOpacity
                    key={op.value}
                    style={[
                      styles.prioridadeChip,
                      {
                        backgroundColor:
                          ocPrioridade === op.value
                            ? theme.colors.primary
                            : isDark ? '#191327' : '#F4EEFF',
                        borderColor:
                          ocPrioridade === op.value ? theme.colors.primary : isDark ? '#2C2440' : '#E7DDF7',
                      },
                    ]}
                    onPress={() => setOcPrioridade(op.value)}
                  >
                    <Text
                      style={{
                        color: ocPrioridade === op.value ? '#fff' : theme.colors.text,
                        fontSize: 12,
                        fontFamily: 'Nunito_600SemiBold',
                      }}
                    >
                      {op.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Descricao (opcional)
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  styles.modalTextArea,
                  { color: theme.colors.text, borderColor: isDark ? '#2C2440' : '#E7DDF7', backgroundColor: isDark ? '#191327' : '#FBF8FF' },
                ]}
                placeholder="Descreva a ocorrencia..."
                placeholderTextColor={isDark ? '#8E8AA5' : '#94A3B8'}
                multiline
                value={ocDescricao}
                onChangeText={setOcDescricao}
              />

              {ocError ? (
                <Text style={[styles.ocError, { color: theme.colors.error }]}>{ocError}</Text>
              ) : null}

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: isDark ? '#191327' : '#F4EEFF' }]}
                  onPress={closeModal}
                >
                  <Text style={{ color: theme.colors.text, fontFamily: 'Nunito_600SemiBold' }}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalBtn,
                    { backgroundColor: theme.colors.primary, opacity: ocSaving ? 0.7 : 1 },
                  ]}
                  onPress={handleSaveOcorrencia}
                  disabled={ocSaving}
                >
                  <Text style={{ color: '#fff', fontFamily: 'Nunito_700Bold' }}>
                    {ocSaving ? 'Salvando...' : 'Salvar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
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
      fontFamily: 'Nunito_600SemiBold',
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
      fontFamily: 'Nunito_600SemiBold',
      color: theme.colors.text,
      lineHeight: 48,
    },
    numberSmall: {
      fontSize: 20,
      fontFamily: 'Nunito_500Medium',
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
    ocorrenciasHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    addBadge: {
      width: 24,
      height: 24,
      borderRadius: 8,
      backgroundColor: isDark ? '#1F1A2C' : '#F4EEFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addBadgeText: {
      fontSize: 18,
      fontFamily: 'Nunito_700Bold',
      lineHeight: 22,
    },
    smallCardNumber: {
      fontSize: 36,
      fontFamily: 'Nunito_600SemiBold',
      color: theme.colors.error,
    },
    smallCardLabel: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.6,
      fontFamily: 'Nunito_500Medium',
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
      fontFamily: 'Nunito_600SemiBold',
      color: theme.colors.text,
    },
    seeMore: {
      fontSize: 13,
      color: theme.colors.primary,
      fontFamily: 'Nunito_500Medium',
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
      fontFamily: 'Nunito_500Medium',
      color: theme.colors.text,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    statusText: {
      fontSize: 11,
      fontFamily: 'Nunito_600SemiBold',
    },
    chevron: {
      fontSize: 20,
      color: theme.colors.text,
      opacity: 0.3,
    },
    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalCard: {
      width: '100%',
      backgroundColor: theme.colors.background,
      borderRadius: 24,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'Nunito_700Bold',
      marginBottom: 16,
    },
    modalLabel: {
      fontSize: 13,
      fontFamily: 'Nunito_600SemiBold',
      marginBottom: 6,
      marginTop: 12,
    },
    modalInput: {
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 14,
    },
    modalTextArea: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    prioridadeRow: {
      flexDirection: 'row',
      gap: 8,
    },
    prioridadeChip: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      alignItems: 'center',
    },
    ocError: {
      fontSize: 12,
      marginTop: 8,
      textAlign: 'center',
    },
    modalActions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 16,
    },
    modalBtn: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: 'center',
    },
  });
