import { IconSymbol } from '@/components/atoms/icon-symbol';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import React from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

interface FormInputFieldProps {
  iconName: React.ComponentProps<typeof IconSymbol>['name'];
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  style?: StyleProp<ViewStyle>;
}

export function FormInputField({
  iconName,
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  style,
}: FormInputFieldProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const labelColor = isDark ? '#ECEDEE' : '#334155';
  const iconColor = isDark ? '#94A3B8' : '#334155';
  const inputBg = isDark ? '#0F172A' : '#FFFFFF';
  const inputBorder = isDark ? '#334155' : '#E2E8F0';
  const inputTextColor = isDark ? '#F8FAFC' : '#0F172A';
  const placeholderTextColor = isDark ? '#475569' : '#94A3B8';

  return (
    <View style={[styles.container, style]}>
      {/* Etiqueta con Icono + Texto */}
      <View style={styles.labelContainer}>
        <IconSymbol name={iconName} size={16} color={iconColor} style={styles.icon} />
        <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
      </View>

      {/* Input de texto */}
      <TextInput
        style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: inputTextColor }]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 6,
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
  }
});
