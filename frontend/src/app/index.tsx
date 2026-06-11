import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user?.type === "responsible") {
      router.replace("/(responsible)/home");
    } else if (user?.type === "teacher") {
      router.replace("/(teacher)/home");
    } else {
      router.replace("/(auth)/login");
    }
  }, [loading, user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
