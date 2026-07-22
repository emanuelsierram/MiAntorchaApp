import { CircularIcon } from '@/components/atoms/circular-icon';
import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ThemedText } from '@/components/atoms/themed-text';
import { useThemeColor } from '@/src/hooks/use-theme-color';
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

  return (
    <View style={styles.cardContainer}>
      <CircularIcon
        name={iconName}
        size={28}
        iconColor={tintColor}
        backgroundColor="#E0E7FF"
        style={styles.icon}
      />
      <ThemedText style={styles.titleText}>{title}</ThemedText>
      <ThemedText style={styles.subtitleText}>{subtitle}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#EEF2FF',
    borderRadius: 24,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E0E7FF',
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
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  }
});
