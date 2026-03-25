import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
              placeholderTextColor="#aaa"
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
              placeholderTextColor="#aaa"
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
              placeholderTextColor="#aaa"
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
  inputIcon: {
    fontSize: 15,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#00051f",
    paddingVertical: 12,
  },
  erro: {
    color: "#e03e3e",
    fontSize: 13,
    textAlign: "center",
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
