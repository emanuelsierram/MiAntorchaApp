import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ThemedText } from '@/components/atoms/themed-text';
import { useSettings } from '@/src/context/settings-context';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TopNavBarProps {
  title: string;
  onInfoPress?: () => void;
  onMenuPress?: () => void;
  showInfoIcon?: boolean;
  showMenuIcon?: boolean;
}

export function TopNavBar({
  title,
  onInfoPress,
  onMenuPress,
  showInfoIcon = true,
  showMenuIcon = true
}: TopNavBarProps) {
  const { showSettings } = useSettings();

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      showSettings();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <ThemedText style={styles.title} type="title">
          {title}
        </ThemedText>

        {showInfoIcon && (
          <TouchableOpacity onPress={onInfoPress} style={styles.infoButton} activeOpacity={0.7}>
            <IconSymbol name="info.circle.fill" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {showMenuIcon && (
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton} activeOpacity={0.7}>
          <IconSymbol name="line.3.horizontal" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 99,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoButton: {
    padding: 4,
    marginTop: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});