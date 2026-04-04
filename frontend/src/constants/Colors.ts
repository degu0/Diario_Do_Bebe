
export const colors = {
  black: "#000000",
  white: "#FFFFFF",
  purple: "#8B4FFC",
  violet: "#5D3A7E",
  light_purple: "#A57AB2",
  purple_background: "#C2BBF2",
  red: "#EC6B6B",
  red_background: "#FBE7E4",
  blue: "#2BA7D9",
  blue_background: "#D7E7F8",
  green: "#5FC7B1",
  green_background: "#DBF5F0",
  light_green: "#B2E0B2",
  gray: "#808080",
  light_gray: "#E8E8E8",
  dark_gray: "#2F2F2F",
};

export const theme = {
  light: {
    background: colors.white,
    text: colors.black,

    primary: colors.purple,
    secondary: colors.violet,

    card: colors.light_gray,
    border: colors.gray,
  },

  dark: {
    background: colors.dark_gray,
    text: colors.white,

    primary: colors.light_purple,
    secondary: colors.violet,

    card: "#3A3A3A",
    border: "#444",
  },
};