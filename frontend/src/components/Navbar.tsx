import { useAuth } from '@/context/AuthContext';
import { useThemeContext } from '@/context/ThemeContext';
import { router, usePathname } from 'expo-router';
import { Book, Calendar2, Home, Profile } from 'iconsax-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type NavLink = {
  label: string;
  href: string;
  icon: any;
};

const teacherLinks: NavLink[] = [
  { label: 'Home', href: '/(teacher)/home', icon: Home },
  { label: 'Calendario', href: '/calendar', icon: Calendar2 },
  { label: 'class', href: '/(teacher)/class', icon: Book },
  { label: 'Perfil', href: '/(teacher)/profile', icon: Profile },
];

const responsibleLinks: NavLink[] = [
  { label: 'Home', href: '/(responsible)/home', icon: Home },
  { label: 'Calendario', href: '/calendar', icon: Calendar2 },
  { label: 'Perfil', href: '/(responsible)/profile', icon: Profile },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { theme } = useThemeContext();

  const styles = createStyles(theme);

  const links = user?.type === 'teacher' ? teacherLinks : responsibleLinks;

  return (
    <View style={styles.container}>
      {links.map((link) => {
        const routeName = link.href.split('/').pop();
        const isActive = pathname.endsWith(routeName ?? '');

        const Icon = link.icon;

        return (
          <TouchableOpacity
            key={link.href}
            style={styles.link}
            onPress={() => router.replace(link.href as any)}
          >
            <Icon
              size={25}
              color={isActive ? theme.colors.primary : theme.colors.text}
              variant={isActive ? 'Bold' : 'Outline'}
            />

            <Text style={[styles.text, isActive && styles.activeText]}>{link.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.surface,
      width: 350,
      height: 80,
      flexDirection: 'row',
      borderRadius: 120,
      justifyContent: 'space-around',
      alignItems: 'center',
    },

    link: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,

    },
    text: {
      marginTop: 4,
      fontSize: 10,
      color: theme.colors.text,
    },

    activeText: {
      color: theme.colors.primary,
      fontFamily: 'Nunito_600SemiBold',
    },
  });
