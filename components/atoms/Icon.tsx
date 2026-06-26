import React from 'react';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native';

export type IconFamily = 'FontAwesome' | 'MaterialIcons' | 'MaterialCommunityIcons';

export interface IconProps {
  family?: IconFamily;
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function Icon({
  family = 'FontAwesome',
  name,
  size = 20,
  color = '#666',
  style,
}: IconProps) {
  if (family === 'MaterialIcons') {
    return <MaterialIcons name={name as any} size={size} color={color} style={style} />;
  }
  if (family === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons name={name as any} size={size} color={color} style={style} />;
  }
  return <FontAwesome name={name as any} size={size} color={color} style={style} />;
}

