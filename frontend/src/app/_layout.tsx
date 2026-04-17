import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

void SplashScreen.preventAutoHideAsync();

function LayoutWrapper() {
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ animation: 'none', headerShown: false }} />
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LayoutWrapper />
      </ThemeProvider>
    </AuthProvider>
  );
}
