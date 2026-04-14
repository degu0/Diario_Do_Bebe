import { useState } from 'react';
import { CustomRadioButton } from '@/components/CustomRadioButton';
import MultiSelectTabs from '@/components/MultiSelectTabs';
import { useThemeContext } from '@/context/ThemeContext';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Register() {
  const { theme } = useThemeContext();
  const styles = createStyles(theme);
  const router = useRouter();

  const [presenca, setPresenca] = useState('presente');
  const [humor, setHumor] = useState('animado');
  const [alimentacao, setAlimentacao] = useState('bem');
  const [atividades, setAtividades] = useState<string[]>([]);
  const [observacoes, setObservacoes] = useState('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={require('@/assets/icon/profile.png')}
          style={styles.avatar}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>Maria Clara</Text>
          <Text style={styles.subtitle}>Maternal I - Segunda, 14 de Agosto</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presença</Text>
          <View style={styles.rowBetween}>
            <CustomRadioButton
              label="Presente"
              selected={presenca === 'presente'}
              onSelect={() => setPresenca('presente')}
              color={theme.colors.success}
              style={styles.flex}
            />
            <CustomRadioButton
              label="Ausente"
              selected={presenca === 'ausente'}
              onSelect={() => setPresenca('ausente')}
              color={theme.colors.error}
              style={styles.flex}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Humor do dia</Text>
          <View style={styles.wrapRow}>
            {['animado', 'neutro', 'triste', 'agitado'].map((item) => (
              <CustomRadioButton
                key={item}
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                selected={humor === item}
                onSelect={() => setHumor(item)}
                size="lg"
              />
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={styles.sectionTitle}>Alimentação</Text>
            {[
              { label: 'Comeu bem', value: 'bem' },
              { label: 'Comeu pouco', value: 'pouco' },
              { label: 'Não comeu', value: 'nao' },
            ].map((item) => (
              <CustomRadioButton
                key={item.value}
                label={item.label}
                selected={alimentacao === item.value}
                onSelect={() => setAlimentacao(item.value)}
              />
            ))}
          </View>

          <View style={styles.flex}>
            <Text style={styles.sectionTitle}>Soneca</Text>
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Início"
                placeholderTextColor={theme.colors.text}
                style={styles.input}
              />
              <TextInput
                placeholder="Fim"
                placeholderTextColor={theme.colors.text}
                style={styles.input}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atividades do dia</Text>
          <MultiSelectTabs
            options={[
              { label: 'Pintura', value: 'pintura' },
              { label: 'Musicalização', value: 'musica' },
              { label: 'Parque', value: 'parque' },
              { label: 'Leitura', value: 'leitura' },
              { label: 'Psicomotora', value: 'psicomotora' },
            ]}
            onChange={setAtividades}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observações</Text>
          <TextInput
            placeholder="Escreva aqui..."
            placeholderTextColor={theme.colors.text}
            multiline
            value={observacoes}
            onChangeText={setObservacoes}
            style={styles.textArea}
          />
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },

    backButton: {
      marginTop: 10,
      marginLeft: 12,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,

      elevation: 3,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 8,
      marginTop: 15,
      marginBottom: 10,
    },

    avatar: {
      width: 50,
      height: 50,
    },

    headerText: {
      gap: 2,
    },

    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },

    subtitle: {
      fontSize: 14,
      color: theme.colors.text,
    },

    content: {
      marginTop: 8,
      padding: 16,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      gap: 18,
    },

    section: {
      gap: 8,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },

    row: {
      flexDirection: 'row',
      gap: 16,
    },

    rowBetween: {
      flexDirection: 'row',
      gap: 10,
    },

    wrapRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },

    flex: {
      flex: 1,
      gap: 8,
    },

    inputGroup: {
      gap: 8,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.colors.surface,
      borderRadius: 8,
      padding: 10,
      color: theme.colors.text,
    },

    textArea: {
      borderWidth: 1,
      borderColor: theme.colors.surface,
      borderRadius: 8,
      padding: 10,
      minHeight: 90,
      textAlignVertical: 'top',
      color: theme.colors.text,
    },

    button: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },

    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
