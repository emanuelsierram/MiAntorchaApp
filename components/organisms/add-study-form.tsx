import { FormHeader } from '@/components/molecules/form-header';
import { FormInputField } from '@/components/molecules/form-input-field';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface StudyFormData {
  nombre: string;
  telefono: string;
  direccion: string;
  edad: string;
}

interface AddStudyFormProps {
  onSubmit: (data: StudyFormData) => void;
}

export function AddStudyForm({ onSubmit }: AddStudyFormProps) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [edad, setEdad] = useState('');
  const tintColor = useThemeColor({}, 'tint');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#F1F5F9';

  const handlePressSubmit = () => {
    if (!nombre.trim() || !telefono.trim() || !direccion.trim() || !edad.trim()) {
      Alert.alert('Atención', 'Por favor, completa todos los campos del formulario.');
      return;
    }

    onSubmit({ nombre, telefono, direccion, edad });
    
    // Limpiar formulario tras agregar
    setNombre('');
    setTelefono('');
    setDireccion('');
    setEdad('');
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      {/* Cabecera del formulario */}
      <FormHeader title="Agregar un estudio bíblico" />

      {/* Campos de entrada */}
      <FormInputField
        iconName="person"
        label="Nombre completo"
        placeholder="Fransico Rodriguez"
        value={nombre}
        onChangeText={setNombre}
      />

      <FormInputField
        iconName="phone"
        label="Teléfono"
        placeholder="3205657890"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <FormInputField
        iconName="mappin"
        label="Dirección"
        placeholder="Calle 46 #16-15"
        value={direccion}
        onChangeText={setDireccion}
      />

      <FormInputField
        iconName="calendar"
        label="Edad"
        placeholder="4"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      {/* Botón de agregar sin ícono gráfico de acuerdo a las especificaciones */}
      <TouchableOpacity 
        onPress={handlePressSubmit}
        style={[ styles.submitButton, { backgroundColor: tintColor }]}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
    marginVertical: 16,
    borderWidth: 1,
  },
  submitButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
