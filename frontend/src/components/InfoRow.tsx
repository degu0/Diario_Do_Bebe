import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type InfoRowProps = {
  label: string;
  value: string;
  textColor: string;
  subtitleColor: string;
  borderColor: string;
};

export function InfoRow({ label, value, textColor, subtitleColor, borderColor }: InfoRowProps) {
  return (
    <View style={[infoRowStyles.row, { borderBottomColor: borderColor }]}>
      <Text style={[infoRowStyles.label, { color: subtitleColor }]}>{label}</Text>
      <Text style={[infoRowStyles.value, { color: textColor }]}>{value}</Text>
    </View>
  );
}

const infoRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
});