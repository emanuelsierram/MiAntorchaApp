import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TopNavBar } from '@/components/organisms/top-nav-bar';
import { ModoApariencia } from '@/components/organisms/modo-apariencia';
import { ActionCard } from '@/components/molecules/action-card';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useAlert } from '@/src/context/alert-context';
import { SessionService } from '@/src/services/session.service';

export default function ConfiguracionScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { showAlert } = useAlert();

  // Estados locales para preferencias
  const [notificaciones, setNotificaciones] = useState(true);

  // Colores dinámicos para el fondo de pantalla y los cards agrupados
  const screenBg = isDark ? '#0F172A' : '#F8FAFC';
  const headerBg = isDark ? '#1E293B' : '#0b449b';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#F1F5F9';
  const sectionTitleColor = isDark ? '#94A3B8' : '#64748B';
  const separatorColor = isDark ? '#334155' : '#E2E8F0';
  const rightValueColor = isDark ? '#3B82F6' : '#1450B8';

  const handleIdiomaPress = () => {
    Alert.alert('Idioma', 'Selección de idioma: Español está activo.');
  };

  const handleCalificarPress = () => {
    Alert.alert('Calificar', '¡Gracias por querer valorarnos! Próximamente disponible en tiendas.');
  };

  const handleContactarPress = () => {
    Alert.alert('Contacto', 'Para soporte o sugerencias, envíanos un correo a soporte@miantorcha.org');
  };

  const performLogout = async () => {
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

  return (
    <View style={[styles.mainContainer, { backgroundColor: screenBg }]}>
      {/* Header superior */}
      <View style={{ backgroundColor: headerBg, paddingBottom: 16 }}>
        <TopNavBar
          title="Configuración"
          showLeftIcon={true}
          showMenuIcon={false}
          onLeftIconPress={() => router.back()}
        />
      </View>

      <ScrollView 
        style={styles.bodyScroll}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECCIÓN 1: APARIENCIA */}
        <Text style={[styles.sectionHeader, { color: sectionTitleColor }]}>APARIENCIA</Text>
        <ModoApariencia />

        {/* SECCIÓN 2: PREFERENCIAS */}
        <Text style={[styles.sectionHeader, { color: sectionTitleColor }]}>PREFERENCIAS</Text>
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ActionCard
            title="Notificaciones"
            subtitle="Administra tus preferencias"
            leftIconName="bell.fill"
            onPress={() => setNotificaciones(!notificaciones)}
            showArrow={true}
            flat={true}
            rightElement={
              <Switch
                value={notificaciones}
                onValueChange={setNotificaciones}
                trackColor={{ true: rightValueColor, false: '#D1D5DB' }}
                thumbColor="#FFFFFF"
              />
            }
          />
          <View style={[styles.inlineSeparator, { backgroundColor: separatorColor }]} />
          <ActionCard
            title="Idioma"
            subtitle="Selecciona el idioma de la aplicación"
            leftIconName="globe"
            onPress={handleIdiomaPress}
            showArrow={true}
            flat={true}
            rightElement={
              <Text style={[styles.rightValueText, { color: rightValueColor }]}>Español</Text>
            }
          />
        </View>

        {/* SECCIÓN 3: MÁS */}
        <Text style={[styles.sectionHeader, { color: sectionTitleColor }]}>MÁS</Text>
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ActionCard
            title="Calificanos"
            subtitle="Ayúdanos a mejorar con tu opinión"
            leftIconName="star.fill"
            onPress={handleCalificarPress}
            showArrow={true}
            flat={true}
          />
          <View style={[styles.inlineSeparator, { backgroundColor: separatorColor }]} />
          <ActionCard
            title="Contáctanos"
            subtitle="Envíanos un mensaje o sugerencia"
            leftIconName="envelope.fill"
            onPress={handleContactarPress}
            showArrow={true}
            flat={true}
          />
        </View>

        {/* SECCIÓN 4: CERRAR SESIÓN (Sin Subtítulo) */}
        <View style={styles.logoutWrapper}>
          <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <ActionCard
              title="Cerrar sesión"
              leftIconName="logout"
              onPress={handleLogout}
              showArrow={true}
              flat={true}
              iconColor="#EF4444"
              iconBgColor="rgba(239, 68, 68, 0.1)"
              titleColor="#EF4444"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyScroll: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -20,
    overflow: 'hidden',
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  sectionCard: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
    marginBottom: 8,
  },
  inlineSeparator: {
    height: 1,
    width: '100%',
    opacity: 0.5,
  },
  rightValueText: {
    fontSize: 14,
    fontWeight: '500',
  },
  logoutWrapper: {
    marginTop: 20,
  }
});
