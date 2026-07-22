import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Platform, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ActionCard } from '@/components/molecules/action-card';
import { Icon } from '@/components/atoms/Icon';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useSettings } from '@/src/context/settings-context';

interface MenuDrawerProps {
  onClose: () => void;
}

export function MenuDrawer({ onClose }: MenuDrawerProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { showSettings } = useSettings();

  const textColor = isDark ? '#F8FAFC' : '#1E293B';
  const closeButtonBg = isDark ? '#334155' : '#F1F5F9';
  const separatorColor = isDark ? '#334155' : '#E2E8F0';

  const handleConfiguracionPress = () => {
    onClose();
    // Esperar un pequeño delay para que la animación de cierre del Drawer termine antes de abrir la pantalla
    setTimeout(() => {
      router.push('/configuracion');
    }, 300);
  };

  const handleMockPress = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  return (
    <View style={styles.container}>
      {/* Cabecera del Drawer con botón de cerrar */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onClose} 
          style={[styles.closeButton, { backgroundColor: closeButtonBg }]}
          activeOpacity={0.7}
        >
          <Icon family="Ionicons" name="close" size={22} color={textColor} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* 1. Tarjeta del Perfil de Usuario */}
        <ActionCard
          title="Emanuel Sierra"
          subtitle="Miembro"
          leftIconName="person.circle.fill"
          onPress={() => handleMockPress('Perfil', 'Detalles del perfil del miembro.')}
          showArrow={false}
          noIconBackground={true}
          iconColor="#3B82F6"
          flat={true}
        />

        <View style={[styles.separator, { backgroundColor: separatorColor }]} />

        {/* 2. Bloque Medio (con Subtítulos) */}
        <View style={styles.section}>
          <ActionCard
            title="Encuentra tu Estudio Bíblico"
            subtitle="La mies es mucha y los obreros pocos."
            leftIconName="globe"
            onPress={() => handleMockPress('Buscador', 'Cargando buscador de estudios bíblicos...')}
            showArrow={true}
            noIconBackground={true}
            flat={true}
          />
          <ActionCard
            title="Visita de un anciano"
            subtitle="Solicita la visita de tu anciano asociado."
            leftIconName="house.fill"
            onPress={() => handleMockPress('Solicitud', 'Abriendo formulario para solicitar visita de anciano...')}
            showArrow={true}
            noIconBackground={true}
            flat={true}
          />
          <ActionCard
            title="Metas avanzadas"
            subtitle="Revisa las metas ya creadas."
            leftIconName="chart.bar.fill"
            onPress={() => handleMockPress('Metas', 'Cargando panel de metas avanzadas del miembro...')}
            showArrow={true}
            noIconBackground={true}
            flat={true}
          />
          <ActionCard
            title="Mi Experiencia"
            subtitle="Prueba nuestro apartado comercial. Descarga la App y descúbrelo."
            leftIconName="smartphone"
            onPress={() => handleMockPress('Experiencia', 'Iniciando descarga o redirección a Mi Experiencia...')}
            showArrow={true}
            noIconBackground={true}
            flat={true}
          />
        </View>

        <View style={[styles.separator, { backgroundColor: separatorColor }]} />

        {/* 3. Bloque Inferior (sin Subtítulos) */}
        <View style={styles.section}>
          <ActionCard
            title="Información"
            leftIconName="info.circle.fill"
            onPress={() => handleMockPress('Información', 'Mi Antorcha App v1.0.0\nConstruida para fomentar el crecimiento y estudios bíblicos.')}
            showArrow={true}
            noIconBackground={true}
            flat={true}
          />
          <ActionCard
            title="Seguridad"
            leftIconName="shield.fill"
            onPress={() => handleMockPress('Seguridad', 'Abriendo ajustes de seguridad y privacidad...')}
            showArrow={true}
            noIconBackground={true}
            flat={true}
          />
          <ActionCard
            title="Configuración"
            leftIconName="gearshape.fill"
            onPress={handleConfiguracionPress}
            showArrow={true}
            noIconBackground={true}
            flat={true}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 48 : 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  separator: {
    height: 1,
    marginVertical: 10,
    opacity: 0.6,
  },
  section: {
    gap: 0,
  },
});
