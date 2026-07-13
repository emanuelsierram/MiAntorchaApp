import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ThemedText } from '@/components/atoms/themed-text';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  iconName: React.ComponentProps<typeof IconSymbol>['name'];
  rightIconName?: React.ComponentProps<typeof IconSymbol>['name'];
  onRightIconPress?: () => void;
}

export function SectionHeader({ title, iconName, rightIconName, onRightIconPress }: SectionHeaderProps) {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, { backgroundColor: tintColor }]}>
        <IconSymbol name={iconName} size={20} color="#FFFFFF" />
      </View>
      
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      
      {rightIconName && (
        <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress} style={styles.rightIcon}>
          <IconSymbol name={rightIconName} size={24} color="#374151" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
  rightIcon: {
    padding: 4,
  }
});