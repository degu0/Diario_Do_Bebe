import { useAuth } from "@/context/AuthContext";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeTeacher() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View>
      <Text>Hello Teacher</Text>
      <TouchableOpacity
        style={{ padding: 2, backgroundColor: "#00bbffff", marginTop: 2 }}
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
