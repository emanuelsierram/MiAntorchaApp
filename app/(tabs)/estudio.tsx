import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function EstudioScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Estudio Bíblico</ThemedText>
      <ThemedText style={styles.description}>
        Explora las Escrituras de manera profunda con guías de estudio personalizadas.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
});
