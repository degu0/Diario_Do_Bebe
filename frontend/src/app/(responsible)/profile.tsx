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
              <Text style={styles.phoneIcon}>📞</Text>
              <Text style={styles.phoneText}>(81) 99111-1111</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.cardRow}>
            <View style={[styles.cardSmall, { marginRight: 6 }]}>
              <Text style={styles.cardLabel}>Endereço</Text>
              <Text style={styles.cardValue}>Nº100, Rua aqui do lado</Text>
              <Text style={styles.cardValue}>Indianopolis</Text>
            </View>
            <View style={[styles.cardSmall, { marginLeft: 6 }]}>
              <Text style={styles.cardLabel}>Local de Trabalho</Text>
              <Text style={styles.cardValue}>Nº129, Avenida aqui perto</Text>
              <Text style={styles.cardValue}>Nova Caruaru</Text>
              <View style={styles.hoursBadge}>
                <Text style={styles.hoursText}>8 às 18h</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.emailIconBox}>
              <Text style={styles.emailIconText}>✉️</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Email</Text>
              <Text style={styles.cardValue}>contatomeu@gmail.com</Text>
            </View>
          </View>

          <View style={styles.cardSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Informações</Text>
              <View style={styles.sectionLine} />
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Nome</Text>
              <Text style={styles.infoVal}>Rafaela Bezerra</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>CPF</Text>
              <Text style={styles.infoVal}>000.000.000-00</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>RG</Text>
              <Text style={styles.infoVal}>00.000.00</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Parentesco</Text>
              <View style={styles.parentescoBadge}>
                <Text style={styles.parentescoText}>Mãe</Text>
              </View>
            </View>
          </View>
          <CardSettings />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const PURPLE_LIGHT = "#ede0f7";
const PURPLE_MID = "#c9a8e8";
const PURPLE_DARK = "#a67cc5";
const PURPLE_GRADIENT_TOP = "#e8d5f5";
const WHITE = "#ffffff";
const TEXT_DARK = "#2d2d2d";
const TEXT_MID = "#5a5a5a";
const TEXT_LIGHT = "#9a9a9a";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f0fa",
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: PURPLE_GRADIENT_TOP,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: WHITE,
    backgroundColor: PURPLE_LIGHT,
  },
  avatarBadge: {
    position: "absolute",
    bottom: -3,
    right: -3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#7bc47b",
    borderWidth: 2,
    borderColor: WHITE,
  },
  headerInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 22,
    fontWeight: "600",
    color: TEXT_DARK,
    marginBottom: 8,
  },
  phonePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.65)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  },
  phoneIcon: { fontSize: 13 },
  phoneText: {
    fontSize: 13,
    fontWeight: "500",
    color: TEXT_DARK,
  },
  content: {
    padding: 16,
    marginTop: -16,
  },
  cardRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  cardSmall: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 14,
    shadowColor: "#b39dcc",
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
    color: TEXT_LIGHT,
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 13,
    fontWeight: "500",
    color: TEXT_DARK,
    lineHeight: 19,
  },
  hoursBadge: {
    backgroundColor: PURPLE_LIGHT,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  hoursText: {
    fontSize: 11,
    fontWeight: "600",
    color: PURPLE_DARK,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
    shadowColor: "#b39dcc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  emailIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: PURPLE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  emailIconText: { fontSize: 17 },
  cardSection: {
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#b39dcc",
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
    backgroundColor: PURPLE_MID,
  },
  sectionTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 15,
    fontWeight: "600",
    color: TEXT_DARK,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  infoKey: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: TEXT_LIGHT,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: "600",
    color: TEXT_DARK,
  },
  parentescoBadge: {
    backgroundColor: PURPLE_MID,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  parentescoText: {
    fontSize: 12,
    fontWeight: "700",
    color: WHITE,
    letterSpacing: 0.3,
  },
});
