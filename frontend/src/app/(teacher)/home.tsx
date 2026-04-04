import Colors from '@/constants/Colors';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const profileIcon = require('@/assets/images/profile-icon.png');

const statusColors: Record<string, { bg: string; text: string }> = {
  Preenchida: { bg: '#d4f5e2', text: '#27ae60' },
  Ausente:    { bg: '#fde8e8', text: '#e74c3c' },
  Pendente:   { bg: '#fef3e2', text: '#f39c12' },
};

const kids = [
  { id: 1, image: profileIcon, name: 'Charles Junior', status: 'Preenchida' },
  { id: 2, image: profileIcon, name: 'Maria Silva',    status: 'Ausente'    },
  { id: 3, image: profileIcon, name: 'João Pedro',     status: 'Pendente'   },
  { id: 4, image: profileIcon, name: 'Ana Beatriz',    status: 'Preenchida' },
];

export default function Home() {
  const name = 'Aline';
  const filledCount = 5;
  const totalCount = 8;
  const progress = filledCount / totalCount;

  return (
    <View style={styles.container}>
      <View style={styles.apresention}>
        <View style={styles.dateUser}>
          <Image source={profileIcon} style={styles.imageUser} />
          <Text style={styles.title}>Bom dia, {name} 👋</Text>
        </View>
        <Text style={styles.subtitle}>Sexta-feira, 13 de março</Text>
        <Text style={styles.subtitle}>Escola | Turma A1</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>⚠️  Feriado em 3 dias</Text>
        </View>
        <View style={styles.bigCard}>
          <Text style={styles.titleCard}>Fichas preenchidas</Text>
          <View style={styles.numberCard}>
            <Text style={styles.numberBig}>{filledCount}</Text>
            <Text style={styles.numberSmall}>/{totalCount}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        <View style={styles.smallCardsRow}>
          <View style={styles.smallCard}>
            <Text style={styles.smallCardNumber}>2</Text>
            <Text style={styles.smallCardLabel}>Ausentes hoje</Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={styles.smallCardNumber}>1</Text>
            <Text style={styles.smallCardLabel}>Ocorrência</Text>
          </View>
        </View>
        <View style={styles.kidsSection}>
          <View style={styles.kidsSectionHeader}>
            <Text style={styles.kidsSectionTitle}>Crianças da turma</Text>
            <TouchableOpacity>
              <Text style={styles.verMais}>Ver mais</Text>
            </TouchableOpacity>
          </View>

          {kids.map((item) => {
            const statusStyle = statusColors[item.status] ?? { bg: '#eee', text: '#999' };
            return (
              <TouchableOpacity key={item.id} style={styles.kidRow}>
                <Image source={item.image} style={styles.kidAvatar} />
                <Text style={styles.kidName}>{item.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.purple_dark,
  },
  apresention: {
    padding: 20,
    paddingTop: 48,
    paddingBottom: 32,
  },
  dateUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 10,
  },
  imageUser: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ede0f7',
  },
  title: {
    fontSize: 22,
    color: Colors.colors.white,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 2,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },
  banner: {
    backgroundColor: '#fef9e7',
    borderWidth: 1,
    borderColor: '#f9e79f',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#d4ac0d',
  },
  bigCard: {
    backgroundColor: '#fafafa',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#b39dcc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  titleCard: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d2d2d',
    marginBottom: 8,
  },
  numberCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: 12,
  },
  numberBig: {
    fontSize: 42,
    fontWeight: '600',
    color: '#2d2d2d',
    lineHeight: 48,
  },
  numberSmall: {
    fontSize: 20,
    fontWeight: '500',
    color: '#9a9a9a',
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ede0f7',
    borderRadius: 10,
  },
  progressFill: {
    height: 6,
    backgroundColor: Colors.colors.purple_dark,
    borderRadius: 10,
  },
  smallCardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  smallCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#b39dcc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 6,
  },
  smallCardNumber: {
    fontSize: 36,
    fontWeight: '600',
    color: '#e74c3c',
  },
  smallCardLabel: {
    fontSize: 12,
    color: '#9a9a9a',
    fontWeight: '500',
  },
  kidsSection: {
    marginBottom: 32,
  },
  kidsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kidsSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  verMais: {
    fontSize: 13,
    color: Colors.colors.purple_dark,
    fontWeight: '500',
  },
  kidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    gap: 12,
  },
  kidAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ede0f7',
  },
  kidName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#2d2d2d',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 18,
    color: '#ccc',
  },
});