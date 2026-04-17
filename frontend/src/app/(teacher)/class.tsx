import { useThemeContext } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileIcon = require('@/assets/icon/profile.png');

const kids = [
  { id: 1, image: profileIcon, name: 'Charles Junior', class: 'A1' },
  { id: 2, image: profileIcon, name: 'Maria Silva', class: 'A2' },
];

export default function Claass() {
  const { theme, isDark } = useThemeContext();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
  const [search, setSearch] = useState('');
  const [filteredKids, setFilteredKids] = useState(kids);

  const handleSearch = (text: string) => {
    setSearch(text);
    const newData = kids.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredKids(newData);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroGlowLarge} />
          <View style={styles.heroGlowSmall} />

          <Text style={styles.title}>Turma</Text>
          <Text style={styles.subtitle}>Pesquise e acesse o perfil de cada crianca.</Text>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.inputSearch}
              placeholder="Pesquisar crianca..."
              placeholderTextColor={styles.placeholder.color}
              value={search}
              onChangeText={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.buttonSearch}>
              <Image source={require('@/assets/icon/search.png')} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.listCard}>
            {filteredKids.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => router.navigate(`/baby/${item.id}`)}
              >
                <Image source={item.image} style={styles.imageKid} />
                <View style={styles.informationContainer}>
                  <Text style={styles.kidName}>{item.name}</Text>
                  <Text style={styles.kidClass}>Turma {item.class}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#120F1F' : '#6C4ED9',
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 160,
    },
    hero: {
      position: 'relative',
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 88,
      overflow: 'hidden',
    },
    heroGlowLarge: {
      position: 'absolute',
      width: 240,
      height: 240,
      borderRadius: 120,
      backgroundColor: 'rgba(255,255,255,0.10)',
      top: -90,
      right: -60,
    },
    heroGlowSmall: {
      position: 'absolute',
      width: 130,
      height: 130,
      borderRadius: 65,
      backgroundColor: 'rgba(255,255,255,0.08)',
      bottom: 20,
      left: -40,
    },
    title: {
      fontSize: 24,
      color: '#FFFFFF',
      fontWeight: '700',
      marginBottom: 4,
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.76)',
      fontSize: 13,
      marginTop: 2,
    },
    contentCard: {
      marginTop: -44,
      marginHorizontal: 12,
      padding: 16,
      borderRadius: 28,
      backgroundColor: theme.colors.background,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 18,
      elevation: 8,
      gap: 14,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 10,
      gap: 8,
    },
    inputSearch: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text,
    },
    buttonSearch: {
      padding: 2,
    },
    searchIcon: {
      width: 18,
      height: 18,
      tintColor: theme.colors.text,
    },
    listCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#222' : '#F1ECFB',
    },
    imageKid: {
      width: 48,
      height: 48,
      borderRadius: 14,
    },
    informationContainer: {
      flexDirection: 'column',
      gap: 4,
      flex: 1,
    },
    kidName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    kidClass: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.7,
    },
    chevron: {
      fontSize: 20,
      color: theme.colors.text,
      opacity: 0.3,
    },
    placeholder: {
      color: isDark ? '#8E8AA5' : '#94A3B8',
    },
  });
