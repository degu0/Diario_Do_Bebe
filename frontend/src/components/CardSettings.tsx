import { useAuth } from '@/context/AuthContext';
import { useThemeContext } from '@/context/ThemeContext';
import { useRef, useMemo } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function SettingsButton({ icon, label }: { icon: any; label: string }) {
  const { theme, toggleTheme } = useThemeContext();
  const bgAnim = useRef(new Animated.Value(0)).current;
  const { logout } = useAuth();

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
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleOnPress = async () => {
    if (label.toLowerCase() === 'modo escuro') {
      toggleTheme();
    } else if (label === 'Logout') {
      await logout();
    }
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      'rgba(0,0,0,0)', 
      theme.dark ? 'rgba(255,255,255,0.1)' : theme.colors.messageUserBackground,
    ],
  });

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleOnPress}
    >
      <Animated.View style={[styles.button, { backgroundColor }]}>
        <View style={styles.iconBox}>
          <Image 
            style={[styles.image, { tintColor: theme.colors.primary }]} 
            source={icon} 
          />
        </View>
        <Text style={styles.text}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function CardSettings() {
  const { theme } = useThemeContext();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <SettingsButton 
        icon={require('@/assets/icon/sun.png')} 
        label="Modo Escuro" 
      />
      <View style={styles.divider} />
      <SettingsButton 
        icon={require('@/assets/icon/logout.png')} 
        label="Logout" 
      />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 8,
    marginBottom: 12,
    shadowColor: theme.isDark ? '#000' : theme.colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: theme.isDark ? 0.4 : 0.12,
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
    borderRadius: 10,
    backgroundColor: theme.isDark ? theme.colors.background : theme.colors.messageUserBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 18,
    height: 18,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.isDark ? '#333' : '#E8E8E8',
    marginHorizontal: 10,
  },
});