import { IconSymbol } from '@/components/atoms/icon-symbol';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Checkbox({ checked, onPress, style }: CheckboxProps) {
  const tintColor = useThemeColor({}, 'tint');
  
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onPress} 
      style={[
        styles.container, 
        checked ? { backgroundColor: tintColor, borderColor: tintColor } : styles.unchecked,
        style
      ]}
    >
      {checked && <IconSymbol name="checkmark" size={16} color="#FFFFFF" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unchecked: {
    backgroundColor: 'transparent',
    borderColor: '#D1D5DB',
  }
});