import React, { createContext, useContext, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useCustomTheme, ThemeSetting } from '@/src/context/theme-context';
import { useAlert } from '@/src/context/alert-context';
import { SessionService } from '@/src/services/session.service';
import { Icon } from '@/components/atoms/Icon';

interface SettingsContextProps {
  showSettings: () => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe utilizarse dentro de un SettingsProvider');
  }
  return context;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const { themeSetting, colorScheme, setThemeSetting } = useCustomTheme();
  const { showAlert } = useAlert();
  const router = useRouter();

  const showSettings = () => setVisible(true);
  const hideSettings = () => setVisible(false);

  const performLogout = async () => {
    setVisible(false);
    await SessionService.clearToken();
    router.replace('/login');
  };

  const handleLogout = () => {
    showAlert({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      confirmText: 'Sí, cerrar sesión',
      cancelText: 'Cancelar',
      onConfirm: performLogout
    });
  };

  // Colores dinámicos del modal según el colorScheme activo
  const isDark = colorScheme === 'dark';
  const modalBg = isDark ? '#1E293B' : '#FFFFFF';
  const overlayBg = isDark ? 'rgba(0, 0, 0, 0.65)' : 'rgba(0, 0, 0, 0.45)';
  const textColor = isDark ? '#F8FAFC' : '#1E293B';
  const subTextColor = isDark ? '#94A3B8' : '#64748B';
  const borderColor = isDark ? '#334155' : '#E2E8F0';
  const cardSectionBg = isDark ? '#0F172A' : '#F8FAFC';

  // Configuración de los botones de tema
  const themeOptions: { key: ThemeSetting; label: string; icon: string; desc: string }[] = [
    { 
      key: 'light', 
      label: 'Claro', 
      icon: 'weather-sunny',
      desc: 'Forza el aspecto claro en la app.'
    },
    { 
      key: 'dark', 
      label: 'Oscuro', 
      icon: 'weather-night',
      desc: 'Forza el aspecto oscuro en la app.'
    },
    { 
      key: 'system', 
      label: 'Sistema', 
      icon: 'brightness-auto',
      desc: 'Sigue el tema configurado en tu móvil.'
    }
  ];

  return (
    <SettingsContext.Provider value={{ showSettings }}>
      {children}

      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={hideSettings}
      >
        <Pressable style={[styles.overlay, { backgroundColor: overlayBg }]} onPress={hideSettings}>
          <Pressable style={[styles.bottomSheet, { backgroundColor: modalBg }]} pointerEvents="auto">
            {/* Tirador superior del Bottom Sheet */}
            <View style={[styles.handle, { backgroundColor: borderColor }]} />

            {/* Cabecera */}
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { color: textColor }]}>Configuración</Text>
              <TouchableOpacity onPress={hideSettings} style={[styles.closeButton, { backgroundColor: borderColor }]}>
                <Icon family="MaterialCommunityIcons" name="close" size={20} color={textColor} />
              </TouchableOpacity>
            </View>

            {/* Sección de Tema */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Tema de la aplicación</Text>
              
              <View style={styles.themeGrid}>
                {themeOptions.map((opt) => {
                  const isSelected = themeSetting === opt.key;
                  const activeColor = isDark ? '#3B82F6' : '#1450B8';
                  const activeBtnBg = isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(20, 80, 184, 0.1)';
                  const btnBg = isSelected ? activeBtnBg : (isDark ? '#334155' : '#F1F5F9');
                  const btnBorder = isSelected ? activeColor : 'transparent';
                  const btnTextColor = isSelected ? activeColor : textColor;
                  const iconColor = isSelected ? activeColor : subTextColor;

                  return (
                    <TouchableOpacity
                      key={opt.key}
                      style={[
                        styles.themeButton, 
                        { 
                          backgroundColor: btnBg, 
                          borderColor: btnBorder,
                          borderWidth: 1.5
                        }
                      ]}
                      onPress={() => setThemeSetting(opt.key)}
                      activeOpacity={0.8}
                    >
                      <Icon family="MaterialCommunityIcons" name={opt.icon} size={24} color={iconColor} />
                      <Text style={[styles.themeBtnText, { color: btnTextColor }]}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Descripción del tema seleccionado */}
              <View style={[styles.descCard, { backgroundColor: cardSectionBg, borderColor }]}>
                <Text style={[styles.descText, { color: subTextColor }]}>
                  {themeOptions.find(o => o.key === themeSetting)?.desc}
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: borderColor }]} />

            {/* Sección de Cuenta / Cierre de Sesión */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Cuenta</Text>
              <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2' }]}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Icon family="MaterialCommunityIcons" name="logout" size={20} color="#EF4444" />
                <Text style={styles.logoutText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SettingsContext.Provider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 44 : 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 20,
  },
  handle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.8,
  },
  themeGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  themeButton: {
    flex: 1,
    height: 72,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  themeBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  descCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  descText: {
    fontSize: 12,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
  }
});
