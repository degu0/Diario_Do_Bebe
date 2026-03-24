import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  active: "signin" | "signup";
  onChange: (tab: "signin" | "signup") => void;
};

export default function ToggleAuthTabs({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, active === "signin" && styles.activeTab]}
        onPress={() => onChange("signin")}
      >
        <Text style={[styles.text, active === "signin" && styles.activeText]}>
          Sign in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, active === "signup" && styles.activeTab]}
        onPress={() => onChange("signup")}
      >
        <Text style={[styles.text, active === "signup" && styles.activeText]}>
          Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#e9e6e6ff",
    borderRadius: 10,
    padding: 5
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600"
  },
  activeText: {
    color: "#1a1a2e",
    fontWeight: "600"
  },
});
