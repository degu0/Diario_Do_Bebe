import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
              placeholderTextColor="#aaa"
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
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.inputIcon}>{showPassword ? "🙈" : "👁"}</Text>
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
    color: "#00051f",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#7a7a7a",
    fontSize: 14,
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
    color: "#aaa",
    letterSpacing: 0.8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    paddingHorizontal: 12,
    paddingVertical: 2,
    gap: 8,
  },
  inputErro: {
    borderColor: "#e03e3e",
    borderWidth: 1.5,
  },
  inputIcon: {
    fontSize: 15,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#00051f",
    paddingVertical: 12,
  },
  forgotWrapper: {
    alignSelf: "flex-end",
  },
  forgot: {
    fontSize: 13,
    color: "#8B4FFC",
  },
  erro: {
    color: "#e03e3e",
    fontSize: 13,
    textAlign: "center",
  },
  erroInline: {
    color: "#e03e3e",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#8B4FFC",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#8B4FFC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
