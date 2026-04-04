
import Fonts from "@/constants/Fonts";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import theme from "@/constants/colors";
const { colors } = theme;

export default function FormLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erroPassword, setErroPassword] = useState(false);

  const handleLogin = async () => {
    setErro("");

    if (!email || !password) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      const type =
        email === "admin@gmail.com" && password === "123"
          ? "responsible"
          : "teacher";

      if (email === "teacher@gmail.com" && password !== "123") {
        setErroPassword(true);
        return;
      }
      await login({ email, type });
    } catch (error) {
      console.log("Erro no login:", error);
      setErro("Erro ao tentar fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Bem-Vindo de volta,</Text>
        <Text style={styles.subtitle}>Bom te ver de novo</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>EMAIL</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="exemplo@gmail.com"
              placeholderTextColor={colors.gray}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.labelRow}>
            <Text style={styles.inputLabel}>SENHA</Text>
            {erroPassword && (
              <Text style={styles.erroInline}>⚠ Senha incorreta</Text>
            )}
          </View>

          <View
            style={[styles.inputContainer, erroPassword && styles.inputErro]}
          >
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setErroPassword(false);
              }}
              placeholder="••••••••"
              placeholderTextColor={colors.gray}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.inputIcon}>
                {showPassword ? "🙈" : "👁"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotWrapper}>
            <Text style={styles.forgot}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.textButton}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 24,
  },

  containerTitle: {
    gap: 4,
  },

  title: {
    color: colors.dark_gray,
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.gray, 
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
    color: colors.gray, 
    letterSpacing: 0.8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.light_gray, 
    paddingHorizontal: 12,
    paddingVertical: 2,
    gap: 8,
  },

  inputErro: {
    borderColor: colors.red, 
    borderWidth: 1.5,
  },

  inputIcon: {
    fontSize: 15,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: colors.dark_gray, 
    paddingVertical: 12,
  },

  forgotWrapper: {
    alignSelf: "flex-end",
  },

  forgot: {
    fontSize: 13,
    color: colors.purple, 

  erro: {
    color: colors.red, 
    textAlign: "center",
  },

  erroInline: {
    color: colors.red, 
    fontSize: 12,
  },

  button: {
    backgroundColor: colors.purple, 
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: colors.purple, 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  textButton: {
    color: colors.white, 
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
