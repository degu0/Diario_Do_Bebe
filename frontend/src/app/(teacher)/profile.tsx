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
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const { theme } = useThemeContext();
  const c = theme.colors;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: c.background }]}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
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
                <Text style={[styles.phoneText, { color: c.text }]}>Professora</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.cardRow}>
              <View style={[styles.cardSmall, { marginRight: 6, backgroundColor: c.surface }]}>
                <Text style={[styles.cardLabel, { color: c.secondary }]}>Creche que atua</Text>
                <Text style={[styles.cardValue, { color: c.text }]}>Creche Sol Lindo</Text>
                <View style={[styles.hoursBadge, { backgroundColor: c.background }]}>
                  <Text style={[styles.hoursText, { color: c.primary }]}>8 às 18h</Text>
                </View>
              </View>
              <View style={[styles.cardSmall, { marginLeft: 6, backgroundColor: c.surface }]}>
                <Text style={[styles.cardLabel, { color: c.secondary }]}>Turma</Text>
                <Text style={[styles.cardValue, { color: c.text }]}>Maternal I</Text>
              </View>
            </View>

            <View style={[styles.cardSection, { backgroundColor: c.surface }]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionDot, { backgroundColor: c.primary }]} />
                <Text style={[styles.sectionTitle, { color: c.text }]}>Contato</Text>
                <View style={[styles.sectionLine, { backgroundColor: c.background }]} />
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: c.secondary }]}>Email</Text>
                <Text style={[styles.infoVal, { color: c.text }]}>contatomeu@gmail.com</Text>
              </View>
              <View style={[styles.divider, { backgroundColor: c.background }]} />

              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: c.secondary }]}>Telefone</Text>
                <Text style={[styles.infoVal, { color: c.text }]}>(00)99999-9999</Text>
              </View>
              <View style={[styles.divider, { backgroundColor: c.background }]} />
            </View>

            <CardSettings />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  phoneText: {
    fontSize: 13,
    fontWeight: '500',
  },
  content: {
    padding: 16,
    marginTop: 5,
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardSmall: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#8B4FFC',
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
  cardSection: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#8B4FFC',
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
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },
  divider: {
    height: 1,
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
});
