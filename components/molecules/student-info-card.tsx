import { CircularIcon } from '@/components/atoms/circular-icon';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface StudentInfoCardProps {
  name: string;
  weeks: string;
  onPress?: () => void;
}

export function StudentInfoCard({ name, weeks, onPress }: StudentInfoCardProps) {
  const tintColor = useThemeColor({}, 'tint');
  const isDark = useColorScheme() === 'dark';
  const cardBackground = isDark ? '#1E3A8A' : tintColor;
  const primaryText = '#FFFFFF';
  const secondaryText = isDark ? '#BFDBFE' : '#DCE9FF';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Estudio de ${name}`}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: cardBackground, opacity: pressed ? 0.8 : 1 },
      ]}
    >
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
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
