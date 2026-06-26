import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ActividadesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Actividades</ThemedText>
      <ThemedText style={styles.description}>
        Revisa los próximos eventos, actividades de la iglesia y tareas asignadas.
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
