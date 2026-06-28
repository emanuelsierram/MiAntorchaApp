import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { Icon } from '@/components/atoms/Icon';

export default function TabLayout() {
  // Barra de navegación siempre blanca por requerimiento del usuario
  const activeColor = '#000000';
  const inactiveColor = '#888888';
  const insets = useSafeAreaInsets();

  // Calcular de manera dinámica y responsiva según el Safe Area de cada dispositivo
  const bottomPadding = insets.bottom > 0 ? insets.bottom : 8;
  const tabHeight = 56 + bottomPadding;

  const renderTabLabel = (title: string) => {
    const TabLabelComponent = ({ focused, color }: { focused: boolean; color: string }) => (
      <View style={styles.labelContainer}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          style={[
            styles.labelText,
            { color, fontWeight: focused ? '600' : '500' }
          ]}>
          {title}
        </Text>
        {focused && <View style={[styles.activeIndicator, { backgroundColor: color }]} />}
      </View>
    );
    TabLabelComponent.displayName = `TabLabel_${title.replace(/\s+/g, '')}`;
    return TabLabelComponent;
  };

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
          height: tabHeight,
          paddingBottom: bottomPadding,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="devocional"
        options={{
          tabBarLabel: renderTabLabel('Devocional'),
          tabBarIcon: ({ color }) => (
            <Icon family="FontAwesome" name="book" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="estudio"
        options={{
          tabBarLabel: renderTabLabel('Estudio'),
          tabBarIcon: ({ color }) => (
            <Icon family="MaterialCommunityIcons" name="book-open-variant" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: renderTabLabel('Antorcha'),
          tabBarIcon: ({ color }) => (
            <Icon family="MaterialCommunityIcons" name="fire" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grupo"
        options={{
          tabBarLabel: renderTabLabel('Grupo'),
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
    paddingHorizontal: 2,
  },
  labelText: {
    fontSize: 10,
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

