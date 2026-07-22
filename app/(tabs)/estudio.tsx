// app/(tabs)/estudio.tsx
import { ActionCard } from '@/components/molecules/action-card';
import { EmptyState } from '@/components/molecules/empty-state';
import { AddStudyForm, StudyFormData } from '@/components/organisms/add-study-form';
import { TopNavBar } from '@/components/organisms/top-nav-bar';
import { Colors } from '@/src/constants/theme';
import { useAlert } from '@/src/context/alert-context';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import React from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

export default function EstudioScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const tintColor = Colors[colorScheme].tint;

  const handleAddStudy = (data: StudyFormData) => {
    // Aquí se gestionaría el envío de datos al backend en el futuro
    console.log('Nuevo estudio bíblico agregado:', data);
    Alert.alert(
      'Registro Exitoso', 
      `Se ha registrado a ${data.nombre} como tu nuevo estudio bíblico.`
    );
  };

  const handleFindStudyPress = () => {
    Alert.alert('Acción', 'Navegando a Buscar Estudio Bíblico...');
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      {/* Header azul superior */}
      <View style={[styles.headerContainer, { backgroundColor: tintColor }]}>
        <TopNavBar
          title="Mis estudios bíblicos"
          showInfoIcon={false}
          onMenuPress={() => console.log('Menú presionado')}
      </View>

      {/* Cuerpo principal con scroll y solapamiento elegante */}
      <ScrollView 
        style={styles.bodyScroll} 
        contentContainerStyle={styles.bodyContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta de Estado Vacío */}
        <EmptyState 
          title="Aún no tienes estudios bíblicos"
          subtitle="Registra tu primer estudio y comienza tu crecimiento espiritual."
        />

          {/* Encontrar estudio biblico */}
        <ActionCard 
        title="Encuentra un estudio bíblico"
        subtitle="Hay amigos de esperanza cerca de ti."
        leftIconName="globe"
        onPress={handleFindStudyPress}
          />

        {/* Organismo del Formulario */}
        <AddStudyForm onSubmit={handleAddStudy} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    paddingBottom: 24, // Espacio para que el solapamiento se vea bien
  },
  bodyScroll: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Color de fondo del PC/Móvil
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24, // Efecto de solapamiento redondeado sobre el fondo azul
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  }
});