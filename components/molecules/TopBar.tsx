import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../atoms/Icon';

export interface TopBarProps {
  title: string;
  onMenuPress: () => void;
}

export function TopBar({ title, onMenuPress }: TopBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <TouchableOpacity
        onPress={onMenuPress}
        style={styles.menuButton}
        activeOpacity={0.7}
      >
        <Icon family="MaterialCommunityIcons" name="menu" size={26} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    zIndex: 10,
  },
  menuButton: {
    padding: 6,
    marginLeft: -6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 0.5,
  },
  rightPlaceholder: {
    width: 38, // Para equilibrar visualmente con el botón de menú
  },
});
