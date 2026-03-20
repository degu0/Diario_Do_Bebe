import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function PublicLayout() {
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (user && user.type !== "responsible" && user.type !== "teacher") {
      logout();
    }
  }, [user]);


  if (user) {
    if (user.type === "responsible") {
      return <Redirect href="/(responsible)/homeResponsible" />;
    }
    if (user.type === "teacher") {
      return <Redirect href="/(teacher)/homeTeacher" />;
    }
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack screenOptions={{ animation: "none", headerShown: false }} />;
}
