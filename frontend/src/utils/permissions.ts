import * as Notifications from 'expo-notifications';

export async function requestNotificationPermission() {
  const permissionStatus = await Notifications.requestPermissionsAsync();
  const isGranted = Boolean((permissionStatus as { granted?: boolean }).granted);

  if (!isGranted) {
    alert('Permissao para notificacoes nao concedida!');
  }
}
