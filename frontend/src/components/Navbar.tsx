import { useAuth } from '@/context/AuthContext';
import { router, usePathname } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Home, Calendar, Book, Profile } from 'iconsax-react-native';

type NavLink = {
  label: string;
  href: string;
  icon: any;
};

const teacherLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/(teacher)/home',
    icon: Home,
  },
  {
    label: 'Calendario',
    href: '/calendar',
    icon: Calendar,
  },
  {
    label: 'class',
    href: '/(teacher)/class',
    icon: Book,
  },
  {
    label: 'Perfil',
    href: '/(teacher)/profile',
    icon: Profile,
  },
];

const responsibleLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/(responsible)/home',
    icon: Home,
  },
  {
    label: 'Calendario',
    href: '/calendar',
    icon: Calendar,
  },
  {
    label: 'Perfil',
    href: '/(responsible)/profile',
    icon: Profile,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const links = user?.type === 'teacher' ? teacherLinks : responsibleLinks;

  return (
    <View style={styles.container}>
      <View style={styles.containerNav}>
        {links.map((link) => {
          const routeName = link.href.split('/').pop();
          const isActive = pathname.endsWith(routeName ?? '');

          const Icon = link.icon;

          return (
            <TouchableOpacity
              key={link.href}
              style={[styles.link, isActive && styles.activeLink]}
              onPress={() => router.push(link.href as any)}
            >
              <Icon
                size={25}
                color={isActive ? '#8B4FFC' : '#aaa'}
                variant={isActive ? 'Bold' : 'Outline'}
              />
              <Text style={[styles.text, isActive && styles.activeText]}>
                {link.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light_gray + "4D", 
    borderColor: colors.white,
    borderRadius: 120,
    width: 350,
    height: 100,
    padding: 12,
  },
  containerNav: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 120,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  link: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 17,
  },
  activeLink: {
    borderTopWidth: 2,
    borderTopColor: colors.purple,
  },
  image: {
    width: 25,
    height: 25,
  },
  text: {
    marginTop: 4,
    fontSize: 10,
    color: colors.gray,
  },
  activeText: {
    color: colors.purple,
    fontWeight: "600",
  },
});