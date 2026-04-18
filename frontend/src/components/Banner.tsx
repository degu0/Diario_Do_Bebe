import { useThemeContext } from '@/context/ThemeContext';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type BannerProps = {
  title: string;
  subtitle?: string;
  type: 'holiday' | 'meeting';
};

export default function Banner({ title, subtitle, type }: BannerProps) {
  const { theme, isDark } = useThemeContext();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  const accentColor = type === 'holiday' ? theme.colors.warning : theme.colors.meeting;
  const backgroundColor =
    type === 'holiday' ? theme.colors.warningBackground : theme.colors.meetingBackground;
  const icon = type === 'holiday' ? '⚠️' : '📅';

  return (
    <View style={[styles.banner, { backgroundColor, borderColor: accentColor }]}>
      <View style={[styles.iconWrap, { backgroundColor: `${accentColor}22` }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.textWrap}>
        <Text style={[styles.bannerText, { color: accentColor }]}>{title}</Text>
        {subtitle ? <Text style={styles.bannerSubtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    banner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderWidth: 1,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginBottom: 16,
    },
    iconWrap: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 16,
    },
    textWrap: {
      flex: 1,
      gap: 2,
    },
    bannerText: {
      fontSize: 13,
      fontWeight: '700',
    },
    bannerSubtitle: {
      fontSize: 12,
      color: isDark ? 'rgba(255,255,255,0.72)' : `${theme.colors.text}B3`,
    },
  });
