import { useThemeContext } from '@/context/ThemeContext';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useMemo } from 'react';
import { ptBR } from '@/utils/LocaleCalendarConfig';

const profileIcon = require('@/assets/icon/profile.png');

type Props = {
  name: string;
};

export default function DataUser({ name }: Props) {
  const { theme, isDark } = useThemeContext();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  const today = new Date();
  const hours = today.getHours();

  const comprimento = useMemo(() => {
    if (hours >= 5 && hours < 12) return 'Bom dia';
    if (hours >= 12 && hours < 18) return 'Boa tarde';
    return 'Boa noite';
  }, [hours]);

  const dataFormatada = useMemo(() => {
    const diaSemana = ptBR.dayNames[today.getDay()];
    const dia = today.getDate();
    const mes = ptBR.monthNames[today.getMonth()];

    return `${diaSemana}, ${dia} de ${mes}`;
  }, [today]);

  return (
    <View style={styles.dateUser}>
      <Image source={profileIcon} style={styles.imageUser} />
      <View>
        <Text style={styles.title}>
          {comprimento}, {name}
        </Text>
        <Text style={styles.subtitle}>{dataFormatada}</Text>
        <Text style={styles.subtitle}>Escola | Turma A1</Text>
      </View>
    </View>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    dateUser: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      marginBottom: 22,
    },
    imageUser: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: 'rgba(255,255,255,0.18)',
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.22)',
    },
    title: {
      fontSize: 24,
      color: '#FFFFFF',
      fontFamily: 'Nunito_700Bold',
      marginBottom: 4,
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.76)',
      fontSize: 13,
      marginTop: 2,
    },
  });