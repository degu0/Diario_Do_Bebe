import { CustomDarkTheme, CustomLightTheme } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

type ThemePreference = 'dark' | 'light' | null;

type ThemeContextData = {
  isDark: boolean;
  toggleTheme: () => void;
  theme: typeof CustomDarkTheme | typeof CustomLightTheme;
};

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);
const THEME_PREFERENCE_KEY = '@diario_bebe:theme_preference';

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must by use within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceScheme = useColorScheme();
  const [themePreference, setThemePreference] = useState<ThemePreference>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadThemePreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);

        if (!isMounted) return;

        if (storedPreference === 'dark' || storedPreference === 'light') {
          setThemePreference(storedPreference);
        }
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    loadThemePreference();

    return () => {
      isMounted = false;
    };
  }, []);

  const isDark = themePreference ? themePreference === 'dark' : deviceScheme === 'dark';

  const toggleTheme = async () => {
    const nextPreference: ThemePreference = isDark ? 'light' : 'dark';

    setThemePreference(nextPreference);

    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, nextPreference);
    } catch {
    }
  };

  const theme = useMemo(() => (isDark ? CustomDarkTheme : CustomLightTheme), [isDark]);
  const fallbackIsDark = deviceScheme === 'dark';
  const resolvedIsDark = isLoaded ? isDark : fallbackIsDark;
  const resolvedTheme = resolvedIsDark ? CustomDarkTheme : CustomLightTheme;

  return (
    <ThemeContext.Provider value={{ isDark: resolvedIsDark, toggleTheme, theme: resolvedTheme }}>
      <PaperProvider theme={resolvedTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
