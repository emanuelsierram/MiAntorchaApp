import { IconSymbol } from '@/components/atoms/icon-symbol';
import { FormHeader } from '@/components/molecules/form-header';
import { FormInputField } from '@/components/molecules/form-input-field';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Alert, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FREQUENCY_OPTIONS = [
  { label: 'Diario', value: 'diario' },
  { label: 'Semanal', value: 'semanal' },
  { label: 'Mensual', value: 'mensual' },
] as const;

function formatDateForRequest(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00`;
}

function formatDateForDisplay(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export interface StudyFormData {
  nombre: string;
  telefono: string;
  direccion: string;
  edad: string;
  frecuencia: string;
  fechaInicializacion: string;
}

interface AddStudyFormProps {
  onSubmit: (data: StudyFormData) => Promise<void>;
}

export function AddStudyForm({ onSubmit }: AddStudyFormProps) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [edad, setEdad] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [fechaInicializacion, setFechaInicializacion] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tintColor = useThemeColor({}, 'tint');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#F1F5F9';

  const handlePressSubmit = async () => {
    if (isSubmitting) return;

    if (
      !nombre.trim() ||
      !telefono.trim() ||
      !direccion.trim() ||
      !edad.trim() ||
      !frecuencia.trim() ||
      !fechaInicializacion.trim()
    ) {
      Alert.alert('Atención', 'Por favor, completa todos los campos del formulario.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ nombre, telefono, direccion, edad, frecuencia, fechaInicializacion });
      setNombre('');
      setTelefono('');
      setDireccion('');
      setEdad('');
      setFrecuencia('');
      setFechaInicializacion('');
      setSelectedDate(new Date());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      {/* Cabecera del formulario */}
      <FormHeader title="Agregar un estudio bíblico" />

      {/* Campos de entrada */}
      <FormInputField
        iconName="person"
        label="Nombre completo"
        placeholder="Digita el nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <FormInputField
        iconName="phone"
        label="Teléfono"
        placeholder="Digita el teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <FormInputField
        iconName="mappin"
        label="Dirección"
        placeholder="Digita la dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      <FormInputField
        iconName="person"
        label="Edad"
        placeholder="Digita la edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <View style={styles.fieldContainer}>
        <View style={styles.fieldLabelContainer}>
          <IconSymbol name="repeat" size={16} color={isDark ? '#94A3B8' : '#334155'} />
          <Text style={[styles.fieldLabel, { color: isDark ? '#ECEDEE' : '#334155' }]}>Frecuencia</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsFrequencyOpen(true)}
          style={[
            styles.selector,
            {
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#E2E8F0',
            },
          ]}
        >
          <Text style={{ color: frecuencia ? (isDark ? '#F8FAFC' : '#0F172A') : (isDark ? '#475569' : '#94A3B8') }}>
            {FREQUENCY_OPTIONS.find((option) => option.value === frecuencia)?.label ?? 'Selecciona una frecuencia'}
          </Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => setIsDatePickerOpen(true)}
      >
        <FormInputField
          iconName="calendar"
          label="Fecha de inicialización"
          placeholder="Selecciona una fecha"
          value={fechaInicializacion ? formatDateForDisplay(selectedDate) : ''}
          onChangeText={() => undefined}
          editable={false}
        />
      </Pressable>

      <Modal
        transparent
        visible={isFrequencyOpen}
        animationType="fade"
        onRequestClose={() => setIsFrequencyOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsFrequencyOpen(false)}>
          <View style={[styles.frequencyMenu, { backgroundColor: cardBg }]}>
            {FREQUENCY_OPTIONS.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  setFrecuencia(option.value);
                  setIsFrequencyOpen(false);
                }}
                style={styles.frequencyOption}
              >
                <Text style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {isDatePickerOpen && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            if (!date || event.type === 'dismissed') {
              setIsDatePickerOpen(false);
              return;
            }

            setSelectedDate(date);
            setFechaInicializacion(formatDateForRequest(date));
            setIsDatePickerOpen(false);
          }}
        />
      )}

      {/* Botón de agregar sin ícono gráfico de acuerdo a las especificaciones */}
      <TouchableOpacity 
        onPress={handlePressSubmit}
        style={[ styles.submitButton, { backgroundColor: tintColor }]}
        activeOpacity={0.8}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>{isSubmitting ? 'Guardando...' : 'Agregar'}</Text>
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
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  fieldLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  selector: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'center',
    padding: 24,
  },
  frequencyMenu: {
    borderRadius: 16,
    paddingVertical: 8,
  },
  frequencyOption: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
