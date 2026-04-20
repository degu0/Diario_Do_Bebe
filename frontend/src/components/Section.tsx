import { StyleSheet, Text, View } from 'react-native';

type SectionProps = {
  title: string;
  children: React.ReactNode;
  textColor: string;
  subtitleColor: string;
  cardBg: string;
};

export function Section({ title, children, textColor, cardBg }: SectionProps) {
  return (
    <View style={[sectionStyles.card, { backgroundColor: cardBg }]}>
      <Text style={[sectionStyles.title, { color: textColor }]}>{title}</Text>
      {children}
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
});
