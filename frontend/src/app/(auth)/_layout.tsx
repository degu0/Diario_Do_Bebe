import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

export default function PublicLayout() {
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (user && user.type !== "responsible" && user.type !== "teacher") {
      logout();
    }
  }, [user]);

  if (user) {
    if (user.type === "responsible") {
      return <Redirect href="/(responsible)/home" />;
    }
    if (user.type === "teacher") {
      return <Redirect href="/(teacher)/home" />;
    }
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack screenOptions={{ animation: "none", headerShown: false }} />;
}
