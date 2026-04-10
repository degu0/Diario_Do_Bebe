import Input from '@/components/Input';
import { useThemeContext } from '@/context/ThemeContext';
import { View, Text, StyleSheet } from 'react-native';

export default function StepPersonal() {
  const { theme } = useThemeContext();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Dados pessoais</Text>

        <Input label="Nome" />
        <Input label="Email" />
        <Input label="Telefone" />
        <Input label="Endereço" />
      </View>
      <View style={styles.section}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Trabalho</Text>

        <Input label="Nome do trabalho" />
        <Input label="Endereço do trabalho" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
  },

  section: {
    gap: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
});
