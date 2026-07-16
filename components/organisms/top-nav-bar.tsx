import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ThemedText } from '@/components/atoms/themed-text';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TopNavBarProps {
  title: string;
  onInfoPress?: () => void;
  onMenuPress?: () => void;
}

export function TopNavBar({ title, onInfoPress, onMenuPress }: TopNavBarProps) {
  return (
    <View style={styles.container}>
      {/* Sección Izquierda: Título + Ícono Info */}
      <View style={styles.leftSection}>
        <ThemedText style={styles.title} type="title">
          {title}
        </ThemedText>
        <TouchableOpacity onPress={onInfoPress} style={styles.infoButton} activeOpacity={0.7}>
          {/* Usamos el ícono relleno para que se parezca al del mockup */}
          <IconSymbol name="info.circle.fill" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Sección Derecha: Menú Hamburguesa */}
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton} activeOpacity={0.7}>
        <IconSymbol name="line.3.horizontal" size={20} color="#FFFFFF" />
      </TouchableOpacity>
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
    borderRadius: 20, // Lo hace perfectamente circular
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Fondo translúcido blanco
    alignItems: 'center',
    justifyContent: 'center',
  }
});