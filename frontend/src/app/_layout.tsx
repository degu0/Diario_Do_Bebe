import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

function LayoutWrapper() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ animation: 'none', headerShown: false }} />
    </SafeAreaView>
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
