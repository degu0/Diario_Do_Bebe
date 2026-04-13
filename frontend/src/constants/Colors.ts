import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
} from 'react-native-paper';

export const colors = {
  white: '#FFFFFF',
  black: '#0B0F19',

  transparent: 'transparent',

  backgroundLight: '#F8FAFC',
  backgroundDark: '#140f2aff',

  surfaceLight: '#FFFFFF',
  surfaceDark: '#1E293B',

  borderLight: '#E5E7EB',
  borderDark: '#334155',

  textPrimaryLight: '#111827',
  textSecondaryLight: '#6B7280',

  textPrimaryDark: '#F9FAFB',
  textSecondaryDark: '#94A3B8',

  primary: '#7C3AED',
  primaryHover: '#6D28D9',
  primarySoft: '#EDE9FE',

  success: '#22C55E',
  successSoft: '#DCFCE7',

  error: '#EF4444',
  errorSoft: '#FEE2E2',

  info: '#3B82F6',
  infoSoft: '#DBEAFE',

  gray: '#64748B',
};

export const CustomLightTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,

    primary: colors.primary,
    secondary: colors.primaryHover,
    tertiary: colors.primarySoft,

    background: colors.backgroundLight,
    surface: colors.surfaceLight,

    text: colors.textPrimaryLight,

    outline: colors.borderLight,

    messageBackground: colors.surfaceLight,
    messageUserBackground: colors.primarySoft,

    profileMessageBackground: colors.borderLight,

    error: colors.error,

    success: colors.success,
    successBackground: colors.successSoft,

    info: colors.info,
    infoBackground: colors.infoSoft,
  },
};

export const CustomDarkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,

    primary: '#8B5CF6',
    secondary: colors.primary,
    tertiary: colors.primarySoft,

    background: colors.backgroundDark,
    surface: colors.surfaceDark,

    text: colors.textPrimaryDark,

    outline: colors.borderDark,

    messageBackground: colors.surfaceDark,
    messageUserBackground: '#5B21B6',

    profileMessageBackground: '#312E81',

    error: colors.error,

    success: colors.success,
    successBackground: '#052e16',

    info: colors.info,
    infoBackground: '#1e3a8a',
  },
};