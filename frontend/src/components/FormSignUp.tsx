import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import theme from "../constants/colors";
const { colors } = theme;

export default function FormSignUp() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const handleSignUp = async () => {
    setErro("");

    if (!name || !email || !password) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      const type =
        email === "teacher@gmail.com" && password === "123"
          ? "teacher"
          : "responsible";
      await login({ email, type });
    } catch (error) {
      console.log("Erro no cadastro:", error);
      setErro("Erro ao tentar criar conta.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Olá,</Text>
        <Text style={styles.subtitle}>Estamos animados em te ver por aqui</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>NOME</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome completo"
              placeholderTextColor={colors.gray}
            />
          </View>
        </View>

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
          <Text style={styles.inputLabel}>SENHA</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.gray}
              secureTextEntry={!senhaVisivel}
            />
            <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
              <Text style={styles.inputIcon}>{senhaVisivel ? "🙈" : "👁"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Criar conta</Text>
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
    fontSize: 14,
    fontWeight: "400",
  },
  form: {
    gap: 16,
  },
  inputWrapper: {
    gap: 6,
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
  inputIcon: {
    fontSize: 15,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.dark_gray,
    paddingVertical: 12,
  },
  erro: {
    color: colors.red,
    fontSize: 13,
    textAlign: "center",
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