import { useThemeContext } from "@/context/ThemeContext";
import { Lock, Sms } from 'iconsax-react-native';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type FormLoginProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  erro: string;
};

export default function FormLogin({
  email,
  setEmail,
  password,
  setPassword,
  erro,
}: FormLoginProps) {
  const { theme } = useThemeContext();
  const c = theme.colors;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>EMAIL</Text>
        <View style={styles.inputContainer}>
          <Sms size={16} color={theme.colors.primary} variant="Outline" />
          <TextInput
            style={styles.input}
            placeholder="exemplo@gmail.com"
            placeholderTextColor={c.secondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>SENHA</Text>
        <View style={[styles.inputContainer, erro ? styles.inputErro : null]}>
          <Lock size={16} color={theme.colors.primary} variant="Outline" />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={c.secondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : null}

    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
      gap: 16,
    },
    inputWrapper: {
      gap: 6,
    },
    inputLabel: {
      fontSize: 11,
      fontWeight: "600",
      color: theme.colors.secondary,
      letterSpacing: 0.8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      paddingHorizontal: 12,
      paddingVertical: 2,
      gap: 8,
    },
    inputErro: {
      borderColor: theme.colors.error,
      borderWidth: 1.5,
    },
    inputIcon: {
      fontSize: 15,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: theme.colors.text,
      paddingVertical: 12,
    },
    erro: {
      color: theme.colors.error,
      textAlign: "center",
      fontSize: 13,
    },
  });