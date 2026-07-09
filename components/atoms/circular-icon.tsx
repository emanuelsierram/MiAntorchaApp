import { IconSymbol } from '@/components/atoms/icon-symbol';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface CircularIconProps {
  name: React.ComponentProps<typeof IconSymbol>['name'];
  size?: number;
  iconColor: string;
  backgroundColor: string;
  style?: StyleProp<ViewStyle>;
}

export function CircularIcon({ 
  name, 
  size = 20, 
  iconColor, 
  backgroundColor, 
  style 
}: CircularIconProps) {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <IconSymbol name={name} size={size} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
});