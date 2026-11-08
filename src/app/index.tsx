import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PAGE_COUNT = 2;

export default function HomeScreen() {
  const { palette, isReady } = useTheme();
  const [activePage, setActivePage] = useState(0);

  if (!isReady) return null;

  const onMomentumScrollEnd = (e: { nativeEvent: { contentOffset: { x: number } } }) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActivePage(Math.min(Math.max(page, 0), PAGE_COUNT - 1));
  };

  return (
    <LinearGradient colors={palette.gradient} style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={styles.pager}
      >
        {/* الصفحة الأولى: البحث + المتجر */}
        <View style={[styles.page, { width: SCREEN_WIDTH }]}>
          <View style={[styles.searchBar, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <View style={[styles.googleLogo, { backgroundColor: palette.card }]}>
              <Text style={styles.googleLogoText}>G</Text>
            </View>
            <Text style={[styles.searchPlaceholder, { color: palette.textMuted }]}>بحث</Text>
            <View style={styles.searchRightIcons}>
              <Ionicons name="mic" size={18} color={palette.textSecondary} />
              <Ionicons name="camera-outline" size={18} color={palette.textSecondary} />
            </View>
          </View>

          <View style={styles.appArea}>
            <TouchableOpacity
              style={styles.appTile}
              activeOpacity={0.7}
              onPress={() => router.push('/store' as Parameters<typeof router.push>[0])}
            >
              <View style={[styles.appIconWrap, { backgroundColor: palette.accent }]}>
                <Ionicons name="storefront" size={28} color="#FFFFFF" />
              </View>
              <Text style={[styles.appLabel, { color: palette.textPrimary }]}>المتجر</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* الصفحة الثانية: فاضية جاهزة لتطبيقات جديدة */}
        <View style={[styles.page, { width: SCREEN_WIDTH }]} />
      </ScrollView>

      <View style={styles.pageDots}>
        {Array.from({ length: PAGE_COUNT }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activePage ? palette.textPrimary : palette.textMuted },
              i === activePage && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 48 },
  pager: { flex: 1 },
  page: { paddingHorizontal: 16, gap: 24 },
  searchBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 28,
    borderWidth: 1,
  },
  googleLogo: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  googleLogoText: { fontSize: 15, fontWeight: 'bold', color: '#4285F4' },
  searchPlaceholder: { flex: 1, fontSize: 14 },
  searchRightIcons: { flexDirection: 'row-reverse', gap: 14, paddingHorizontal: 4 },

  appArea: { paddingTop: 24 },
  appTile: { width: 72, alignItems: 'center', gap: 6 },
  appIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appLabel: { fontSize: 12 },

  pageDots: { flexDirection: 'row', justifyContent: 'center', gap: 6, paddingVertical: 16 },
  dot: { width: 6, height: 6, borderRadius: 3, opacity: 0.4 },
  dotActive: { opacity: 1, width: 14 },
});
