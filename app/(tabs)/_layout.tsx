import { IconSymbol } from '@/components/atoms/icon-symbol';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Un poco de sombra extra en iOS
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          default: {
            elevation: 10,
          },
        }),
      }}>
      
      {/* 1. Tab: Mi Estudio Bíblico */}
      <Tabs.Screen
        name="estudio"
        options={{
          title: 'Estudio Bíblico',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="book.fill" color={color} />,
        }}
      />
      
      {/* 2. Tab: Mi Antorcha (Nuestro archivo index.tsx principal) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mi Antorcha',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="flame.fill" color={color} />,
        }}
      />
      
      {/* 3. Tab: Actividades */}
      <Tabs.Screen
        name="actividades"
        options={{
          title: 'Actividades',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="list.bullet" color={color} />,
        }}
      />
    </Tabs>
  );
}