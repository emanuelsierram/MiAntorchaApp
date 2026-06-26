import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Icon } from '@/components/atoms/Icon';

export default function TabLayout() {
  // Barra de navegación siempre blanca por requerimiento del usuario
  const activeColor = '#000000';
  const inactiveColor = '#888888';

  const renderTabLabel = (title: string) => ({ focused, color }: { focused: boolean; color: string }) => (
    <View style={styles.labelContainer}>
      <Text style={[
        styles.labelText,
        { color, fontWeight: focused ? '600' : '500' }
      ]}>
        {title}
      </Text>
      {focused && <View style={[styles.activeIndicator, { backgroundColor: color }]} />}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#ffffff', // Forzado a blanco
          borderTopWidth: 1,
          borderTopColor: '#EEE',
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
        },
      }}>
      <Tabs.Screen
        name="devocional"
        options={{
          tabBarLabel: renderTabLabel('Mi devocional'),
          tabBarIcon: ({ color }) => (
            <Icon family="FontAwesome" name="book" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="estudio"
        options={{
          tabBarLabel: renderTabLabel('Mi Estudio Bíblico'),
          tabBarIcon: ({ color }) => (
            <Icon family="MaterialCommunityIcons" name="book-open-variant" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: renderTabLabel('Mi Antorcha'),
          tabBarIcon: ({ color }) => (
            <Icon family="MaterialCommunityIcons" name="fire" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grupo"
        options={{
          tabBarLabel: renderTabLabel('Grupo Pequeño'),
          tabBarIcon: ({ color }) => (
            <Icon family="MaterialCommunityIcons" name="home-group" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="actividades"
        options={{
          tabBarLabel: renderTabLabel('Actividades'),
          tabBarIcon: ({ color }) => (
            <Icon family="MaterialCommunityIcons" name="format-list-bulleted" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 22,
  },
  labelText: {
    fontSize: 9,
    textAlign: 'center',
    marginTop: 2,
  },
  activeIndicator: {
    height: 2,
    width: 24,
    marginTop: 3,
    borderRadius: 1,
  },
});

