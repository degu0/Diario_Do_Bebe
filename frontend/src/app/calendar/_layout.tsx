import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVBAR_OFFSET = 12;

export default function ProtectedLayout() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const bottomOffset = insets.bottom + NAVBAR_OFFSET;

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {user && (
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
      )}
    </View>
  );
}
