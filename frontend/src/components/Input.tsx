import { useThemeContext } from '@/context/ThemeContext';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  const { theme } = useThemeContext();
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>}

      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          focused && styles.inputFocused,
          {
            borderColor: theme.colors.tertiary,
            backgroundColor: 'transparent',
            color: theme.colors.text,
          },
        ]}
        placeholderTextColor="#9CA3AF"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#374151',
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  inputError: {
    borderColor: '#EF4444',
  },

  error: {
    color: '#EF4444',
    marginTop: 4,
    fontSize: 12,
  },
  inputFocused: {
    borderWidth: 0,
  },
});
