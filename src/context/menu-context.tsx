import React, { createContext, useContext, useState, useRef } from 'react';
import { Modal, StyleSheet, View, Pressable, Animated, Dimensions } from 'react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { MenuDrawer } from '@/components/organisms/menu-drawer';

interface MenuContextProps {
  showMenu: () => void;
  hideMenu: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu debe utilizarse dentro de un MenuProvider');
  }
  return context;
}

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(screenWidth * 0.88, 350);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animaciones
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showMenu = () => {
    setVisible(true);
    // Ejecutar animaciones al abrir
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideMenu = () => {
    // Ejecutar animaciones al cerrar
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
    });
  };

  const overlayBgColor = isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.45)';
  const drawerBgColor = isDark ? '#121214' : '#FFFFFF';

  return (
    <MenuContext.Provider value={{ showMenu, hideMenu }}>
      {children}

      <Modal
        visible={visible}
        transparent={true}
        animationType="none"
        onRequestClose={hideMenu}
      >
        <View style={styles.container}>
          {/* Backdrop interactivo */}
          <Animated.View 
            style={[
              styles.backdrop, 
              { 
                backgroundColor: overlayBgColor,
                opacity: fadeAnim 
              }
            ]}
          >
            <Pressable style={StyleSheet.absoluteFill} onPress={hideMenu} />
          </Animated.View>

          {/* Contenedor del Drawer deslizable */}
          <Animated.View 
            style={[
              styles.drawerContainer, 
              { 
                width: DRAWER_WIDTH,
                backgroundColor: drawerBgColor,
                transform: [{ translateX: slideAnim }] 
              }
            ]}
          >
            <MenuDrawer onClose={hideMenu} />
          </Animated.View>
        </View>
      </Modal>
    </MenuContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  drawerContainer: {
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 16,
    // Bordes ligeramente redondeados a la derecha para un toque moderno
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
});
