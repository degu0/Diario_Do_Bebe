import { useThemeContext } from '@/context/ThemeContext';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
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
  const { theme } = useThemeContext();
  const styles = createStyles(theme);
  const [search, setSearch] = useState('');
  const [filteredKids, setFilteredKids] = useState(kids);
  const route = useRoute();

  const handleSearch = (text: string) => {
    setSearch(text);
    const newData = kids.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredKids(newData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputSearch}
            placeholder="Pesquisa..."
            placeholderTextColor={theme.colors.text}
            value={search}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.buttonSearch}>
            <Image source={require('@/assets/icon/search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {filteredKids.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => router.navigate(`/baby/${item.id}`)}
            >
              <Image source={item.image} style={styles.imageKid} />
              <View style={styles.informationContainer}>
                <Text style={styles.kidName}>{item.name}</Text>
                <Text style={styles.kidClass}>{item.class}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginBottom: 16,
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
    content: {
      flex: 1,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      backgroundColor: theme.colors.surface,
      marginBottom: 10,
      borderRadius: 16,
      padding: 14,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      cursor: 'pointer',
    },
    imageKid: {
      width: 48,
      height: 48,
      borderRadius: 14,
    },
    informationContainer: {
      flexDirection: 'column',
      gap: 4,
    },
    kidName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    kidClass: {
      fontSize: 12,
      color: theme.colors.text,
    },
  });
