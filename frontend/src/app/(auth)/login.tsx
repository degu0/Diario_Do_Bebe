import FormLogin from "@/components/FormLogin";
import FormSignUp from "@/components/FormSignUp";
import ToggleAuthTabs from "@/components/ToggleAuthTabs";
import { theme, colors } from "@/constants/theme";

import { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function Login() {
  const [tab, setTab] = useState<"signin" | "signup" | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const [name, setName] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erroSignUp, setErroSignUp] = useState("");

  const t = theme.light;

  const isSignIn = tab === "signin";
  const isSignUp = tab === "signup";
  const isActive = tab !== null;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  const handleLogin = async () => {
    setErro("");
    if (!email || !password) {
      setErro("Preencha todos os campos");
      return;
    }
    console.log("Login:", email, password);
  };

  const handleSignUp = () => {
    setErroSignUp("");
    if (!name || !emailSignUp || !passwordSignUp || !confirmPassword) {
      setErroSignUp("Preencha todos os campos");
      return;
    }
    if (passwordSignUp !== confirmPassword) {
      setErroSignUp("As senhas não coincidem");
      return;
    }
    console.log("SignUp:", { name, emailSignUp, passwordSignUp });
  };

  useEffect(() => {
    if (tab) {
      fadeAnim.setValue(0);
      translateY.setValue(30);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [tab]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.light_gray }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#C2BBF2" , "#8B4FFC"]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.banner, { flex: isActive ? 1.2 : 2.8 }]}
      >
        <Image
          source={require("@/assets/logo.png")}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </LinearGradient>

      <View
        style={[
          styles.card,
          { backgroundColor: t.background, flex: isActive ? 2 : 1.2 },
        ]}
      >
        <View style={[styles.tabsWrapper, { backgroundColor: t.card }]}>
          <ToggleAuthTabs active={tab} onChange={setTab} />
        </View>

        {tab && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY }],
              marginTop: 20,
            }}
          >
            {isSignIn && (
              <FormLogin
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                erro={erro}
              />
            )}

            {isSignUp && (
              <FormSignUp
                name={name}
                setName={setName}
                email={emailSignUp}
                setEmail={setEmailSignUp}
                password={passwordSignUp}
                setPassword={setPasswordSignUp}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                erro={erroSignUp}
              />
            )}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: t.primary }]}
              onPress={isSignIn ? handleLogin : handleSignUp}
            >
              <Text style={styles.buttonText}>
                {isSignIn ? "Sign in" : "Create account"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  bannerImage: {
    width: "60%",
    height: "40%",
  },
  card: {
    borderRadius: 30,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
    justifyContent: "center",
  },
  tabsWrapper: {
    borderRadius: 14,
    padding: 4,
  },
  button: {
    marginTop: 10,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
});
