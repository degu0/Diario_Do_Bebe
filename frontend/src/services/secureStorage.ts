import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'diario_bebe:auth_token';

export async function saveStoredToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    // Se for Web, usa o localStorage padrão do navegador
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    // Se for dispositivo móvel, usa o SecureStore criptografado
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
}

export async function getStoredToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    // Se for Web, busca do localStorage
    return localStorage.getItem(TOKEN_KEY);
  } else {
    // Se for dispositivo móvel, busca do SecureStore
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
}
export async function storeToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function removeStoredToken(): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}
