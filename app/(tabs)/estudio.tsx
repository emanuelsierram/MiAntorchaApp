// app/(tabs)/estudio.tsx
import { StyleSheet, Text, View } from 'react-native';

export default function EstudioScreen() {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Mi Estudio Bíblico</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});