import type { BannerVariant } from '@/types/notification';
import { useThemeContext } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type BannerProps = {
  title: string;
  subtitle?: string;
  type: BannerVariant;
};

export default function Banner({ title, subtitle, type }: BannerProps) {
  const { theme, isDark } = useThemeContext();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  const config = useMemo(() => {
    switch (type) {
      case 'holiday':
        return {
          accentColor: theme.colors.warning,
          backgroundColor: theme.colors.warningBackground,
          iconName: 'calendar-outline' as const,
        };
      case 'meeting':
        return {
          accentColor: theme.colors.meeting,
          backgroundColor: theme.colors.meetingBackground,
          iconName: 'people-outline' as const,
        };
      case 'report_available':
        return {
          accentColor: theme.colors.info,
          backgroundColor: theme.colors.infoBackground,
          iconName: 'document-text-outline' as const,
        };
      case 'report_reminder':
      default:
        return {
          accentColor: theme.colors.reminder,
          backgroundColor: theme.colors.reminderBackground,
          iconName: 'notifications-outline' as const,
        };
    }
  }, [theme, type]);

  return (
    <View
      style={[
        styles.banner,
        { backgroundColor: config.backgroundColor, borderColor: config.accentColor },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${config.accentColor}22` }]}>
        <Ionicons name={config.iconName} size={16} color={config.accentColor} />
      </View>

      <View style={styles.textWrap}>
        <Text style={[styles.bannerText, { color: config.accentColor }]}>{title}</Text>
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
    textWrap: {
      flex: 1,
      gap: 2,
    },
    bannerText: {
      fontSize: 13,
      fontFamily: 'Nunito_700Bold',
    },
    bannerSubtitle: {
      fontSize: 12,
      color: isDark ? 'rgba(255,255,255,0.72)' : `${theme.colors.text}B3`,
    },
  });
