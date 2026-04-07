import { CustomDarkTheme, CustomLightTheme } from "@/constants/Colors";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";


type ThemeContextData = {
  isDark: boolean;
  toggleTheme: () => void;
  theme: typeof MD3LightTheme;
};

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must by use within ThemeProvider');
  return context;
};


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceScheme = useColorScheme();
  const [isDark, setIsDark] = useState(deviceScheme === "dark");

  useEffect(() => {
    setIsDark(deviceScheme === "dark");
  }, [deviceScheme]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(
    () => (isDark ? CustomDarkTheme : CustomLightTheme),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};