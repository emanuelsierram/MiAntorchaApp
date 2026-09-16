import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeSetting = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  themeSetting: ThemeSetting;
  colorScheme: 'light' | 'dark';
  setThemeSetting: (setting: ThemeSetting) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_preference';

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeSetting, setThemeSettingState] = useState<ThemeSetting>('system');
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  // Cargar preferencia guardada al iniciar
  useEffect(() => {
    async function loadThemePreference() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
          setThemeSettingState(savedTheme);
        }
      } catch (e) {
        console.error('Error cargando preferencia de tema:', e);
      }
    }
    loadThemePreference();
  }, []);

  // Escuchar cambios en el tema del sistema
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const setThemeSetting = async (setting: ThemeSetting) => {
    try {
      setThemeSettingState(setting);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, setting);
    } catch (e) {
      console.error('Error guardando preferencia de tema:', e);
    }
  };

  // Resolver el colorScheme actual ('light' | 'dark')
  const colorScheme = themeSetting === 'system' 
    ? (systemScheme ?? 'light') 
    : themeSetting;

  return (
    <ThemeContext.Provider value={{ themeSetting, colorScheme, setThemeSetting }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useCustomTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCustomTheme debe ser utilizado dentro de un CustomThemeProvider');
  }
  return context;
}
