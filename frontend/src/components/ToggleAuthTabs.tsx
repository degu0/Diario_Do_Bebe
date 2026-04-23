import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';

type Props = {
  active: 'signin' | 'signup';
  onChange: (tab: 'signin' | 'signup') => void;
};

export default function ToggleAuthTabs({ active, onChange }: Props) {
  const { theme } = useThemeContext();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, active === 'signin' && styles.activeTab]}
        onPress={() => onChange('signin')}
      >
        <Text style={[styles.text, active === 'signin' && styles.activeText]}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, active === 'signup' && styles.activeTab]}
        onPress={() => onChange('signup')}
      >
        <Text style={[styles.text, active === 'signup' && styles.activeText]}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.grayLight,
      borderRadius: 10,
      padding: 5,
    },

    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 8,
    },

    activeTab: {
      backgroundColor: theme.colors.surface,
      shadowColor: theme.colors.grayDark,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },

    text: {
      fontSize: 14,
      color: theme.colors.gray,
      fontFamily: 'Nunito_600SemiBold',
    },

    activeText: {
      color: theme.colors.text,
      fontFamily: 'Nunito_600SemiBold',
    },
  });
