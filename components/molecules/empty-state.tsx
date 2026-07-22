import { CircularIcon } from '@/components/atoms/circular-icon';
import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ThemedText } from '@/components/atoms/themed-text';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  iconName?: React.ComponentProps<typeof IconSymbol>['name'];
}

export function EmptyState({
  title = 'Aún no tienes estudios bíblicos',
  subtitle = 'Registra tu primer alumno y comienza en la obra del Señor',
  iconName = 'book.fill'
}: EmptyStateProps) {
  const tintColor = useThemeColor({}, 'tint');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? 'rgba(59, 130, 246, 0.08)' : '#EEF2FF';
  const cardBorder = isDark ? 'rgba(59, 130, 246, 0.2)' : '#E0E7FF';
  const iconBg = isDark ? 'rgba(59, 130, 246, 0.15)' : '#E0E7FF';
  const titleColor = isDark ? '#F8FAFC' : '#1E293B';
  const subtitleColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <View style={[styles.cardContainer, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      <CircularIcon
        name={iconName}
        size={28}
        iconColor={tintColor}
        backgroundColor={iconBg}
        style={styles.icon}
      />
      <ThemedText style={[styles.titleText, { color: titleColor }]}>{title}</ThemedText>
      <ThemedText style={[styles.subtitleText, { color: subtitleColor }]}>{subtitle}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    borderWidth: 1,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  }
});
