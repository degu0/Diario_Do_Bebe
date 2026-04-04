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

const kids = [
  { id: 1, image: profileIcon, name: 'Maria Fernanda', age: '1 ano e 2 meses', initials: 'MF' },
  { id: 2, image: profileIcon, name: 'Zeca Silva',     age: '3 anos',          initials: 'ZS' },
];

export default function Home() {
  const name = 'Carlos';
  const selectedKid = kids[0];

  return (
    <View style={styles.container}>
      <View style={styles.apresention}>
        <Text style={styles.title}>Olá, {name}</Text>
        <Text style={styles.subtitle}>Sexta-feira, 13 de março</Text>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>⚠️  Feriado em 3 dias</Text>
        </View>
        <View style={styles.kidsRow}>
          {kids.map((kid) => {
            const isSelected = kid.id === selectedKid.id;
            return (
              <TouchableOpacity
                key={kid.id}
                style={[styles.kidChip, isSelected && styles.kidChipSelected]}
              >
                <View style={styles.kidInitials}>
                  <Text style={styles.kidInitialsText}>{kid.initials}</Text>
                </View>
                {isSelected && (
                  <View>
                    <Text style={styles.kidChipName}>{kid.name}</Text>
                    <Text style={styles.kidChipAge}>{kid.age}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bigCard}>
          <Text style={styles.titleCard}>Status de hoje</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Presente na creche</Text>
          </View>
        </View>
        <View style={styles.smallCardsRow}>
          <View style={styles.smallCard}>
            <Text style={styles.smallCardNumber}>Bem</Text>
            <Text style={styles.smallCardLabel}>Alimentação</Text>
          </View>
          <View style={[styles.smallCard, styles.smallCardDivider]}>
            <Text style={styles.smallCardNumber}>1 h 20 min</Text>
            <Text style={styles.smallCardLabel}>Sono/Soneca</Text>
          </View>
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
    paddingTop: 52,
    paddingBottom: 28,
    gap: 6,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginBottom: 14,
  },
  banner: {
    backgroundColor: '#fef9e7',
    borderWidth: 1,
    borderColor: '#f9e79f',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#d4ac0d',
  },
  kidsRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  kidChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  kidChipSelected: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  kidInitials: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.colors.purple_dark,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kidInitialsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  kidChipName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  kidChipAge: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
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
    fontSize: 13,
    color: '#9a9a9a',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#27ae60',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d2d2d',
  },
  smallCardsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#b39dcc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  smallCard: {
    flex: 1,
    padding: 16,
    gap: 6,
  },
  smallCardDivider: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0,0,0,0.06)',
  },
  smallCardNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2ec4b6',
  },
  smallCardLabel: {
    fontSize: 12,
    color: '#9a9a9a',
    fontWeight: '500',
  },
});