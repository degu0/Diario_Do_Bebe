import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Redirect, Slot } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVBAR_HEIGHT = 100;
const NAVBAR_OFFSET = 12;

export default function ProtectedLayout() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const bottomOffset = insets.bottom + NAVBAR_OFFSET;
  const contentBottomPadding = NAVBAR_HEIGHT + bottomOffset;

  if (!user || user.type !== 'teacher') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingBottom: contentBottomPadding }}>
        <Slot />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: bottomOffset,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Navbar />
      </View>
    </View>
  );
}
