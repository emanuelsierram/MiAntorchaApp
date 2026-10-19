import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ThemedText } from '@/components/atoms/themed-text';
import { useMenu } from '@/src/context/menu-context';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TopNavBarProps {
  title: string;
  onLeftIconPress?: () => void;
  onMenuPress?: () => void;
  showLeftIcon?: boolean;
  showMenuIcon?: boolean;
  leftIconSymbolName?: React.ComponentProps<typeof IconSymbol>['name'];
}

export function TopNavBar({
  title,
  onLeftIconPress,
  onMenuPress,
  showLeftIcon = false,
  showMenuIcon = true,
  leftIconSymbolName = 'chevron.left'
}: TopNavBarProps) {
  const { showMenu } = useMenu();

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      showMenu();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showLeftIcon && (
          <TouchableOpacity onPress={onLeftIconPress} style={styles.backButton} activeOpacity={0.7}>
            <IconSymbol name={leftIconSymbolName} size={22} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        <ThemedText style={styles.title} type="title">
          {title}
        </ThemedText>
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
    gap: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
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