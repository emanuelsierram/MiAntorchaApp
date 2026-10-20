// app/(tabs)/estudio.tsx
import { ActionCard } from '@/components/molecules/action-card';
import { EmptyState } from '@/components/molecules/empty-state';
import { AddStudyForm, StudyFormData } from '@/components/organisms/add-study-form';
import { StudyStudent, StudyStudentsCarousel } from '@/components/organisms/study-students-carousel';
import { TopNavBar } from '@/components/organisms/top-nav-bar';
import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { EstudiosBiblicosService } from '@/src/services/estudios-biblicos.service';
import { SessionService } from '@/src/services/session.service';
import { CreateStudyRequest } from '@/src/types/study';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

export default function EstudioScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const tintColor = Colors[colorScheme].tint;
  const [students, setStudents] = useState<StudyStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingStudy, setIsAddingStudy] = useState(false);
  const formRef = useRef<ScrollView>(null);

  useEffect(() => {
    let isMounted = true;

    const loadStudies = async () => {
      try {
        const userId = await SessionService.getUserId();
        console.info('[EstudioScreen] userId obtenido de la sesión:', userId);
        if (!userId) {
          throw new Error('La sesión no contiene un identificador de usuario válido.');
        }

        const currentStudies = await EstudiosBiblicosService.getCurrent(userId);
        if (isMounted) setStudents(currentStudies);
      } catch (error) {
        console.error('Error al cargar los estudios bíblicos:', error);
        if (isMounted) {
          Alert.alert('No se pudieron cargar los estudios', error instanceof Error ? error.message : 'Intenta nuevamente.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadStudies();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddStudy = async (data: StudyFormData) => {
    setIsAddingStudy(true);

    try {
      const userId = await SessionService.getUserId();
      if (!userId) {
        throw new Error('La sesión no contiene un identificador de usuario válido.');
      }

      const numericUserId = Number(userId);
      if (!Number.isInteger(numericUserId)) {
        throw new Error('El identificador de usuario de la sesión no es válido.');
      }

      const studyRequest: CreateStudyRequest = {
        nombrePersona: data.nombre.trim(),
        telefonoPersona: data.telefono.trim(),
        direccionPersona: data.direccion.trim(),
        estado: 'en curso',
        idUsuarioAsignado: numericUserId,
        personaQueReporta: numericUserId,
        idGrupo: null,
      };

      await EstudiosBiblicosService.create(studyRequest);
      setStudents((currentStudents) => [
        ...currentStudents,
        {
          id: `pending-${Date.now()}`,
          name: studyRequest.nombrePersona,
          weeks: 'Semana 0/20',
        },
      ]);
      Alert.alert('Registro Exitoso', `Se ha registrado a ${data.nombre} como tu nuevo estudio bíblico.`);
    } catch (error) {
      console.error('Error al registrar el estudio bíblico:', error);
      Alert.alert('No se pudo registrar el estudio', error instanceof Error ? error.message : 'Intenta nuevamente.');
    } finally {
      setIsAddingStudy(false);
    }
  };

  const handleFindStudyPress = () => {
    Alert.alert('Acción', 'Navegando a Buscar Estudio Bíblico...');
  };

  const handleNewStudent = () => {
    formRef.current?.scrollToEnd({ animated: true });
  };

  const isDark = colorScheme === 'dark';
  const screenBg = isDark ? '#0F172A' : '#F8FAFC';

  return (
    <View style={[styles.mainContainer, { backgroundColor: screenBg }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header azul superior */}
      <View style={[styles.headerContainer, { backgroundColor: tintColor }]}>
        <TopNavBar
          title="Mis estudios bíblicos"
        />
      </View>

      {/* Cuerpo principal con scroll y solapamiento elegante */}
      <ScrollView 
        ref={formRef}
        style={[styles.bodyScroll, { backgroundColor: screenBg }]} 
        contentContainerStyle={styles.bodyContent} 
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator color={tintColor} style={styles.loadingIndicator} />
        ) : students.length === 0 ? (
          <EmptyState
            title="Aún no tienes estudios bíblicos"
            subtitle="Registra tu primer estudio y comienza tu crecimiento espiritual."
          />
        ) : (
          <StudyStudentsCarousel
            students={students}
            onNewStudent={handleNewStudent}
          />
        )}

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

      {isAddingStudy && (
        <View
          accessibilityRole="progressbar"
          accessibilityLabel="Registrando estudio bíblico"
          style={styles.addingOverlay}
        >
          <View style={styles.addingLoaderCard}>
            <ActivityIndicator color={tintColor} size="large" />
          </View>
        </View>
      )}
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
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24, // Efecto de solapamiento redondeado sobre el fondo azul
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  loadingIndicator: {
    marginVertical: 48,
  },
  addingOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addingLoaderCard: {
    width: 88,
    height: 88,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});