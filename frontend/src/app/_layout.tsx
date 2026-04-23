import { AuthProvider } from '@/context/AuthContext';
import { ResponsibleChildProvider } from '@/context/ResponsibleChildContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { applyGlobalTypography } from '@/utils/applyGlobalTypography';
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

void SplashScreen.preventAutoHideAsync();

function LayoutWrapper() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      if (!fontsLoaded) return;

      applyGlobalTypography();
      await SplashScreen.hideAsync();
    };

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ animation: 'none', headerShown: false }} />
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ResponsibleChildProvider>
        <ThemeProvider>
          <LayoutWrapper />
        </ThemeProvider>
      </ResponsibleChildProvider>
    </AuthProvider>
  );
}
