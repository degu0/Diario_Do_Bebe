import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  email: string;
  type: "responsible" | "teacher";
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      if (res) setUser(JSON.parse(res));
    });
  }, []);

  const login = async (userData: User) => {
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    if (userData.type === "responsible") {
      router.replace("/(responsible)/home");
    } else if (userData.type === "teacher") {
      router.replace("/(teacher)/home");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth must be used within AuthProvider.");
    }
    return context;
}
