import { CustomDarkTheme, CustomLightTheme } from '@/constants/Colors';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

type ThemeContextData = {
  isDark: boolean;
  toggleTheme: () => void;
  theme: typeof CustomDarkTheme | typeof CustomLightTheme;
};

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must by use within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceScheme = useColorScheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(deviceScheme === 'dark');
  }, [deviceScheme]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(() => (isDark ? CustomDarkTheme : CustomLightTheme), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
