import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ThemedText } from '@/components/atoms/themed-text';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TopNavBarProps {
  title: string;
  onInfoPress?: () => void;
  onMenuPress?: () => void;
  // Nuevas props para controlar la visibilidad (Abierto a la extensión)
  showInfoIcon?: boolean;
  showMenuIcon?: boolean;
}

export function TopNavBar({ 
  title, 
  onInfoPress, 
  onMenuPress,
  // Valores por defecto para mantener retrocompatibilidad
  showInfoIcon = true,
  showMenuIcon = true
}: TopNavBarProps) {
  
  return (
    <View style={styles.container}>
      {/* Sección Izquierda: Título + Ícono Info */}
      <View style={styles.leftSection}>
        <ThemedText style={styles.title} type="title">
          {title}
        </ThemedText>
        
        {/* Renderizado Condicional del Átomo/Molécula */}
        {showInfoIcon && (
          <TouchableOpacity onPress={onInfoPress} style={styles.infoButton} activeOpacity={0.7}>
            <IconSymbol name="info.circle.fill" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Sección Derecha: Menú Hamburguesa */}
      {/* Renderizado Condicional del Átomo/Molécula */}
      {showMenuIcon && (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton} activeOpacity={0.7}>
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
    paddingTop: 60, // Espacio seguro para el notch/barra de estado
    paddingBottom: 20,
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