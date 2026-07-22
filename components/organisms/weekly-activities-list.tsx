import { IconSymbol } from '@/components/atoms/icon-symbol';
import { ThemedText } from '@/components/atoms/themed-text';
import { ActivityCard } from '@/components/molecules/activity-card';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface ActivityItem {
  id: string;
  dayName: string;
  dayShort: string;
  title: string;
  isCompleted: boolean;
  iconName: React.ComponentProps<typeof IconSymbol>['name'];
}

interface WeeklyActivitiesListProps {
  activities: ActivityItem[];
  onToggleActivity: (id: string) => void;
}

export function WeeklyActivitiesList({ activities, onToggleActivity }: WeeklyActivitiesListProps) {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <View style={styles.container}>
      {activities.map((activity, index) => {
        // --- LÓGICA CORREGIDA ---
        
        // 1. ¿Es el primer elemento de ese día específico? (Para poner el punto y el texto)
        const isFirstOfDay = index === 0 || activities[index - 1].dayName !== activity.dayName;
        
        // 2. ¿Es el primer elemento de TODA LA LISTA? (Para ocultar la línea de arriba)
        const isFirstOfList = index === 0;
        
        // 3. ¿Es el último elemento de TODA LA LISTA? (Para ocultar la línea de abajo)
        const isLastOfList = index === activities.length - 1;

        return (
          <View key={activity.id} style={styles.timelineRow}>
            
            {/* Columna Izquierda */}
            <View style={styles.dayContainer}>
              {isFirstOfDay && (
                <>
                  <ThemedText style={styles.dayName} type="defaultSemiBold">{activity.dayName}</ThemedText>
                  <ThemedText style={styles.dayShort}>{activity.dayShort}</ThemedText>
                </>
              )}
            </View>

            {/* Columna Central: Línea de tiempo */}
            <View style={styles.timelineCenter}>
              {/* Arriba: Transparente SOLO si es el primero de toda la lista */}
              <View style={[styles.topLine, { backgroundColor: isFirstOfList ? 'transparent' : tintColor }]} />
              
              {/* Medio: Punto si inicia el día, línea continua si es continuación */}
              {isFirstOfDay ? (
                <View style={[styles.timelineDot, { backgroundColor: tintColor }]}>
                  {/* Recuerda usar "checkmark" aquí por SF Symbols */}
                  <IconSymbol name="checkmark" size={12} color="#FFF" />
                </View>
              ) : (
                <View style={[styles.centerLine, { backgroundColor: tintColor }]} />
              )}

              {/* Abajo: Transparente SOLO si es el último de toda la lista */}
              <View style={[styles.bottomLine, { backgroundColor: isLastOfList ? 'transparent' : tintColor }]} />
            </View>

            {/* Columna Derecha */}
            <View style={styles.cardContainer}>
              <ActivityCard 
                title={activity.title}
                isCompleted={activity.isCompleted}
                actionIconName={activity.iconName}
                onToggle={() => onToggleActivity(activity.id)}
              />
            </View>

          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  timelineRow: {
    flexDirection: 'row',
  },
  dayContainer: {
    width: 70,
    alignItems: 'flex-start',
    paddingTop: 14, // Alinea perfectamente con el centro del checkbox de ActivityCard
  },
  dayName: {
    fontSize: 14,
  },
  dayShort: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  timelineCenter: {
    width: 30,
    alignItems: 'center',
  },
  topLine: {
    width: 2,
    height: 14, // Altura exacta para conectar con el punto sin solaparse
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  centerLine: {
    width: 2,
    height: 20, // Reemplaza al punto para que no quede ningún hueco
  },
  bottomLine: {
    width: 2,
    flex: 1, // Se estira para cubrir todo el alto restante de la tarjeta
  },
  cardContainer: {
    flex: 1,
    paddingBottom: 8, // Margen entre las tarjetas de actividad
    marginTop: -10
  }
});