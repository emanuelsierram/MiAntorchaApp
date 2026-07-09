import { CircularIcon } from '@/components/atoms/circular-icon';
import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ProgressBar } from '@/components/atoms/progress-bar';
import { ThemedText } from '@/components/atoms/themed-text';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface GoalProgressRowProps {
  title: string;
  iconName: React.ComponentProps<typeof IconSymbol>['name'];
  currentValue: number;
  totalValue: number;
}

export function GoalProgressRow({ title, iconName, currentValue, totalValue }: GoalProgressRowProps) {
  const tintColor = useThemeColor({}, 'tint');
  const percentage = totalValue > 0 ? Math.round((currentValue / totalValue) * 100) : 0;

  return (
    <View style={styles.container}>
      <CircularIcon 
        name={iconName} 
        size={24} 
        iconColor={tintColor} 
        backgroundColor="#F0F8FF" 
        style={styles.icon}
      />
      
      <View style={styles.contentContainer}>
        {/* Título y fracción (1 / 5) */}
        <View style={styles.headerRow}>
          <ThemedText style={styles.title} type="defaultSemiBold">
            {title}
          </ThemedText>
          <ThemedText style={styles.ratioText}>
            {`${currentValue} / ${totalValue}`}
          </ThemedText>
        </View>
        
        {/* Barra de progreso */}
        <View style={styles.progressRow}>
          <ProgressBar 
            progress={percentage} 
            fillColor={tintColor} 
            style={styles.progressBar} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 16,
    borderRadius: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    color: '#11181C',
  },
  ratioText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    marginRight: 12,
  }
});