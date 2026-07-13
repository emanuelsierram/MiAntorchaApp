// Fallback for using MaterialIcons on Android and web.
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Mapeo de íconos: SF Symbols (iOS) -> Material Icons (Android/Web)
 */
const MAPPING = {
  // Íconos por defecto de Expo
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  
  // ==========================================
  // NUEVOS ÍCONOS PARA MI ANTORCHA APP
  // ==========================================
  
  // Top Navigation y Bottom Sheet
  'line.3.horizontal': 'menu',
  'info.circle.fill': 'info',
  'info.circle': 'info-outline',
  'chevron.up': 'keyboard-arrow-up',
  'chevron.down': 'keyboard-arrow-down', 

  // NUEVOS ÍCONOS PARA EL MENÚ INFERIOR (TABS)
  'book.fill': 'menu-book',
  'flame.fill': 'local-fire-department',
  'list.bullet': 'format-list-bulleted',
  
  // Organismos y UI
  'checkmark': 'check',           
  'calendar': 'calendar-today',
  'target': 'track-changes',
  
  // Metas y Actividades
  'person.fill.viewfinder': 'person-search',
  'book': 'book',
  'book.circle': 'local-library',
  'person.2.fill': 'people',
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}