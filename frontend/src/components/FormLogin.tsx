
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

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  inputWrapper: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
  },
  erro: {
    textAlign: "center",
  },
});

