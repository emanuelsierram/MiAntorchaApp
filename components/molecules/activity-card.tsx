import { Checkbox } from '@/components/atoms/checkbox';
import { CircularIcon } from '@/components/atoms/circular-icon';
import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ThemedText } from '@/components/atoms/themed-text';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface ActivityCardProps {
  title: string;
  isCompleted: boolean;
  onToggle: () => void;
  actionIconName: React.ComponentProps<typeof IconSymbol>['name'];
}

export function ActivityCard({ title, isCompleted, onToggle, actionIconName }: ActivityCardProps) {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onToggle} 
      style={styles.cardContainer}
    >
      <Checkbox 
        checked={isCompleted} 
        onPress={onToggle} 
        style={styles.checkbox} 
      />
      
      <ThemedText style={styles.title} type="default">
        {title}
      </ThemedText>
      
      <CircularIcon 
        name={actionIconName} 
        size={20} 
        iconColor={tintColor} 
        backgroundColor="#F0F8FF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  title: {
    flex: 1,
    color: '#374151',
  }
});