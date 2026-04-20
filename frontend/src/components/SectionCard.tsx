import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type SectionCardProps = {
  title: string;
  subtitle?: string;
  titleColor: string;
  subtitleColor: string;
  children: ReactNode;
};

export function SectionCard({
  title,
  subtitle,
  titleColor,
  subtitleColor,
  children,
}: SectionCardProps) {
  return (
    <View style={sharedStyles.sectionCard}>
      <View style={sharedStyles.sectionHeader}>
        <Text style={[sharedStyles.sectionTitle, { color: titleColor }]}>{title}</Text>
        {subtitle ? (
          <Text style={[sharedStyles.sectionSubtitle, { color: subtitleColor }]}>{subtitle}</Text>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const sharedStyles = StyleSheet.create({
  sectionCard: {
    gap: 16,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
});
