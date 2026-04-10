
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { theme } from "@/constants/theme";

export default function FormLogin({
  email,
  setEmail,
  password,
  setPassword,
  erro,
}) {
  const t = theme.light;

  return (
    <View style={styles.container}>
      
      <View style={styles.inputWrapper}>
        <Text style={[styles.label, { color: t.border }]}>EMAIL</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: t.text,
              borderColor: t.border,
              backgroundColor: t.background,
            },
          ]}
          placeholder="exemplo@gmail.com"
          placeholderTextColor={t.border}
          value={email}
          onChangeText={setEmail}
        />
      </View>

     
      <View style={styles.inputWrapper}>
        <Text style={[styles.label, { color: t.border }]}>SENHA</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: t.text,
              borderColor: t.border,
              backgroundColor: t.background,
            },
          ]}
          placeholder="••••••••"
          placeholderTextColor={t.border}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      
      {erro ? (
        <Text style={[styles.erro, { color: t.primary }]}>{erro}</Text>
      ) : null}
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
      gap: 24,
    },

    containerTitle: {
      gap: 4,
    },

    title: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: "700",
    },

    subtitle: {
      color: theme.colors.gray,
      fontSize: Fonts.size.sm,
      fontWeight: "400",
    },

    form: {
      gap: 16,
    },

    inputWrapper: {
      gap: 6,
    },

    labelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    inputLabel: {
      fontSize: 11,
      fontWeight: "600",
      color: theme.colors.gray,
      letterSpacing: 0.8,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.grayLight,
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

    forgotWrapper: {
      alignSelf: "flex-end",
    },

    forgot: {
      fontSize: 13,
      color: theme.colors.primary,
    },

    erro: {
      color: theme.colors.error,
      textAlign: "center",
    },

    erroInline: {
      color: theme.colors.error,
      fontSize: 12,
    },

    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },

    textButton: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: "600",
      letterSpacing: 0.3,
    },
  });
