import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
} from 'react-native-paper';

export const colors = {
  black: '#000000',
  white: '#FFFFFF',

  purple: '#8B4FFC',
  purpleDark: '#5D3A7E',
  purpleLight: '#A57AB2',
  purpleBackground: '#C2BBF2',

  red: '#EC6B6B',
  redBackground: '#FBE7E4',

  blue: '#2BA7D9',
  blueBackground: '#D7E7F8',

  green: '#5FC7B1',
  greenLight: '#B2E0B2',
  greenBackground: '#DBF5F0',

  gray: '#808080',
  grayLight: '#E8E8E8',
  grayDark: '#2F2F2F',
};

export const CustomLightTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,

    primary: colors.purple,
    secondary: colors.purpleDark,
    tertiary: colors.purpleLight,

    background: colors.grayLight,
    surface: colors.white,

    text: colors.grayDark,

    messageBackground: colors.white,
    messageUserBackground: colors.purpleBackground,

    profileMessageBackground: colors.grayDark,

    error: colors.red,

    success: colors.green,
    successBackground: colors.greenBackground,

    info: colors.blue,
    infoBackground: colors.blueBackground,
  },
};

export const CustomDarkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,

    primary: colors.purple,
    secondary: colors.purpleDark,
    tertiary: colors.purpleLight,

    background: colors.black,
    surface: colors.grayDark,

    text: colors.white,

    messageBackground: colors.grayDark,
    messageUserBackground: colors.purpleDark,

    profileMessageBackground: colors.purpleLight,

    error: colors.red,

    success: colors.green,
    successBackground: colors.greenBackground,

    info: colors.blue,
    infoBackground: colors.blueBackground,
  },
};
