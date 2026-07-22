import { CircularIcon } from '@/components/atoms/circular-icon';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FormHeaderProps {
  title?: string;
}

export function FormHeader({ title = "Agregar un estudio bíblico" }: FormHeaderProps) {
    const tintColor = useThemeColor({}, 'tint');

  return (
    <View style={styles.container}>
      <CircularIcon 
        name="book.fill" 
        size={18} 
        iconColor="#FFFFFF" 
        backgroundColor={tintColor}
        style={styles.icon}
      />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 8, // Cuadrado redondeado
    marginRight: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  }
});
