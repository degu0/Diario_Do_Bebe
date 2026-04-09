import StepRegister from '@/components/StepRegister';
import { useThemeContext } from '@/context/ThemeContext';
import { ScrollView, View } from 'react-native';

export default function Register() {
  const { theme } = useThemeContext();

  return (
    <ScrollView style={{ backgroundColor: theme.colors.surface }}>
      <StepRegister />
    </ScrollView>
  );
}
