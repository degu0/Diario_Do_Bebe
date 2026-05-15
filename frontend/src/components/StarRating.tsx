import { useThemeContext } from '@/context/ThemeContext';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  disabled?: boolean;
};

function RatingStar({
  index,
  selected,
  onPress,
  disabled,
}: {
  index: number;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  const { theme, isDark } = useThemeContext();
  const scale = useRef(new Animated.Value(selected ? 1.08 : 1)).current;
  const styles = createStyles(theme, isDark);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1.12 : 1,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [scale, selected]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${index} estrela${index > 1 ? 's' : ''}`}
      onPress={onPress}
      disabled={disabled}
      style={({ hovered, pressed }) => [
        styles.starButton,
        selected && styles.starButtonSelected,
        hovered && !disabled && styles.starButtonHover,
        pressed && !disabled && styles.starButtonPressed,
        disabled && styles.disabled,
      ]}
    >
      <Animated.Text
        style={[
          styles.star,
          selected && styles.starSelected,
          {
            transform: [{ scale }],
          },
        ]}
      >
        ★
      </Animated.Text>
    </Pressable>
  );
}

export function StarRating({ value, onChange, max = 3, disabled }: StarRatingProps) {
  const { theme, isDark } = useThemeContext();
  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.container}>
      <View style={styles.starRow}>
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;

          return (
            <RatingStar
              key={starValue}
              index={starValue}
              selected={starValue <= value}
              onPress={() => onChange(starValue)}
              disabled={disabled}
            />
          );
        })}
      </View>
      <Text style={styles.helperText}>
        {value === 1
          ? 'Iniciando habilidades'
          : value === 2
            ? 'Em desenvolvimento'
            : 'Avancando com autonomia'}
      </Text>
    </View>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      gap: 10,
    },
    starRow: {
      flexDirection: 'row',
      gap: 10,
    },
    starButton: {
      width: 54,
      height: 54,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? '#191327' : '#FFF9E8',
      borderWidth: 1,
      borderColor: isDark ? '#3A3048' : '#F7DFA4',
    },
    starButtonSelected: {
      backgroundColor: isDark ? '#3B2A12' : '#FFE7A8',
      borderColor: '#F5B942',
      shadowColor: '#F5B942',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 3,
    },
    starButtonHover: {
      borderColor: '#F5B942',
      backgroundColor: isDark ? '#2C2416' : '#FFF2C8',
    },
    starButtonPressed: {
      transform: [{ scale: 0.97 }],
    },
    star: {
      fontSize: 28,
      color: isDark ? '#8E8AA5' : '#D9C899',
      lineHeight: 34,
    },
    starSelected: {
      color: '#F5A900',
    },
    helperText: {
      fontSize: 13,
      lineHeight: 18,
      color: theme.colors.text,
      opacity: 0.72,
      fontFamily: 'Nunito_600SemiBold',
    },
    disabled: {
      opacity: 0.5,
    },
  });
