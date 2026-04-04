import CardSettings from "@/components/CardSettings";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../constants/colors"; 

export default function Profile() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("@/assets/images/profile-icon.png")}
              style={styles.avatar}
            />
            <View style={styles.avatarBadge} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.profileName}>Rafaela Bezerra</Text>
            <View style={styles.phonePill}>
              <Text style={styles.phoneText}>Professora</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.cardRow}>
            <View style={[styles.cardSmall, { marginRight: 6 }]}>
              <Text style={styles.cardLabel}>Creche que atua</Text>
              <Text style={styles.cardValue}>Creche Sol lindo</Text>
              <View style={styles.hoursBadge}>
                <Text style={styles.hoursText}>8 às 18h</Text>
              </View>
            </View>
            <View style={[styles.cardSmall, { marginLeft: 6 }]}>
              <Text style={styles.cardLabel}>class</Text>
              <Text style={styles.cardValue}>Maternal I</Text>
            </View>
          </View>

          <View style={styles.cardSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Contato</Text>
              <View style={styles.sectionLine} />
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Email</Text>
              <Text style={styles.infoVal}>contatomeu@gmail.com</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Telefone</Text>
              <Text style={styles.infoVal}>(00)99999-9999</Text>
            </View>
            <View style={styles.divider} />
          </View>
          <CardSettings />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple_background,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: colors.light_purple,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: colors.white,
    backgroundColor: colors.purple,
  },
  avatarBadge: {
    position: "absolute",
    bottom: -3,
    right: -3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: colors.white,
  },
  headerInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 22,
    fontWeight: "600",
    color: colors.dark_gray,
    marginBottom: 8,
  },
  phonePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.white,
  },
  phoneText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.dark_gray,
  },
  content: {
    height: "80%",
    padding: 16,
    marginTop: 5,
  },
  cardRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  cardSmall: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 14,
    shadowColor: colors.purple,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: colors.gray,
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.dark_gray,
    lineHeight: 19,
  },
  hoursBadge: {
    backgroundColor: colors.light_purple,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  hoursText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.violet,
  },
  cardSection: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.purple,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.purple,
  },
  sectionTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 15,
    fontWeight: "600",
    color: colors.dark_gray,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.light_gray,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
  },
  divider: {
    height: 1,
    backgroundColor: colors.light_gray,
  },
  infoKey: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: colors.gray,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.dark_gray,
  },
});
