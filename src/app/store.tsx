import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { useTheme } from '@/theme/ThemeContext';

/**
 * شاشة المتجر (Store UI) لنظام NOVA OS
 * واجهة نظيفة وخفيفة، متجاوبة بالكامل مع نظام الألوان الموحد
 */
export default function StoreScreen() {
  const { palette, isReady } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isReady) return null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
  };

  return (
    <LinearGradient colors={palette.gradient} style={styles.container}>
      {/* 1. الشريط العلوي النظيف (Top Bar) مع زر عودة سلس وسريع */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}
          activeOpacity={0.75}
          onPress={() => router.back()}
          accessibilityLabel="العودة للشاشة الرئيسية"
        >
          <Ionicons name="arrow-forward" size={20} color={palette.textPrimary} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: palette.textPrimary }]}>متجر التطبيقات</Text>
          <Text style={[styles.subtitle, { color: palette.textMuted }]}>NOVA Store • 0-Data</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.iconButton,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}
          activeOpacity={0.75}
          onPress={handleRefresh}
        >
          {isRefreshing ? (
            <ActivityIndicator size="small" color={palette.accent} />
          ) : (
            <Ionicons name="refresh-outline" size={20} color={palette.textSecondary} />
          )}
        </TouchableOpacity>
      </View>

      {/* 2. تصنيفات سريعة خفيفة (Minimal Filter Tabs) */}
      <View style={styles.categoriesRow}>
        <View style={[styles.categoryPill, { backgroundColor: palette.surface, borderColor: palette.accent }]}>
          <Text style={[styles.categoryText, { color: palette.accent }]}>الكل</Text>
        </View>
        <View style={[styles.categoryPill, { backgroundColor: palette.surface, borderColor: palette.border }]}>
          <Text style={[styles.categoryText, { color: palette.textMuted }]}>الأدوات</Text>
        </View>
        <View style={[styles.categoryPill, { backgroundColor: palette.surface, borderColor: palette.border }]}>
          <Text style={[styles.categoryText, { color: palette.textMuted }]}>التعليم</Text>
        </View>
        <View style={[styles.categoryPill, { backgroundColor: palette.surface, borderColor: palette.border }]}>
          <Text style={[styles.categoryText, { color: palette.textMuted }]}>المحلية</Text>
        </View>
      </View>

      {/* 3. الحالة الفارغة في المنتصف (Empty State) مع الأيقونة التوضيحية والنص المطلوب */}
      <View style={styles.emptyContainer}>
        {/* الحاوية الهندسية للأيقونة الفارغة */}
        <View
          style={[
            styles.illustrationWrapper,
            {
              backgroundColor: palette.surface,
              borderColor: palette.borderStrong,
            },
          ]}
        >
          {/* دائرة التوهج الخلفية */}
          <View
            style={[
              styles.glowAura,
              {
                backgroundColor: palette.accentGlow || 'rgba(99, 102, 241, 0.15)',
              },
            ]}
          />

          {/* الأيقونة الفخمة للمتجر الفارغ */}
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: palette.card,
                borderColor: palette.border,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={48}
              color={palette.textPrimary}
            />
          </View>

          {/* خطوط مدارية هندسية */}
          <View
            style={[
              styles.orbitalRing,
              {
                borderColor: palette.border,
              },
            ]}
          />
        </View>

        {/* النص الدقيق المطلوب */}
        <Text style={[styles.emptyHeadline, { color: palette.textPrimary }]}>
          لا يوجد تطبيقات حالية في هذا المتجر
        </Text>

        <Text style={[styles.emptyDescription, { color: palette.textSecondary }]}>
          المستودع جاهز لاستقبال حزم وتطبيقات النظام عبر اللابتوب أو السيرفر المحلي.
        </Text>

        {/* زر العودة للشاشة الرئيسية */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: palette.accent,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Ionicons name="home-outline" size={18} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>العودة للشاشة الرئيسية</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  categoriesRow: {
    flexDirection: 'row-reverse',
    gap: 8,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  illustrationWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  glowAura: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    zIndex: 2,
  },
  orbitalRing: {
    position: 'absolute',
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 1,
    borderStyle: 'dashed',
    zIndex: 1,
  },
  emptyHeadline: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
    maxWidth: 280,
  },
  actionButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
