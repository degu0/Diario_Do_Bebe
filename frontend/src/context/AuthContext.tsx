import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuthenticatedUser, loginRequest } from "@/services/authService";
import { removeStoredToken, storeToken } from "@/services/secureStorage";
import type { AuthUser, UserType } from "@/services/types";

type User = AuthUser;

type LoginData = {
  email: string;
  password: string;
  type?: UserType;
};

type AuthContextType = {
  user: User | null;
  login: (userData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const restoredUser = await getAuthenticatedUser();

        if (isMounted) {
          setUser(restoredUser);
        }
      } catch {
        await removeStoredToken();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (userData: LoginData) => {
    const response = await loginRequest(userData);
    await storeToken(response.token);
    setUser(response.user);

    if (response.user.type === "responsible") {
      router.replace("/(responsible)/home");
    } else if (response.user.type === "teacher") {
      router.replace("/(teacher)/home");
    }
  };

  const logout = async () => {
    await removeStoredToken();
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
