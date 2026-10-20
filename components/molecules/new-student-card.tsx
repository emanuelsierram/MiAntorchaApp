import { CircularIcon } from '@/components/atoms/circular-icon';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { Pressable, StyleSheet, Text } from 'react-native';

interface NewStudentCardProps {
  onPress: () => void;
}

export function NewStudentCard({ onPress }: NewStudentCardProps) {
  const tintColor = useThemeColor({}, 'tint');
  const isDark = useColorScheme() === 'dark';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Nuevo Alumno"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: isDark ? '#60A5FA' : '#8DB7FF',
          backgroundColor: isDark ? '#172554' : '#FFFFFF',
          opacity: pressed ? 0.75 : 1,
        },
      ]}
    >
      <CircularIcon
        name="plus"
        size={34}
        iconColor="#FFFFFF"
        backgroundColor={tintColor}
        style={styles.icon}
      />
      <Text style={[styles.title, { color: isDark ? '#DBEAFE' : tintColor }]}>Nuevo Alumno</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 86,
    minHeight: 50,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
