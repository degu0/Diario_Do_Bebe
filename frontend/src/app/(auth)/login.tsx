import FormLogin from "@/components/FormLogin";
import FormSignUp from "@/components/FormSignUp";
import ToggleAuthTabs from "@/components/ToggleAuthTabs";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

export default function Login() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ToggleAuthTabs active={tab} onChange={setTab} />
      {tab === "signin" ? <FormLogin /> : <FormSignUp />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
