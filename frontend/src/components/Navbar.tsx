import { useAuth } from "@/context/AuthContext";
import { router, usePathname } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const icons = {
  home: require("@/assets/images/home-black.png"),
  homeActive: require("@/assets/images/home-purple.png"),
  class: require("@/assets/images/book-black.png"),
  classActive: require("@/assets/images/book-purple.png"),
  profile: require("@/assets/images/user-black.png"),
  profileActive: require("@/assets/images/user-purple.png"),
};

type NavLink = {
  label: string;
  href: string;
  icon: any;
  iconActive: any;
};

const teacherLinks: NavLink[] = [
  {
    label: "Home",
    href: "/(teacher)/home",
    icon: icons.home,
    iconActive: icons.homeActive,
  },
  {
    label: "class",
    href: "/(teacher)/class",
    icon: icons.class,
    iconActive: icons.classActive,
  },
  {
    label: "Perfil",
    href: "/(teacher)/profile",
    icon: icons.profile,
    iconActive: icons.profileActive,
  },
];

const responsibleLinks: NavLink[] = [
  {
    label: "Home",
    href: "/(responsible)/home",
    icon: icons.home,
    iconActive: icons.homeActive,
  },
  {
    label: "Perfil",
    href: "/(responsible)/profile",
    icon: icons.profile,
    iconActive: icons.profileActive,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const links = user?.type === "teacher" ? teacherLinks : responsibleLinks;

  return (
    <View style={styles.container}>
      <View style={styles.containerNav}>
        {links.map((link) => {
          const routeName = link.href.split("/").pop();
          const isActive = pathname.endsWith(routeName ?? "");

          return (
            <TouchableOpacity
              key={link.href}
              style={[styles.link, isActive && styles.activeLink]}
              onPress={() => router.push(link.href as any)}
            >
              <Image
                source={isActive ? link.iconActive : link.icon}
                style={styles.image}
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
    backgroundColor: "rgba(217, 217, 217, 0.3)",
    borderColor: "rgba(255, 255, 255, 1)",
    borderRadius: 120,
    width: 350,
    height: 100,
    padding: 12,
  },
  containerNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 120,
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  link: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 17,
  },
  activeLink: {
    borderTopWidth: 2,
    borderTopColor: "#8B4FFC",
  },
  image: {
    width: 25,
    height: 25,
  },
  text: {
    marginTop: 4,
    fontSize: 10,
    color: "#aaa",
  },
  activeText: {
    color: "#8B4FFC",
    fontWeight: "600",
  },
});
