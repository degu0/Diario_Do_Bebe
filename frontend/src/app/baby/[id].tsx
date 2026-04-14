import { colors } from '@/constants/Colors';
import { useThemeContext } from '@/context/ThemeContext';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function AccordionSection({
  icon,
  title,
  items,
  itemIcon,
}: {
  icon: string;
  title: string;
  items: string[];
  itemIcon: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useThemeContext();
  const styles = createStyles(theme);

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={() => setExpanded(!expanded)}>
        <View style={styles.accordionLeft}>
          <Text style={styles.accordionIcon}>{icon}</Text>
          <Text style={styles.accordionTitle}>{title}</Text>
        </View>

        <View style={styles.accordionRight}>
          <View style={styles.accordionBadge}>
            <Text style={styles.accordionBadgeText}>{items.length} itens</Text>
          </View>
          <Text style={styles.accordionChevron}>{expanded ? '∧' : '∨'}</Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.accordionBody}>
          {items.map((item, index) => (
            <View key={index} style={styles.accordionItem}>
              <Text style={styles.accordionItemIcon}>{itemIcon}</Text>
              <Text style={styles.accordionItemText}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function BabyProfile() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  const { theme } = useThemeContext();
  const styles = createStyles(theme);

  const contacts = [
    { id: 1, name: 'Heloisa Santos', number: '(81) 99111-1111' },
    { id: 2, name: 'João Santos', number: '(81) 99222-2222' },
    { id: 3, name: 'Joelma Souza', number: '(81) 99333-3333' },
  ];

  const authorized = [
    { name: 'Heloisa', role: 'Mãe' },
    { name: 'João', role: 'Pai' },
    { name: 'Joelma', role: 'Avó' },
  ];

  const allergies = ['Amendoim', 'Soja', 'Ovo'];
  const medications = ['Dipirona', 'Amoxicilina', 'Loratadina'];

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 16 }}>
        <View style={styles.containerPage}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={require('@/assets/icon/arrow-left.png')} style={styles.arrowIcon} />
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Perfil da criança</Text>
        </View>

        <View style={styles.babyInformation}>
          <Image source={require('@/assets/icon/profile.png')} style={styles.babyAvatar} />

          <View style={styles.babyTexts}>
            <Text style={styles.babyName}>Maria Clara</Text>
            <Text style={styles.babyBirthday}>Aniversário: 01/01/2025</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => router.push(`/register/${id}`)}
          style={{
            backgroundColor: theme.colors.primary,
            padding: 8,
            borderRadius: 12,
            alignSelf: 'flex-start',
            marginBottom: 16,
            width: '100%',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Cadastro</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Responsáveis</Text>

        <View style={styles.containerCardResponsible}>
          <View style={[styles.card, { backgroundColor: theme.colors.secondary }]}>
            <View style={styles.cardInformation}>
              <Image
                source={require('@/assets/icon/profile.png')}
                style={styles.responsibleAvatar}
              />
              <View style={styles.information}>
                <Text style={styles.responsibleName}>Heloisa Santos</Text>
                <Text style={styles.responsibleRole}>Mãe</Text>
              </View>
            </View>
            <Text style={styles.responsiblePhone}>(81) 99111-1111</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.info }]}>
            <View style={styles.cardInformation}>
              <Image
                source={require('@/assets/icon/profile.png')}
                style={styles.responsibleAvatar}
              />
              <View style={styles.information}>
                <Text style={styles.responsibleName}>João Santos</Text>
                <Text style={styles.responsibleRole}>Pai</Text>
              </View>
            </View>
            <Text style={styles.responsiblePhone}>(81) 99222-2222</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Contato de emergência</Text>

        <View style={styles.contactList}>
          {contacts.map((item) => (
            <View key={item.id} style={styles.contactRow}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactNumber}>{item.number}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Pessoas autorizadas para buscar</Text>

        <View style={styles.authorizedRow}>
          {authorized.map((item, index) => (
            <View key={index} style={styles.authorizedCard}>
              <Text style={styles.authorizedName}>{item.name}</Text>
              <Text style={styles.authorizedRole}>{item.role}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Saúde</Text>

        <AccordionSection icon="🔥" title="Alergias" items={allergies} itemIcon="⚠️" />

        <AccordionSection icon="💊" title="Medicações" items={medications} itemIcon="🩺" />
      </View>
    </ScrollView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    containerPage: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
    },

    arrowIcon: {
      width: 24,
      height: 24,
    },

    pageTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },

    babyInformation: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginBottom: 24,
    },

    babyAvatar: {
      width: 72,
      height: 72,
      borderRadius: 22,
      backgroundColor: theme.colors.surface,
    },

    babyTexts: {
      gap: 4,
    },

    babyName: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
    },

    babyBirthday: {
      fontSize: 13,
      color: theme.colors.text,
    },

    content: {
      borderRadius: 18,
      backgroundColor: theme.colors.background,
      padding: 24,
      marginBottom: 32,
    },

    sectionTitle: {
      fontSize: 13,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      color: theme.colors.text,
      marginBottom: 12,
      marginTop: 16,
    },

    containerCardResponsible: {
      flexDirection: 'row',
      gap: 12,
    },

    card: {
      flex: 1,
      borderRadius: 14,
      padding: 12,
      gap: 10,
    },

    cardInformation: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    responsibleAvatar: {
      width: 38,
      height: 38,
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
    },

    information: {
      gap: 2,
    },

    responsibleName: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
    },

    responsibleRole: {
      fontSize: 11,
      color: theme.colors.text,
    },

    responsiblePhone: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.text,
    },

    contactList: {
      gap: 8,
    },

    contactRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
    },

    contactName: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.text,
    },

    contactNumber: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.gray,
    },

    authorizedRow: {
      flexDirection: 'row',
      gap: 8,
    },

    authorizedCard: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignItems: 'center',
      gap: 4,
    },

    authorizedName: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
    },

    authorizedRole: {
      fontSize: 11,
      color: theme.colors.text,
    },

    accordionContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      marginBottom: 8,
      overflow: 'hidden',
    },

    accordionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 14,
    },

    accordionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    accordionIcon: {
      fontSize: 16,
    },

    accordionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },

    accordionRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    accordionBadge: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 20,
    },

    accordionBadgeText: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.primary,
    },

    accordionChevron: {
      fontSize: 12,
      color: theme.colors.text,
    },

    accordionBody: {
      paddingHorizontal: 14,
      paddingBottom: 12,
      gap: 8,
    },

    accordionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    accordionItemIcon: {
      fontSize: 13,
    },

    accordionItemText: {
      fontSize: 13,
      color: theme.colors.text,
    },
  });
