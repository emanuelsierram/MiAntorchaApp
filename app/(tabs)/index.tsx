import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';

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

      {/* 1. CAPA 1 (Fondo): LOTTIE ANIMADO */}
      <LottieView
        source={require('@/assets/animations/moon-night-sky.json')}
        autoPlay
        loop
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />

      {/* 2. CAPA 2 (Medio): COMPOSICIÓN DE LA ANTORCHA (Mango + Fuego) */}
      {/* pointerEvents="none" evita que la imagen bloquee los toques a la pantalla */}
      <View style={styles.torchWrapper} pointerEvents="none">
        <Image 
          source={require('@/assets/images/torch-handle.webp')} 
          style={styles.torchHandle}
          resizeMode="contain" 
        />
        
        {/* Lottie del fuego posicionado en la punta del mango */}
        <LottieView
          source={require('@/assets/animations/fire.json')} // Asegúrate de tener este archivo
          autoPlay
          loop
          style={styles.torchFire}
        />
      </View>
      
      {/* 3. CAPA 3 (Arriba): INTERFAZ DE USUARIO */}
      <TopNavBar 
        title=""
        showInfoIcon={false}
        onMenuPress={() => console.log('Menú presionado')}
      />

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
    flex: 1,
  },
  // Contenedor que agrupa el mango y el fuego
  torchWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '2%',
    alignItems: 'center', // Asegura que el fuego y el mango estén centrados entre sí
  },
  torchHandle: {
    width: 350,          // Tamaño ajustado para pantallas móviles reales
    height: 450,   
    top: 10, 
    marginLeft: 10     
  },
  torchFire: {
    position: 'absolute',
    top: -205, // Valor negativo para que el fuego "suba" y se pose en la punta del mango
    width: 280,
    height: 280,
  }
});