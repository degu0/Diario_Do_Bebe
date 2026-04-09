import { useThemeContext } from '@/context/ThemeContext';
import StepChildren from '@/screens/register_responsible/StepChildren';
import StepConfirm from '@/screens/register_responsible/StepConfirm';
import StepPersonal from '@/screens/register_responsible/StepPersonal';

import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';

export default function StepRegister() {
  const { theme } = useThemeContext();

  return (
    <ProgressSteps
      activeStepIconColor={theme.colors.primary}
      activeStepIconBorderColor={theme.colors.primary}
      activeLabelColor={theme.colors.text}
      activeStepNumColor={theme.colors.text}
      completedStepIconColor={theme.colors.success}
      completedProgressBarColor={theme.colors.success}
      completedCheckColor={theme.colors.text}
      labelColor={theme.colors.text}
    >
      <ProgressStep
        label="Dados"
        buttonFillColor={theme.colors.primary}
        buttonNextTextColor="#FFFFFF"
      >
        <StepPersonal />
      </ProgressStep>

      <ProgressStep
        label="Filho"
        buttonFillColor={theme.colors.primary}
        buttonNextTextColor="#FFFFFF"
        previousBtnStyle={{ backgroundColor: '#E5E7EB' }}
        previousBtnTextStyle={{ color: '#000' }}
      >
        <StepChildren />
      </ProgressStep>

      <ProgressStep
        label="Confirmar"
        buttonFillColor={theme.colors.primary}
        buttonNextTextColor="#FFFFFF"
        previousBtnStyle={{ backgroundColor: '#E5E7EB' }}
        previousBtnTextStyle={{ color: '#000' }}
      >
        <StepConfirm />
      </ProgressStep>
    </ProgressSteps>
  );
}
