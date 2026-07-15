import { IconSymbol } from '@/components/atoms/icon-symbol';
import { SectionHeader } from '@/components/molecules/section-header';
import { GoalItem, GoalsList } from '@/components/organisms/goals-list';
import { ActivityItem, WeeklyActivitiesList } from '@/components/organisms/weekly-activities-list';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TorchBottomSheetProps {
  activities: ActivityItem[];
  goals: GoalItem[];
  onToggleActivity: (id: string) => void;
}

export function TorchBottomSheet({ activities, goals, onToggleActivity }: TorchBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  // ESTADO NUEVO: Guardamos en qué posición está el canguro (Empieza en 1 que es '75%')
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);

  // Índices: 0 -> '12%' (minimizado), 1 -> '75%' (normal), 2 -> '95%' (expandido)
  const snapPoints = useMemo(() => ['7%', '75%', '95%'], []);

  // FUNCIÓN NUEVA: Qué hacer al tocar la píldora
  const handleToggleSheet = () => {
    if (currentSheetIndex === 0) {
      // Si está minimizado (0), súbelo al 75% (1)
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      // Si está arriba (1 o 2), bájalo al 12% (0)
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  // ACTUALIZADO: Ahora es TouchableOpacity y el ícono cambia dinámicamente
  const renderHandle = () => (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={handleToggleSheet} 
      style={styles.handleContainer}
    >
      <View style={styles.dragPill}>
        {/* Lógica: Si el índice es 0 (minimizado), muestra flecha arriba. Sino, flecha abajo */}
        <IconSymbol 
          name={currentSheetIndex === 0 ? "chevron.up" : "chevron.down"} 
          size={24} 
          color="#9CA3AF" 
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0} 
      snapPoints={snapPoints}
      handleComponent={renderHandle}
      backgroundStyle={styles.sheetBackground}
      // EVENTO NUEVO: Escucha cuando el usuario lo desliza con el dedo y actualiza nuestro estado
      onChange={(index) => setCurrentSheetIndex(index)}
    >
      <BottomSheetScrollView 
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Actividades de la semana" iconName="calendar" />
        <View style={styles.sectionContent}>
          <WeeklyActivitiesList activities={activities} onToggleActivity={onToggleActivity} />
        </View>

        <View style={styles.separator} />

        <SectionHeader title="Metas propuestas" iconName="target" />
        <View style={styles.sectionContent}>
          <GoalsList goals={goals} />
        </View>

      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  // Hacemos el área táctil un poco más grande para facilitar el toque del usuario
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 16, 
    paddingHorizontal: 20,
  },
  dragPill: {
    width: 48,
    height: 28,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionContent: {
    paddingLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 24,
  }
});