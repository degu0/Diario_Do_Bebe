import { StyleSheet, Text, View } from 'react-native';
import { typeConfig } from '../utils/typeConfig';

type CardDateSpecialType = {
  date: string;
  title: string;
  timeStart: string;
  timeEnd: string;
  type: 'reunion' | 'holiday' | 'no_class' | 'tour';
  location: string;
};

export function CardDateSpecial({
  date,
  title,
  timeStart,
  timeEnd,
  type,
  location,
}: CardDateSpecialType) {
  const config = typeConfig[type];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: config.bg, borderBottomColor: config.border },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.description}>
        <View style={styles.descriptionItem}>
          <Text style={styles.icon}>📅</Text>
          <Text style={styles.descriptionText}>{date}</Text>
        </View>
        <View style={styles.descriptionItem}>
          <Text style={styles.icon}>🕐</Text>
          <Text style={styles.descriptionText}>
            {timeStart} - {timeEnd}
          </Text>
        </View>
        <Text style={styles.descriptionText}>{location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: '100%',
    padding: 16,
    borderBottomWidth: 4,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d2d2d',
    marginBottom: 10,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  descriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    fontSize: 13,
  },
  descriptionText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
});
