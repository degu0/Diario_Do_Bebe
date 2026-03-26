import { useAuth } from "@/context/AuthContext";
import { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function SettingsButton({ icon, label }: { icon: any; label: string }) {
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

  const handleOnPress = async (label: string) => {
    if (label === "Logout") {
      await logout();
    } else if (label === "Modo escuro") {
      console.log("Dark mod");
    }
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(237,224,247,0)", "#ede0f7"],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => handleOnPress(label)}
    >
      <Animated.View style={[styles.button, { backgroundColor }]}>
        <View style={styles.iconBox}>
          <Image style={styles.image} source={icon} />
        </View>
        <Text style={styles.text}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function CardSettings() {
  return (
    <View style={styles.container}>
      <SettingsButton
        icon={require("@/assets/icon/sun.png")}
        label="Modo Escuro"
      />
      <View style={styles.divider} />
      <SettingsButton
        icon={require("@/assets/icon/logout.png")}
        label="Logout"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 8,
    marginBottom: 12,
    shadowColor: "#b39dcc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#f5f0fa",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 18,
    height: 18,
    tintColor: "#a67cc5",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d2d2d",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.04)",
    marginHorizontal: 10,
  },
});
