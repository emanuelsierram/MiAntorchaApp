import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../atoms/Icon';
import { Checkbox } from '../atoms/Checkbox';
import { StepProgress } from '../atoms/StepProgress';

const { height: screenHeight } = Dimensions.get('window');
const COLLAPSED_HEIGHT = 50;
const EXPANDED_HEIGHT = screenHeight * 0.85;

export interface CanguroPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function CanguroPanel({ isOpen, onToggle }: CanguroPanelProps) {
  const insets = useSafeAreaInsets();
  const animHeight = useRef(new Animated.Value(COLLAPSED_HEIGHT)).current;

  // Estado local para almacenar el estado de las actividades (checkboxes)
  const [checkedActivities, setCheckedActivities] = useState({
    domingo1: false,
    domingo2: false,
    lunes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
  });

  const toggleActivity = (key: keyof typeof checkedActivities) => {
    setCheckedActivities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    Animated.spring(animHeight, {
      toValue: isOpen ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT + insets.bottom,
      friction: 8,
      tension: 40,
      useNativeDriver: false,
    }).start();
  }, [isOpen, insets.bottom, animHeight]);

  return (
    <Animated.View
      style={[
        styles.panelContainer,
        {
          height: animHeight,
          paddingBottom: isOpen ? 0 : insets.bottom,
        },
      ]}
    >
      {/* 1. CABECERA COLAPSADA */}
      {!isOpen && (
        <TouchableOpacity
          onPress={onToggle}
          style={styles.collapsedHeader}
          activeOpacity={0.8}
        >
          <Icon family="MaterialCommunityIcons" name="chevron-up" size={32} color="#000" />
        </TouchableOpacity>
      )}

      {/* 2. CONTENIDO EXPANDIDO */}
      {isOpen && (
        <View style={styles.expandedContent}>
          {/* Cabecera Azul */}
          <View style={styles.header}>
            <View style={styles.headerTitleGroup}>
              <Text style={styles.headerTitle}>Nivel Moises</Text>
              <TouchableOpacity style={styles.infoButton}>
                <Icon family="MaterialCommunityIcons" name="information-outline" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onToggle} style={styles.closeButton}>
              <Icon family="MaterialCommunityIcons" name="chevron-down" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Cuerpo del panel */}
          <View style={styles.body}>
            {/* Marca de agua de fuego/antorcha en el fondo */}
            <View style={styles.watermarkContainer} pointerEvents="none">
              <Icon family="MaterialCommunityIcons" name="fire" size={280} color="#1b8edb" style={styles.watermark} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              {/* Sección Actividades */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Actividades de la semana:</Text>
                <Icon family="MaterialCommunityIcons" name="chevron-down" size={24} color="#000" />
              </View>

              {/* Contenedor Timeline de Actividades */}
              <View style={styles.timelineContainer}>
                {/* Línea vertical azul de fondo */}
                <View style={styles.verticalTimelineLine} />

                {/* DOMINGO */}
                <View style={styles.timelineRow}>
                  <Text style={styles.dayText}>Domingo</Text>
                  <View style={styles.timelineNodeContainer}>
                    <View style={styles.timelineNode} />
                  </View>
                  <View style={styles.activitiesContainer}>
                    <Checkbox
                      checked={checkedActivities.domingo1}
                      onChange={() => toggleActivity('domingo1')}
                      label="Visitar un enfermo"
                    />
                    <Checkbox
                      checked={checkedActivities.domingo2}
                      onChange={() => toggleActivity('domingo2')}
                      label="Repartir literaturas"
                    />
                  </View>
                </View>

                {/* LUNES */}
                <View style={styles.timelineRow}>
                  <Text style={styles.dayText}>Lunes</Text>
                  <View style={styles.timelineNodeContainer}>
                    <View style={styles.timelineNode} />
                  </View>
                  <View style={styles.activitiesContainer}>
                    <Checkbox
                      checked={checkedActivities.lunes}
                      onChange={() => toggleActivity('lunes')}
                      label="Estudio biblico"
                    />
                  </View>
                </View>

                {/* MIERCOLES */}
                <View style={styles.timelineRow}>
                  <Text style={styles.dayText}>Miercoles</Text>
                  <View style={styles.timelineNodeContainer}>
                    <View style={styles.timelineNode} />
                  </View>
                  <View style={styles.activitiesContainer}>
                    <Checkbox
                      checked={checkedActivities.miercoles}
                      onChange={() => toggleActivity('miercoles')}
                      label="Llevar a un amigo a la iglesia"
                    />
                  </View>
                </View>

                {/* JUEVES */}
                <View style={styles.timelineRow}>
                  <Text style={styles.dayText}>Jueves</Text>
                  <View style={styles.timelineNodeContainer}>
                    <View style={styles.timelineNode} />
                  </View>
                  <View style={styles.activitiesContainer}>
                    <Checkbox
                      checked={checkedActivities.jueves}
                      onChange={() => toggleActivity('jueves')}
                      label="Estudio biblico"
                    />
                  </View>
                </View>

                {/* VIERNES */}
                <View style={styles.timelineRow}>
                  <Text style={styles.dayText}>Viernes</Text>
                  <View style={styles.timelineNodeContainer}>
                    <View style={styles.timelineNode} />
                  </View>
                  <View style={styles.activitiesContainer}>
                    <Checkbox
                      checked={checkedActivities.viernes}
                      onChange={() => toggleActivity('viernes')}
                      label="Visitar a una viuda"
                    />
                  </View>
                </View>
              </View>

              {/* Divisor */}
              <View style={styles.spacer} />

              {/* Sección Metas */}
              <View style={styles.metasSection}>
                <Text style={styles.sectionTitle}>Metas propuestas:</Text>
                
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Estudios Bíblicos completados:</Text>
                  <StepProgress current={1} />
                </View>

                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Visitas a amigos de esperanza:</Text>
                  <StepProgress current={5} />
                </View>

                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Amigos de esperanza llevados a la iglesia</Text>
                  <StepProgress current={2} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 100,
    overflow: 'hidden',
  },
  collapsedHeader: {
    height: COLLAPSED_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f3f5',
  },
  expandedContent: {
    flex: 1,
  },
  header: {
    height: 56,
    backgroundColor: '#2b5cb8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoButton: {
    marginLeft: 8,
    padding: 4,
  },
  closeButton: {
    padding: 4,
  },
  body: {
    flex: 1,
    backgroundColor: '#eef3fa',
    position: 'relative',
  },
  watermarkContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  watermark: {
    opacity: 0.04,
  },
  scrollContent: {
    padding: 20,
    zIndex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 10,
    marginBottom: 10,
  },
  verticalTimelineLine: {
    position: 'absolute',
    left: 89,
    top: 15,
    bottom: 25,
    width: 2,
    backgroundColor: '#2b5cb8',
  },
  timelineRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  dayText: {
    width: 70,
    fontSize: 13,
    color: '#666',
    textAlign: 'right',
    paddingTop: 3,
  },
  timelineNodeContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  timelineNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2b5cb8',
    zIndex: 2,
  },
  activitiesContainer: {
    flex: 1,
    paddingLeft: 6,
    gap: 8,
  },
  spacer: {
    height: 1,
    backgroundColor: '#d0dbe9',
    marginVertical: 20,
  },
  metasSection: {
    gap: 15,
    paddingBottom: 40,
  },
  metaItem: {
    gap: 6,
  },
  metaLabel: {
    fontSize: 14,
    color: '#444',
  },
});
