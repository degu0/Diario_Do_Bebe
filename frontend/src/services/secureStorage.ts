import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'diario_bebe:auth_token';

export async function getStoredToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function storeToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function removeStoredToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
