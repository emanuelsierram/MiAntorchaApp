import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { SessionService } from '@/src/services/session.service';
import { AlertProvider } from '@/src/context/alert-context';

export const unstable_settings = {
  initialRouteName: '(tabs)', 
};

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      try {
        const token = await SessionService.getToken();
        const loggedIn = !!token;
        
        const inLogin = segments[0] === 'login';

        if (!loggedIn && !inLogin) {
          // Redirigir a login si no está autenticado
          router.replace('/login');
        } else if (loggedIn && inLogin) {
          // Redirigir a tabs si ya está autenticado y está en login
          router.replace('/(tabs)');
        }
      } catch (e) {
        console.error("Error al validar sesión:", e);
      } finally {
        setIsReady(true);
      }
    }
    checkSession();
  }, [segments]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#4A69BD" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AlertProvider>
          <AppContent />
        </AlertProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}