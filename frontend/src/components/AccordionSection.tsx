import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function AccordionSection({
  icon,
  title,
  items,
  itemIcon,
  titleColor,
  subtitleColor,
  backgroundColor,
  badgeBackground,
  badgeTextColor,
}: {
  icon: string;
  title: string;
  items: string[];
  itemIcon: string;
  titleColor: string;
  subtitleColor: string;
  backgroundColor: string;
  badgeBackground: string;
  badgeTextColor: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const styles = accordionStyles;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <View style={styles.left}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        </View>

        <View style={styles.right}>
          <View style={[styles.badge, { backgroundColor: badgeBackground }]}>
            <Text style={[styles.badgeText, { color: badgeTextColor }]}>{items.length} itens</Text>
          </View>
          <Text style={[styles.chevron, { color: subtitleColor }]}>{expanded ? '︿' : '﹀'}</Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.body}>
          {items.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={[styles.itemIcon, { color: titleColor }]}>{itemIcon}</Text>
              <Text style={[styles.itemText, { color: titleColor }]}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const accordionStyles = StyleSheet.create({
  container: {
    borderRadius: 18,
    marginBottom: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  chevron: {
    fontSize: 12,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemIcon: {
    fontSize: 14,
  },
  itemText: {
    fontSize: 13,
  },
});
