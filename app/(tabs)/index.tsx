import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { GoalItem } from '@/components/organisms/goals-list';
import { TopNavBar } from '@/components/organisms/top-nav-bar';
import { ActivityItem } from '@/components/organisms/weekly-activities-list';
import { TorchBottomSheet } from '@/components/templates/torch-bottom-sheet';
import { ThemedView } from '@/components/themed-view';

import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const tintColor = Colors[colorScheme].tint; 

  // MOCKS
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 'act-1', dayName: 'Domingo', dayShort: 'DOM', title: 'Visitar un enfermo', isCompleted: true, iconName: 'person.fill.viewfinder' },
    { id: 'act-2', dayName: 'Domingo', dayShort: 'DOM', title: 'Visitar un enfermo', isCompleted: true, iconName: 'person.fill.viewfinder' },
    { id: 'act-3', dayName: 'Domingo', dayShort: 'DOM', title: 'Visitar un enfermo', isCompleted: true, iconName: 'person.fill.viewfinder' },
    { id: 'act-4', dayName: 'Lunes', dayShort: 'LUN', title: 'Repartir literaturas', isCompleted: false, iconName: 'book' },
    { id: 'act-5', dayName: 'Miércoles', dayShort: 'MIÉ', title: 'Estudio bíblico', isCompleted: false, iconName: 'book.circle' },
  ]);

  const [goals] = useState<GoalItem[]>([
    { id: 'goal-1', title: 'Estudios Bíblicos completados', iconName: 'book.circle', currentValue: 1, totalValue: 5 },
    { id: 'goal-2', title: 'Visitas a amigos de esperanza', iconName: 'person.2.fill', currentValue: 3, totalValue: 5 },
    { id: 'goal-3', title: 'Visitas a amigos de esperanza', iconName: 'person.2.fill', currentValue: 3, totalValue: 5 },
  ]);

  const handleToggleActivity = (id: string) => {
    setActivities((prev) => prev.map((act) => act.id === id ? { ...act, isCompleted: !act.isCompleted } : act));
  };

  return (
    <ThemedView style={[styles.mainContainer, { backgroundColor: tintColor }]}>
      <StatusBar barStyle="light-content" />

      {/* FONDO LOTTIE ANIMADO */}
      <LottieView
        source={require('@/assets/animations/moon-night-sky.json')}
        autoPlay
        loop
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject} // Esto hace que ocupe todo el fondo y se posicione absolutamente
      />
      
      {/* SECCIÓN SUPERIOR AZUL: Solo el TopNavBar como en el mockup original */}
      <TopNavBar 
        title=""
        showInfoIcon={false}
        onMenuPress={() => console.log('Menú presionado')}
      />

      {/* EL CANGURO FLOTANTE (Bottom Sheet) */}
      <TorchBottomSheet 
        activities={activities}
        goals={goals}
        onToggleActivity={handleToggleActivity}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Ocupa toda la pantalla, el BottomSheet flotará por encima
    // position: 'relative', // ThemedView por defecto tiene position relative en React Native, por lo que absoluteFillObject funcionará bien
  }
});