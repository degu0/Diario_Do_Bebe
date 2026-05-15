import { useThemeContext } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPassword() {
  const { theme, isDark } = useThemeContext();
  const router = useRouter();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setFeedback('');

    if (!email.trim()) {
      setFeedback('Informe o email cadastrado.');
      return;
    }

    if (!email.includes('@')) {
      setFeedback('Digite um email valido para receber as instrucoes.');
      return;
    }

    setSent(true);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient
          colors={isDark ? ['#201833', '#6C4ED9'] : ['#C2BBF2', '#6C4ED9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <View style={styles.iconBadge}>
              <Ionicons name={sent ? 'mail-open-outline' : 'key-outline'} size={34} color="#fff" />
            </View>
            <Text style={styles.title}>{sent ? 'Email enviado' : 'Esqueci minha senha'}</Text>
            <Text style={styles.subtitle}>
              {sent
                ? 'Enviamos as instrucoes para recuperar o acesso.'
                : 'Informe seu email para receber as instrucoes de recuperacao.'}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.card}>
          {sent ? (
            <View style={styles.confirmationBox}>
              <Ionicons name="checkmark-circle" size={46} color={theme.colors.success} />
              <Text style={styles.confirmationTitle}>Verifique sua caixa de entrada</Text>
              <Text style={styles.confirmationText}>
                Quando o backend de email for integrado, este fluxo enviara um link seguro para
                redefinir a senha de {email.trim()}.
              </Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.replace('/(auth)/login')}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Voltar ao login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seuemail@exemplo.com"
                  placeholderTextColor={styles.placeholder.color}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                />
              </View>

              {feedback ? (
                <View style={styles.feedbackBox}>
                  <Ionicons
                    name="information-circle-outline"
                    size={18}
                    color={theme.colors.error}
                  />
                  <Text style={styles.feedbackText}>{feedback}</Text>
                </View>
              ) : (
                <View style={styles.infoBox}>
                  <Ionicons name="shield-checkmark-outline" size={18} color={theme.colors.text} />
                  <Text style={styles.infoText}>
                    Estrutura pronta para conectar com backend e servico de email.
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSubmit}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Enviar instrucoes</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    hero: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 72,
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
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
    },
    heroContent: {
      alignItems: 'center',
      gap: 10,
      paddingTop: 22,
    },
    iconBadge: {
      width: 68,
      height: 68,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.18)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.22)',
    },
    title: {
      color: '#fff',
      fontSize: 26,
      fontFamily: 'Nunito_700Bold',
      textAlign: 'center',
    },
    subtitle: {
      color: 'rgba(255,255,255,0.78)',
      fontSize: 14,
      lineHeight: 20,
      textAlign: 'center',
      maxWidth: 320,
    },
    card: {
      marginTop: -34,
      marginHorizontal: 16,
      padding: 18,
      borderRadius: 24,
      backgroundColor: theme.colors.surface,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 18,
      elevation: 8,
      gap: 16,
    },
    fieldGroup: {
      gap: 8,
    },
    label: {
      color: theme.colors.text,
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
    input: {
      borderWidth: 1,
      borderColor: isDark ? '#2C2440' : '#E7DDF7',
      backgroundColor: isDark ? '#191327' : '#FBF8FF',
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 14,
      color: theme.colors.text,
      fontSize: 14,
    },
    infoBox: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'flex-start',
      padding: 12,
      borderRadius: 16,
      backgroundColor: isDark ? '#1B162A' : '#F4EEFF',
      borderWidth: 1,
      borderColor: isDark ? '#2C2440' : '#E7DDF7',
    },
    infoText: {
      flex: 1,
      color: theme.colors.text,
      opacity: 0.76,
      fontSize: 13,
      lineHeight: 18,
    },
    feedbackBox: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'flex-start',
      padding: 12,
      borderRadius: 16,
      backgroundColor: isDark ? '#331D20' : '#FBE7E4',
      borderWidth: 1,
      borderColor: isDark ? '#593035' : '#F2B6AD',
    },
    feedbackText: {
      flex: 1,
      color: theme.colors.error,
      fontSize: 13,
      lineHeight: 18,
      fontFamily: 'Nunito_600SemiBold',
    },
    primaryButton: {
      minHeight: 50,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
    },
    primaryButtonText: {
      color: '#fff',
      fontSize: 15,
      fontFamily: 'Nunito_700Bold',
    },
    confirmationBox: {
      alignItems: 'center',
      gap: 12,
    },
    confirmationTitle: {
      color: theme.colors.text,
      fontSize: 18,
      fontFamily: 'Nunito_700Bold',
      textAlign: 'center',
    },
    confirmationText: {
      color: theme.colors.text,
      opacity: 0.75,
      fontSize: 14,
      lineHeight: 20,
      textAlign: 'center',
      marginBottom: 4,
    },
    placeholder: {
      color: isDark ? '#8E8AA5' : '#94A3B8',
    },
  });
