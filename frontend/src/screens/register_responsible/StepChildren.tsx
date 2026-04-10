import Input from '@/components/Input';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MultiSelect } from 'react-native-element-dropdown';

const studentsMock = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Souza' },
];

const allergiesOptions = ['Amendoim', 'Leite', 'Glúten'];
const medicinesOptions = ['Paracetamol', 'Ibuprofeno', 'Dipirona'];

export default function StepChildren() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [createStudent, setCreateStudent] = useState(false);

  const [allergies, setAllergies] = useState<string[]>([]);
  const [medicines, setMedicines] = useState<string[]>([]);

  const toggleOption = (value: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter((i) => i !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecionar aluno</Text>

      <Picker
        selectedValue={selectedStudent}
        onValueChange={(value) => {
          if (value === 'not_found') {
            setCreateStudent(true);
            setSelectedStudent(null);
          } else {
            setSelectedStudent(value);
            setCreateStudent(false);
          }
        }}
      >
        <Picker.Item label="Selecione um aluno" value={null} />
        {studentsMock.map((student) => (
          <Picker.Item key={student.id} label={student.name} value={student.id} />
        ))}
        <Picker.Item label="Não encontrei o aluno" value="not_found" />
      </Picker>

      {createStudent && (
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Cadastrar estudante</Text>

          <Input label="Nome completo" />
          <Input label="CPF" />
          <Input label="Data de nascimento" />
          <MultiSelect
            data={allergiesOptions.map((item) => ({ label: item, value: item }))}
            labelField="label"
            valueField="value"
            value={allergies}
            onChange={(items) => setAllergies(items)}
            placeholder="Selecione alergias"
            style={styles.dropdown}
          />

          <MultiSelect
            data={medicinesOptions.map((item) => ({ label: item, value: item }))}
            labelField="label"
            valueField="value"
            value={medicines}
            onChange={(items) => setMedicines(items)}
            placeholder="Selecione medicamentos"
            style={styles.dropdown}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
  },

  form: {
    marginTop: 20,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  option: {
    paddingVertical: 6,
    fontSize: 14,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
  },
});
