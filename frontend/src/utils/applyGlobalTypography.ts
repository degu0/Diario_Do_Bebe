import { typography } from '@/constants/Typography';
import { Text, TextInput } from 'react-native';

let hasAppliedTypography = false;

export function applyGlobalTypography() {
  if (hasAppliedTypography) {
    return;
  }

  const TextComponent = Text as typeof Text & {
    defaultProps?: { style?: unknown };
  };
  const TextInputComponent = TextInput as typeof TextInput & {
    defaultProps?: { style?: unknown };
  };

  TextComponent.defaultProps = TextComponent.defaultProps || {};
  TextComponent.defaultProps.style = [
    { fontFamily: typography.fontFamily.regular },
    TextComponent.defaultProps.style,
  ];

  TextInputComponent.defaultProps = TextInputComponent.defaultProps || {};
  TextInputComponent.defaultProps.style = [
    { fontFamily: typography.fontFamily.regular },
    TextInputComponent.defaultProps.style,
  ];

  hasAppliedTypography = true;
}
