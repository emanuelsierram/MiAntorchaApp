import { CircularIcon } from '@/components/atoms/circular-icon';
import { useAlert } from '@/src/context/alert-context';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

interface StudentInfoCardProps {
  id: string;
  name: string;
  weeks: string;
  onPress?: () => void;
  onDelete?: (id: string) => void | Promise<void>;
  isDeleting?: boolean;
}

export function StudentInfoCard({
  id,
  name,
  weeks,
  onPress,
  onDelete,
  isDeleting = false,
}: StudentInfoCardProps) {
  const tintColor = useThemeColor({}, 'tint');
  const isDark = useColorScheme() === 'dark';
  const { showAlert } = useAlert();
  const primaryText = '#FFFFFF';
  const secondaryText = isDark ? '#BFDBFE' : '#DCE9FF';

  const handleDeletePress = () => {
    if (!onDelete || isDeleting) return;

    showAlert({
      title: '¿Eliminar estudio bíblico?',
      text: `¿Quieres eliminar el estudio de ${name}? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      onConfirm: () => onDelete(id),
    });
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Estudio de ${name}`}
      disabled={!onPress && !onDelete}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <LinearGradient
        colors={[tintColor, isDark ? '#1E3A8A' : '#2563C7', tintColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Eliminar estudio de ${name}`}
        disabled={!onDelete || isDeleting}
        onPress={(event) => {
          event.stopPropagation();
          handleDeletePress();
        }}
        style={({ pressed }) => [
          styles.deleteButton,
          { opacity: pressed || isDeleting ? 0.7 : 1 },
        ]}
      >
        {isDeleting ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <CircularIcon
            name="trash"
            size={22}
            iconColor="#FFFFFF"
            backgroundColor="transparent"
            style={styles.deleteIcon}
          />
        )}
      </Pressable>
      <View style={styles.header}>
        <CircularIcon
          name="person"
          size={32}
          iconColor={tintColor}
          backgroundColor="#FFFFFF"
          style={styles.personIcon}
        />
      </View>
      <Text numberOfLines={1} style={[styles.name, { color: primaryText }]}>{name}</Text>
      <Text style={[styles.weeks, { color: secondaryText }]}>{weeks}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 165,
    minHeight: 50,
    borderRadius: 24,
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 28,
    height: 28,
  },
  personIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  weeks: {
    fontSize: 16,
    marginTop: 4,
  },
});
