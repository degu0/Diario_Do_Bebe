import { router, usePathname } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const links = [
  {
    label: "Home",
    href: "/(responsible)/homeResponsible" as const,
    icon: require("../../assets/images/home-black.png"),
    iconActive: require("../../assets/images/home-purple.png"),
  },
  {
    label: "Turma",
    href: "/(responsible)/turma" as const,
    icon: require("../../assets/images/book-black.png"),
    iconActive: require("../../assets/images/book-purple.png"),
  },
  {
    label: "Perfil",
    href: "/(responsible)/perfil" as const,
    icon: require("../../assets/images/user-black.png"),
    iconActive: require("../../assets/images/user-purple.png"),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <View style={styles.container}>
      <View style={styles.containerNav}>
        {links.map((link) => {
          const path = link.href.split("/(responsible)");
          const isActive = pathname === path[1];

          return (
            <TouchableOpacity
              key={link.href}
              style={[styles.link, isActive && styles.activeLink]}
              onPress={() => router.push(link.href)}
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
