import { ReactNode, useMemo, useState } from 'react';
import { CustomRadioButton } from '@/components/CustomRadioButton';
import MultiSelectTabs from '@/components/MultiSelectTabs';
import { useThemeContext } from '@/context/ThemeContext';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionCard } from '@/components/SectionCard';

export default function Register() {
  const { theme, isDark } = useThemeContext();
  const router = useRouter();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  const [presenca, setPresenca] = useState('presente');
  const [humor, setHumor] = useState('animado');
  const [alimentacao, setAlimentacao] = useState('bem');
  const [atividades, setAtividades] = useState<string[]>([]);
  const [fraldaTrocada, setFraldaTrocada] = useState('sim');
  const [quantidadeFraldas, setQuantidadeFraldas] = useState('1');
  const [inicioSoneca, setInicioSoneca] = useState('');
  const [fimSoneca, setFimSoneca] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const subtitleColor = `${theme.colors.text}AA`;
  const isAusente = presenca === 'ausente';

  const dailyReportPayload = useMemo(
    () => ({
      presenca,
      humor: isAusente ? null : humor,
      alimentacao: isAusente ? null : alimentacao,
      sonecaInicio: isAusente ? null : inicioSoneca || null,
      sonecaFim: isAusente ? null : fimSoneca || null,
      fraldaTrocada: isAusente ? null : fraldaTrocada === 'sim',
      quantidadeFraldas: isAusente
        ? null
        : fraldaTrocada === 'sim'
          ? Number(quantidadeFraldas || 0)
          : 0,
      atividades: isAusente ? null : atividades,
      observacoes: isAusente ? null : observacoes || null,
    }),
    [
      presenca,
      isAusente,
      humor,
      alimentacao,
      inicioSoneca,
      fimSoneca,
      fraldaTrocada,
      quantidadeFraldas,
      atividades,
      observacoes,
    ],
  );

  const handleSave = () => {
    const payload = dailyReportPayload;
    void payload;
  };

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
              <Text style={styles.name}>Maria Clara</Text>
              <Text style={styles.subtitle}>Maternal I • Segunda, 14 de Agosto</Text>
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>Relatorio diario</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.formCard}>
          <SectionCard
            title="Presenca e humor"
            subtitle="Comece registrando como a crianca passou o dia."
            titleColor={theme.colors.text}
            subtitleColor={subtitleColor}
          >
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Presenca</Text>
              <View style={styles.rowBetween}>
                <CustomRadioButton
                  label="Presente"
                  selected={presenca === 'presente'}
                  onSelect={() => setPresenca('presente')}
                  color={theme.colors.success}
                  style={styles.flexButton}
                />
                <CustomRadioButton
                  label="Ausente"
                  selected={presenca === 'ausente'}
                  onSelect={() => setPresenca('ausente')}
                  color={theme.colors.error}
                  style={styles.flexButton}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Humor do dia</Text>
              <View
                style={[styles.wrapRow, isAusente && styles.disabledSection]}
                pointerEvents={isAusente ? 'none' : 'auto'}
              >
                {['animado', 'neutro', 'triste', 'agitado'].map((item) => (
                  <CustomRadioButton
                    key={item}
                    label={item.charAt(0).toUpperCase() + item.slice(1)}
                    selected={humor === item}
                    onSelect={() => setHumor(item)}
                    size="md"
                    style={styles.chipButton}
                  />
                ))}
              </View>
            </View>
          </SectionCard>

          <SectionCard
            title="Cuidados basicos"
            subtitle="Preencha alimentacao, soneca e troca de fralda."
            titleColor={theme.colors.text}
            subtitleColor={subtitleColor}
          >
            <View
              style={isAusente && styles.disabledSection}
              pointerEvents={isAusente ? 'none' : 'auto'}
            >
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Alimentacao</Text>
                <View style={styles.stack}>
                  {[
                    { label: 'Comeu bem', value: 'bem' },
                    { label: 'Comeu pouco', value: 'pouco' },
                    { label: 'Nao comeu', value: 'nao' },
                  ].map((item) => (
                    <CustomRadioButton
                      key={item.value}
                      label={item.label}
                      selected={alimentacao === item.value}
                      onSelect={() => setAlimentacao(item.value)}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.twoColumnRow}>
                <View style={styles.column}>
                  <Text style={styles.fieldLabel}>Soneca</Text>
                  <View style={styles.inputGroup}>
                    <TextInput
                      placeholder="Inicio"
                      placeholderTextColor={styles.placeholder.color}
                      style={styles.input}
                      value={inicioSoneca}
                      onChangeText={setInicioSoneca}
                      editable={!isAusente}
                    />
                    <TextInput
                      placeholder="Fim"
                      placeholderTextColor={styles.placeholder.color}
                      style={styles.input}
                      value={fimSoneca}
                      onChangeText={setFimSoneca}
                      editable={!isAusente}
                    />
                  </View>
                </View>

                <View style={styles.column}>
                  <Text style={styles.fieldLabel}>Fralda</Text>
                  <View style={styles.rowBetween}>
                    <CustomRadioButton
                      label="Trocou"
                      selected={fraldaTrocada === 'sim'}
                      onSelect={() => {
                        setFraldaTrocada('sim');
                        if (quantidadeFraldas === '0') setQuantidadeFraldas('1');
                      }}
                      color={theme.colors.primary}
                      style={styles.flexButton}
                    />
                    <CustomRadioButton
                      label="Nao trocou"
                      selected={fraldaTrocada === 'nao'}
                      onSelect={() => {
                        setFraldaTrocada('nao');
                        setQuantidadeFraldas('0');
                      }}
                      color={theme.colors.error}
                      style={styles.flexButton}
                    />
                  </View>

                  <TextInput
                    placeholder="Quantas vezes?"
                    placeholderTextColor={styles.placeholder.color}
                    style={[styles.input, fraldaTrocada === 'nao' && styles.inputDisabled]}
                    value={quantidadeFraldas}
                    onChangeText={setQuantidadeFraldas}
                    editable={!isAusente && fraldaTrocada === 'sim'}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>
          </SectionCard>

          <SectionCard
            title="Atividades"
            subtitle="Selecione tudo o que a crianca participou hoje."
            titleColor={theme.colors.text}
            subtitleColor={subtitleColor}
          >
            <View
              style={isAusente && styles.disabledSection}
              pointerEvents={isAusente ? 'none' : 'auto'}
            >
              <MultiSelectTabs
                options={[
                  { label: 'Pintura', value: 'pintura' },
                  { label: 'Musicalizacao', value: 'musica' },
                  { label: 'Parque', value: 'parque' },
                  { label: 'Leitura', value: 'leitura' },
                  { label: 'Psicomotora', value: 'psicomotora' },
                ]}
                onChange={setAtividades}
              />
            </View>
          </SectionCard>

          <SectionCard
            title="Observacoes finais"
            subtitle="Anote recados e detalhes importantes para a familia."
            titleColor={theme.colors.text}
            subtitleColor={subtitleColor}
          >
            <TextInput
              placeholder="Escreva como foi o dia da crianca, recados e detalhes importantes..."
              placeholderTextColor={styles.placeholder.color}
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
              style={[styles.textArea, isAusente && styles.disabledSection]}
              editable={!isAusente}
            />
          </SectionCard>

          {isAusente ? (
            <View style={styles.absentNotice}>
              <Ionicons name="information-circle-outline" size={18} color={theme.colors.text} />
              <Text style={styles.absentNoticeText}>
                Como a crianca esta ausente, os demais campos ficam bloqueados e serao enviados como
                `null`.
              </Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar relatorio diario</Text>
          </TouchableOpacity>
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
      gap: 18,
    },

    fieldGroup: {
      gap: 10,
    },

    fieldLabel: {
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
      color: theme.colors.text,
    },

    rowBetween: {
      flexDirection: 'row',
      gap: 10,
    },

    twoColumnRow: {
      flexDirection: 'row',
      gap: 14,
    },

    column: {
      flex: 1,
      gap: 10,
    },

    wrapRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },

    stack: {
      gap: 2,
    },

    flexButton: {
      flex: 1,
    },

    chipButton: {
      marginBottom: 0,
    },

    inputGroup: {
      gap: 8,
    },

    input: {
      borderWidth: 1,
      borderColor: isDark ? '#2C2440' : '#E7DDF7',
      backgroundColor: isDark ? '#191327' : '#FBF8FF',
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 12,
      color: theme.colors.text,
      fontSize: 14,
    },

    inputDisabled: {
      opacity: 0.5,
    },

    disabledSection: {
      opacity: 0.45,
    },

    textArea: {
      borderWidth: 1,
      borderColor: isDark ? '#2C2440' : '#E7DDF7',
      backgroundColor: isDark ? '#191327' : '#FBF8FF',
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 14,
      minHeight: 130,
      textAlignVertical: 'top',
      color: theme.colors.text,
      fontSize: 14,
      lineHeight: 20,
    },

    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: 'center',
      marginTop: 6,
    },

    buttonText: {
      color: '#fff',
      fontFamily: 'Nunito_700Bold',
      fontSize: 16,
    },

    absentNotice: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'flex-start',
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 12,
      backgroundColor: isDark ? '#1B162A' : '#F4EEFF',
      borderWidth: 1,
      borderColor: isDark ? '#2C2440' : '#E7DDF7',
    },

    absentNoticeText: {
      flex: 1,
      color: theme.colors.text,
      fontSize: 13,
      lineHeight: 18,
    },

    placeholder: {
      color: isDark ? '#8E8AA5' : '#94A3B8',
    },
  });
