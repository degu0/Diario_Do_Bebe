import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function LayoutWrapper() {
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
