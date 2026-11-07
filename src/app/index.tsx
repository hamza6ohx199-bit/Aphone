import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { THEME_PROFILES } from '@/theme/defaultThemes';
import { useTheme } from '@/theme/ThemeContext';
import { ThemeMode } from '@/theme/types';

const MODES: ThemeMode[] = ['dark', 'vibrant', 'simple'];

export default function HomeScreen() {
  const { theme, palette, isReady, setColorMode } = useTheme();

  if (!isReady) return null;

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <Text style={[styles.title, { color: palette.textPrimary }]}>نظام الطالب</Text>

      <View
        style={[
          styles.aiBar,
          {
            borderRadius: theme.cornerRadius,
            backgroundColor: palette.aiSectionBg,
            borderColor: palette.aiSection,
            opacity: theme.style === 'glass' ? theme.transparency / 100 : 1,
          },
        ]}
      >
        <Text style={[styles.aiBarText, { color: palette.textPrimary }]}>
          أنا هنا أساعدك في كل حاجة: مذاكرة، تنظيم وقتك، وظبط الموبايل. ولو عايز أغيّر شكل
          النظام أو إعداداته، قولّي وأنا أعملها.
        </Text>
      </View>

      {/* شريط اختيار ستايل الغرفة */}
      <View style={[styles.switcherBar, { backgroundColor: palette.switcherBg, borderColor: palette.border }]}>
        <Text style={[styles.sectionTitle, { color: palette.textPrimary }]}>اختار ستايل الغرفة:</Text>
        <View style={styles.buttonRow}>
          {MODES.map((mode) => {
            const swatch = THEME_PROFILES[mode];
            const isSelected = theme.colorMode === mode;
            return (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.themeBtn,
                  {
                    backgroundColor: isSelected ? palette.switcherActive : 'transparent',
                    borderColor: isSelected ? swatch.accent : palette.border,
                  },
                ]}
                onPress={() => setColorMode(mode)}
              >
                <View style={[styles.swatchDot, { backgroundColor: swatch.background, borderColor: swatch.border }]} />
                <Text
                  style={{
                    color: isSelected ? palette.switcherTextActive : palette.switcherTextInactive,
                    fontWeight: isSelected ? 'bold' : '500',
                    fontSize: 13,
                  }}
                >
                  {swatch.badge}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={[styles.modeDescription, { color: palette.textMuted }]}>{palette.description}</Text>
      </View>

      {/* عناصر الغرفة الخارجية (Room Hub) */}
      <ScrollView contentContainerStyle={styles.roomGrid}>
        <View style={[styles.roomCard, { backgroundColor: palette.aiSectionBg, borderColor: palette.border }]}>
          <Text style={[styles.cardHeader, { color: palette.aiSection }]}>الشاشة الرئيسية</Text>
          <Text style={[styles.cardSub, { color: palette.textSecondary }]}>التطبيقات والأدوات السريعة</Text>
        </View>

        <View style={[styles.roomCard, { backgroundColor: palette.studySectionBg, borderColor: palette.border }]}>
          <Text style={[styles.cardHeader, { color: palette.studySection }]}>المذاكرة</Text>
          <Text style={[styles.cardSub, { color: palette.textSecondary }]}>جدول المواد وخطة المراجعة</Text>
        </View>

        <View style={[styles.roomCard, { backgroundColor: palette.tasksSectionBg, borderColor: palette.border }]}>
          <Text style={[styles.cardHeader, { color: palette.tasksSection }]}>المهام</Text>
          <Text style={[styles.cardSub, { color: palette.textSecondary }]}>التذكيرات والواجبات</Text>
        </View>

        <View style={[styles.roomCard, { backgroundColor: palette.subjectsSectionBg, borderColor: palette.border }]}>
          <Text style={[styles.cardHeader, { color: palette.subjectsSection }]}>المواد الدراسية</Text>
          <Text style={[styles.cardSub, { color: palette.textSecondary }]}>كل مادة وملفاتها</Text>
        </View>

        <View style={[styles.roomCard, { backgroundColor: palette.appsSectionBg, borderColor: palette.border }]}>
          <Text style={[styles.cardHeader, { color: palette.appsSection }]}>مساحة العمل</Text>
          <Text style={[styles.cardSub, { color: palette.textSecondary }]}>إدارة الملفات والإعدادات</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  aiBar: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
  },
  aiBarText: {
    fontSize: 16,
    textAlign: 'right',
    lineHeight: 24,
  },
  switcherBar: { padding: 14, borderRadius: 16, borderWidth: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12, textAlign: 'right' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  themeBtn: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchDot: { width: 12, height: 12, borderRadius: 6, borderWidth: 1 },
  modeDescription: { fontSize: 12, textAlign: 'right', marginTop: 10, lineHeight: 18 },
  roomGrid: { gap: 16 },
  roomCard: { padding: 20, borderRadius: 18, borderWidth: 1, minHeight: 100, justifyContent: 'center' },
  cardHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 6, textAlign: 'right' },
  cardSub: { fontSize: 14, textAlign: 'right' },
});
