import { CircularIcon } from '@/components/atoms/circular-icon';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export function EmptyState({ 
  title = "Aún no tienes estudios bíblicos", 
  subtitle = "Registra tu primer alumno y comienza en la obra del Señor" 
}: EmptyStateProps) {
  return (
    <View style={styles.cardContainer}>
      <CircularIcon 
        name="book.fill" 
        size={28} 
        iconColor="#1450B8" 
        backgroundColor="#E0E7FF" 
        style={styles.icon}
      />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#EEF2FF', // Azul claro translúcido
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 28, // Completamente circular
    marginBottom: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  }
});
