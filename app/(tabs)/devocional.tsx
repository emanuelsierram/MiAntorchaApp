import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function DevocionalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Mi Devocional</ThemedText>
      <ThemedText style={styles.description}>
        Esta sección contendrá tus lecturas y devocionales diarios para alimentar tu fe.
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
