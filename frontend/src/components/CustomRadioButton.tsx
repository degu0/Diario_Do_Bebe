import { useThemeContext } from '@/context/ThemeContext';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

type SizeType = 'sm' | 'md' | 'lg';

type CustomRadioButtonProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  color?: string;
  textColor?: string;
  size?: SizeType;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function CustomRadioButton({
  label,
  selected,
  onSelect,
  color,
  textColor,
  size = 'md',
  style,
  textStyle,
}: CustomRadioButtonProps) {
  const { theme } = useThemeContext();
  const styles = createStyles(theme);

  const activeColor = color || theme.colors.secondary;
  const activeTextColor = textColor || '#fff';

  const sizeStyles = getSizeStyles(size);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        sizeStyles.container,
        {
          backgroundColor: selected ? activeColor : theme.colors.background,
          borderColor: selected ? activeColor : theme.colors.surface,
        },
        style,
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          sizeStyles.text,
          { color: selected ? activeTextColor : theme.colors.text },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const getSizeStyles = (size: SizeType) => {
  switch (size) {
    case 'sm':
      return {
        container: {
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 6,
        },
        text: {
          fontSize: 13,
        },
      };
    case 'lg':
      return {
        container: {
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 10,
        },
        text: {
          fontSize: 17,
        },
      };
    case 'md':
    default:
      return {
        container: {
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 8,
        },
        text: {
          fontSize: 15,
        },
      };
  }
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10,
      borderWidth: 1,
    },

    text: {
      fontWeight: '500',
    },
  });