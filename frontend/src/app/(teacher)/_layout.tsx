import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();


  if(!user || user.type !== "teacher") {
    return <Redirect href="/(auth)/login" />
  }

  return (
    <View style={{flex: 1}}>
        <Slot />
    </View>
  )
}
