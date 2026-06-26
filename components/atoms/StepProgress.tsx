import React from 'react';
import { DimensionValue, StyleSheet, View } from 'react-native';

export interface StepProgressProps {
  current: number; // 0 a total
  total?: number;
}

export function StepProgress({ current, total = 5 }: StepProgressProps) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  // Calcular el progreso de la línea activa
  // Si current es 0, no hay progreso. Si es 1, llega al primer nodo (0%). Si es total, llega al 100%.
  const progressPercent: DimensionValue = 
    current <= 0 ? '0%' :
    total > 1 ? `${Math.min(100, Math.max(0, ((current - 1) / (total - 1)) * 100))}%` : '0%';

  return (
    <View style={styles.container}>
      {/* Línea de fondo inactiva */}
      <View style={styles.backgroundLine} />

      {/* Línea de progreso activa */}
      {current > 0 && <View style={[styles.activeLine, { width: progressPercent }]} />}

      {/* Nodos de progreso */}
      <View style={styles.nodesContainer}>
        {steps.map((step) => {
          const isActive = step <= current;
          return (
            <View
              key={step}
              style={[
                styles.node,
                isActive ? styles.nodeActive : styles.nodeInactive,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 16,
    justifyContent: 'center',
    marginVertical: 6,
    position: 'relative',
    width: '100%',
  },
  backgroundLine: {
    height: 2,
    backgroundColor: '#d6e4ff',
    position: 'absolute',
    left: 4,
    right: 4,
  },
  activeLine: {
    height: 2,
    backgroundColor: '#1b8edb',
    position: 'absolute',
    left: 4,
  },
  nodesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  node: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  nodeActive: {
    backgroundColor: '#1b8edb',
  },
  nodeInactive: {
    backgroundColor: '#d6e4ff',
  },
});
