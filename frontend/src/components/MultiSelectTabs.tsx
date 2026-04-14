import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  selectedValues?: string[];
  onChange?: (values: string[]) => void;
};

export default function MultiSelectTabs({
  options,
  selectedValues = [],
  onChange,
}: Props) {
  const [selected, setSelected] = useState<string[]>(selectedValues);

  function toggle(value: string) {
    let updated: string[];

    if (selected.includes(value)) {
      updated = selected.filter((item) => item !== value);
    } else {
      updated = [...selected, value];
    }

    setSelected(updated);
    onChange?.(updated);
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((item) => {
        const isActive = selected.includes(item.value);

        return (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.tab,
              isActive && styles.activeTab,
            ]}
            onPress={() => toggle(item.value)}
          >
            <Text
              style={[
                styles.text,
                isActive && styles.activeText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#1e1e1e',
  },
  activeTab: {
    backgroundColor: '#E5DBFF',
    borderColor: '#7B61FF',
  },
  text: {
    color: '#ccc',
    fontSize: 14,
  },
  activeText: {
    color: '#5B3EFF',
    fontWeight: '600',
  },
});