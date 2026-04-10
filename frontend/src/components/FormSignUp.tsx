import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { theme } from "@/constants/theme";

export default function FormSignUp({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  erro,
}) {
  const t = theme.light;

  return (
    <View style={styles.container}>
     
      <View style={styles.inputWrapper}>
        <Text style={[styles.label, { color: t.border }]}>NOME</Text>
        <TextInput
          style={[styles.input, { color: t.text, borderColor: t.border, backgroundColor: t.background }]}
          placeholder="Seu nome"
          placeholderTextColor={t.border}
          value={name}
          onChangeText={setName}
        />
      </View>

      
      <View style={styles.inputWrapper}>
        <Text style={[styles.label, { color: t.border }]}>EMAIL</Text>
        <TextInput
          style={[styles.input, { color: t.text, borderColor: t.border, backgroundColor: t.background }]}
          placeholder="exemplo@gmail.com"
          placeholderTextColor={t.border}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      
      <View style={styles.inputWrapper}>
        <Text style={[styles.label, { color: t.border }]}>SENHA</Text>
        <TextInput
          style={[styles.input, { color: t.text, borderColor: t.border, backgroundColor: t.background }]}
          placeholder="••••••••"
          placeholderTextColor={t.border}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

     
      <View style={styles.inputWrapper}>
        <Text style={[styles.label, { color: t.border }]}>CONFIRMAR SENHA</Text>
        <TextInput
          style={[styles.input, { color: t.text, borderColor: t.border, backgroundColor: t.background }]}
          placeholder="••••••••"
          placeholderTextColor={t.border}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
    width: '100%',
    gap: 24,
  },
  containerTitle: {
    gap: 4,
  },
  title: {
    color: colors.dark_gray,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.gray,
    fontSize: 14,
    fontWeight: '400',
  },
  form: {
    gap: 16,
  },
  inputWrapper: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.gray,
    letterSpacing: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
  },
  erro: {
    color: colors.red,
    fontSize: 13,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.purple,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  textButton: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
