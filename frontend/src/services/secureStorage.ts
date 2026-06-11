import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'diario_bebe:auth_token';

export async function saveStoredToken(token: string): Promise<void> {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getStoredToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeStoredToken(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export const storeToken = saveStoredToken;

// Aliases padronizados
export const saveToken = saveStoredToken;
export const getToken = getStoredToken;
export const removeToken = removeStoredToken;
