import CardSettings from '@/components/CardSettings';
import { useThemeContext } from '@/context/ThemeContext';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Profile() {
  const { theme } = useThemeContext();
  const c = theme.colors;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: c.background }]}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: c.surface }]}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../../assets/icon/profile.png')}
              style={[styles.avatar, { borderColor: c.surface, backgroundColor: c.primary }]}
            />
            <View style={styles.avatarBadge} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.profileName, { color: c.text }]}>Rafaela Bezerra</Text>
            <View
              style={[
                styles.phonePill,
                { backgroundColor: c.background, borderColor: c.background },
              ]}
            >
              <Text style={styles.phoneIcon}>📞</Text>
              <Text style={[styles.phoneText, { color: c.text }]}>(81) 99111-1111</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.cardRow}>
            <View style={[styles.cardSmall, { marginRight: 6, backgroundColor: c.surface }]}>
              <Text style={[styles.cardLabel, { color: c.secondary }]}>Endereço</Text>
              <Text style={[styles.cardValue, { color: c.text }]}>Nº100, Rua aqui do lado</Text>
              <Text style={[styles.cardValue, { color: c.text }]}>Indianopolis</Text>
            </View>
            <View style={[styles.cardSmall, { marginLeft: 6, backgroundColor: c.surface }]}>
              <Text style={[styles.cardLabel, { color: c.secondary }]}>Local de Trabalho</Text>
              <Text style={[styles.cardValue, { color: c.text }]}>Nº129, Avenida aqui perto</Text>
              <Text style={[styles.cardValue, { color: c.text }]}>Nova Caruaru</Text>
              <View style={[styles.hoursBadge, { backgroundColor: c.background }]}>
                <Text style={[styles.hoursText, { color: c.primary }]}>8 às 18h</Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, {backgroundColor: c.surface}]}>
            <View style={[styles.emailIconBox, {backgroundColor: c.tertiary}]}>
              <Text style={styles.emailIconText}>✉️</Text>
            </View>
            <View>
              <Text style={[styles.cardLabel, { color: c.secondary }]}>Email</Text>
              <Text style={[styles.cardValue, { color: c.text }]}>contatomeu@gmail.com</Text>
            </View>
          </View>

          <View style={[styles.cardSection, {backgroundColor: c.surface}]}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionDot, {backgroundColor: c.primary}]} />
              <Text style={[styles.sectionTitle, {color: c.text}]}>Informações</Text>
              <View style={styles.sectionLine} />
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoKey, {color: c.tertiary}]}>Nome</Text>
              <Text style={[styles.infoVal, {color: c.text}]}>Rafaela Bezerra</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={[styles.infoKey, {color: c.tertiary}]}>CPF</Text>
              <Text style={[styles.infoVal, {color: c.text}]}>000.000.000-00</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={[styles.infoKey, {color: c.tertiary}]}>RG</Text>
              <Text style={[styles.infoVal, {color: c.text}]}>00.000.00</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={[styles.infoKey, {color: c.tertiary}]}>Parentesco</Text>
              <View style={[styles.parentescoBadge, { backgroundColor: c.primary}]}>
                <Text style={[styles.parentescoText, {color: c.surface}]}>Mãe</Text>
              </View>
            </View>
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
    backgroundColor: '#f5f0fa',
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 22,
    borderWidth: 3,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#5FC7B1',
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  phonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  phoneIcon: { fontSize: 13 },
  phoneText: {
    fontSize: 13,
    fontWeight: '500',
  },
  content: {
    padding: 16,
    marginTop: -16,
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardSmall: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#b39dcc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
  },
  hoursBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  hoursText: {
    fontSize: 11,
    fontWeight: '600',
  },
  card: {
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
    shadowColor: '#b39dcc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  emailIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailIconText: { fontSize: 17 },
  cardSection: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#b39dcc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  infoKey: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '600',
  },
  parentescoBadge: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  parentescoText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
