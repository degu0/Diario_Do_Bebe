import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function setupNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Notificacoes gerais',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  if (!Device.isDevice) {
    return { granted: false, expoPushToken: null };
  }

  const permissionStatus = await Notifications.requestPermissionsAsync();
  const isGranted = Boolean((permissionStatus as { granted?: boolean }).granted);

  if (!isGranted) {
    return { granted: false, expoPushToken: null };
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync();
    return { granted: true, expoPushToken: token.data };
  } catch {
    return { granted: true, expoPushToken: null };
  }
}
