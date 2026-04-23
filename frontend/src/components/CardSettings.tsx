import { useAuth } from '@/context/AuthContext';
import { useThemeContext } from '@/context/ThemeContext';
import { useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Sun1, Moon, Logout } from 'iconsax-react-nativejs';

function SettingsButton({
  icon: Icon,
  label,
  onPress,
  surfaceColor,
  textColor,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  surfaceColor: string;
  textColor: string;
}) {
  const bgAnim = useRef(new Animated.Value(0)).current;
  const { isDark } = useThemeContext();

  const handlePressIn = () => {
    Animated.timing(bgAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(bgAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(237,224,247,0)', '#ede0f7'],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.button, { backgroundColor }]}>
        <View style={styles.iconBox}>
          <Icon size={20} color={textColor} variant={isDark ? 'Bold' : 'Outline'} />
        </View>
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function CardSettings() {
  const { theme, toggleTheme, isDark } = useThemeContext();
  const c = theme.colors;
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={[styles.container, { backgroundColor: c.surface }]}>
      <SettingsButton
        icon={isDark ? Sun1 : Moon}
        label={isDark ? 'Modo Claro' : 'Modo Escuro'}
        onPress={toggleTheme}
        surfaceColor={c.background}
        textColor={c.text}
      />
      <View style={[styles.divider, { backgroundColor: c.background }]} />
      <SettingsButton
        icon={Logout}
        label="Logout"
        onPress={handleLogout}
        surfaceColor={c.background}
        textColor={c.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 8,
    marginBottom: 12,
    shadowColor: '#8B4FFC',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  iconBox: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Nunito_500Medium',
  },
  divider: {
    height: 1,
    marginHorizontal: 10,
  },
});
