import FormLogin from '@/components/FormLogin';
import { useAuth } from '@/context/AuthContext';
import { useThemeContext } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login() {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const { theme, isDark } = useThemeContext();
  const { login } = useAuth();
  const c = theme.colors;

  const bannerFlex = useRef(new Animated.Value(2.8)).current;
  const cardFlex = useRef(new Animated.Value(1.2)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formY = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(1)).current;
  const logoY = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ]),
      );
    pulse(dot1, 0).start();
    pulse(dot2, 400).start();
    pulse(dot3, 800).start();
  }, []);

  const handleActivate = () => {
    setActive(true);
    Animated.parallel([
      Animated.timing(bannerFlex, {
        toValue: 1.2,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(cardFlex, {
        toValue: 2,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(logoScale, {
        toValue: 0.7,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(logoY, {
        toValue: -10,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(200),
        Animated.parallel([
          Animated.timing(formOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(formY, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
  };

  const handleLogin = async () => {
    setErro('');
    if (!email || !password) {
      setErro('Preencha todos os campos');
      return;
    }
    if (password.length < 6) {
      setErro('A senha deve conter no mínimo 6 caracteres');
      return;
    }

    if (email !== 'responsible@example.com') {
      await login({ email, type: 'teacher' });
      return;
    }

    await login({ email, type: 'responsible' });
    return;
  };

  const gradientColors: [string, string] = isDark
    ? [c.secondary, c.primary]
    : ['#C2BBF2', c.primary];

  const dotOpacity = (anim: Animated.Value) =>
    anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.9] });

  const dotScale = (anim: Animated.Value) =>
    anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.2] });

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View style={{ flex: bannerFlex }}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          {[dot1, dot2, dot3].map((dot, i) => (
            <Animated.View
              key={i}
              style={[
                styles.decorDot,
                {
                  opacity: dotOpacity(dot),
                  transform: [{ scale: dotScale(dot) }],
                  top: [60, 30, 80][i],
                  left: [30, 'auto' as any, 'auto' as any][i],
                  right: [undefined, 40, 70][i],
                },
              ]}
            />
          ))}

          <View style={styles.decorCircle} />

          <Animated.View style={{ transform: [{ scale: logoScale }, { translateY: logoY }] }}>
            <Image
              source={require('@/assets/images/user-black.png')}
              style={styles.bannerImage}
              resizeMode="contain"
            />
          </Animated.View>

          {!active && (
            <View style={styles.bannerTextWrapper}>
              <Text style={styles.bannerTitle}>Diário do Bebê</Text>
              <Text style={styles.bannerSubtitle}>Acompanhe cada momento</Text>
            </View>
          )}
        </LinearGradient>
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          {
            flex: cardFlex,
            backgroundColor: c.surface,
          },
        ]}
      >
        {!active ? (
          <View style={styles.welcomeContainer}>
            <Text style={[styles.welcomeTitle, { color: c.text }]}>Bem-vindo!</Text>
            <Text style={[styles.welcomeSubtitle, { color: c.secondary }]}>
              Faça login para continuar
            </Text>
            <TouchableOpacity
              style={[styles.enterButton, { backgroundColor: c.primary }]}
              onPress={handleActivate}
            >
              <Text style={styles.enterButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Animated.View
            style={{
              opacity: formOpacity,
              transform: [{ translateY: formY }],
            }}
          >
            <Text style={[styles.cardTitle, { color: c.text }]}>Sign in</Text>
            <Text style={[styles.cardSubtitle, { color: c.secondary }]}>Entre com sua conta</Text>

            <View style={styles.formWrapper}>
              <FormLogin
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                erro={erro}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: c.primary }]}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerImage: {
    width: 110,
    height: 110,
    tintColor: 'rgba(255,255,255,0.95)',
  },
  bannerTextWrapper: {
    position: 'absolute',
    bottom: 72,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  decorDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  decorCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    bottom: -60,
    right: -40,
  },

  card: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 28,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
    marginTop: -36,
  },
  welcomeContainer: {
    alignItems: 'center',
    gap: 8,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  welcomeSubtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  enterButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  enterButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  formWrapper: {
    marginTop: 20,
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
