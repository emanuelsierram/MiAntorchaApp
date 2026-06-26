import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function GrupoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Grupo Pequeño</ThemedText>
      <ThemedText style={styles.description}>
        Conéctate con tu comunidad, comparte peticiones de oración y apóyense mutuamente.
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
