import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext'; // Ajuste o caminho se necessário
import { typeConfig } from '../utils/typeConfig';

type CardDateSpecialType = {
  date: string;
  title: string;
  timeStart: string;
  timeEnd: string;
  type: 'reunion' | 'holiday' | 'no_class' | 'tour';
  location: string;
};

export function CardDateSpecial({
  date,
  title,
  timeStart,
  timeEnd,
  type,
  location,
}: CardDateSpecialType) {
  const { theme } = useThemeContext();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const config = typeConfig[type];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.dark ? `${config.border}33` : config.bg,
          borderBottomColor: config.border,
        },
      ]}
    >
      <Text style={styles.title}>{title}</Text>

      <View style={styles.description}>
        <View style={styles.descriptionItem}>
          <Text style={styles.icon}>📅</Text>
          <Text style={styles.descriptionText}>{date}</Text>
        </View>

        <View style={styles.descriptionItem}>
          <Text style={styles.icon}>🕐</Text>
          <Text style={styles.descriptionText}>
            {timeStart} - {timeEnd}
          </Text>
        </View>

        <Text style={styles.descriptionText}>{location}</Text>
      </View>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      borderRadius: 16,
      width: '100%',
      padding: 16,
      borderBottomWidth: 4,
      marginBottom: 12,
      shadowColor: theme.isDark ? '#000' : '#b39dcc',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.isDark ? 0.3 : 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontFamily: 'Nunito_700Bold',
      color: theme.colors.text,
      marginBottom: 10,
    },
    description: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
    },
    descriptionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    icon: {
      fontSize: 13,
    },
    descriptionText: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.8,
      fontFamily: 'Nunito_500Medium',
    },
  });
