/* eslint-disable import/namespace */
import React from 'react';
import * as VectorIcons from '@expo/vector-icons';

interface IconProps {
  family: keyof typeof VectorIcons;
  name: string;
  size?: number;
  color: string;
  style?: any;
}

/**
 * Componente dinámico de íconos que soporta cualquier familia de @expo/vector-icons.
 * Ejemplo de uso:
 * <Icon family="MaterialCommunityIcons" name="fire" size={24} color={color} />
 */
export function Icon({ family, name, size = 24, color, style }: IconProps) {
  const SelectedIcon = VectorIcons[family] as any;
  
  if (!SelectedIcon) {
    console.warn(`La familia de íconos "${family}" no existe en @expo/vector-icons.`);
    return null;
  }

  return <SelectedIcon name={name} size={size} color={color} style={style} />;
}
