import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../atoms/Icon';
import { MenuItem } from '../molecules/MenuItem';

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = screenWidth * 0.85;

export interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function SideMenu({ visible, onClose }: SideMenuProps) {
  const insets = useSafeAreaInsets();
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(animValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  const overlayOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={handleClose}
      animationType="none"
    >
      <View style={styles.modalContainer}>
        {/* Fondo oscuro translúcido */}
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        {/* Contenedor del Menú Lateral */}
        <Animated.View
          style={[
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              paddingTop: insets.top + 20,
              paddingBottom: insets.bottom + 20,
              transform: [{ translateX }],
            },
          ]}
        >
          {/* Cabecera: Perfil + Cerrar */}
          <View style={styles.header}>
            <View style={styles.profileContainer}>
              <View style={styles.avatarPlaceholder}>
                <Icon family="MaterialCommunityIcons" name="account" size={32} color="#aaa" />
              </View>
              <View style={styles.profileText}>
                {/* Nombre de perfil configurado como "Usuario" por requerimiento */}
                <Text style={styles.profileName}>Usuario</Text>
                <Text style={styles.profileRole}>Miembro</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon family="MaterialCommunityIcons" name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Divisor */}
          <View style={styles.divider} />

          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* Opciones Principales */}
            <MenuItem
              title="Encuentra tu Estudio Bíblico"
              subtitle="La mies es mucha y los obreros pocos."
              iconName="earth"
              onPress={() => {}}
            />
            <MenuItem
              title="Visita de un anciano"
              subtitle="Solicita la visita de tu anciano asociado."
              iconName="home-outline"
              onPress={() => {}}
            />
            <MenuItem
              title="Metas avanzadas"
              subtitle="Revisa las metas ya creadas."
              iconName="podium"
              onPress={() => {}}
            />
            <MenuItem
              title="Mi Experiencia"
              subtitle="Prueba nuestro apartado comercial. Descarga la App y descúbrelo."
              iconName="cellphone"
              onPress={() => {}}
            />

            {/* Divisor */}
            <View style={styles.divider} />

            {/* Opciones Secundarias */}
            <MenuItem
              title="Información"
              iconName="information-outline"
              onPress={() => {}}
            />
            <MenuItem
              title="Seguridad"
              iconName="shield-outline"
              onPress={() => {}}
            />
            <MenuItem
              title="Configuración"
              iconName="cog-outline"
              onPress={() => {}}
            />
            <MenuItem
              title="Cerrar sesión"
              iconName="logout"
              onPress={() => {}}
            />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  drawer: {
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  profileText: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  profileRole: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    padding: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
  },
});
