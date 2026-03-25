import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";
import { View } from "react-native";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user || user.type !== "responsible") {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <View style={{ position: "absolute", bottom: 20, width: "100%", alignItems:"center" }}>
        <Navbar />
      </View>
    </View>
  );
}
