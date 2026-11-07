import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeContext';

export default function HomeScreen() {
  const { theme, isReady } = useTheme();

  if (!isReady) return null;

  const isDark = theme.colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0B0B14' : '#F5F5FA' }]}>
      <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#111111' }]}>نظام الطالب</Text>

      <View
        style={[
          styles.aiBar,
          {
            borderRadius: theme.cornerRadius,
            backgroundColor: theme.accentColor,
            opacity: theme.style === 'glass' ? theme.transparency / 100 : 1,
          },
        ]}
      >
        <Text style={styles.aiBarText}>
          أنا هنا أساعدك في كل حاجة: مذاكرة، تنظيم وقتك، وظبط الموبايل. ولو عايز أغيّر شكل
          النظام أو إعداداته، قولّي وأنا أعملها.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  aiBar: {
    width: '100%',
    padding: 16,
  },
  aiBarText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'right',
    lineHeight: 24,
  },
});
