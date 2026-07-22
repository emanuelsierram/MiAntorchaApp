import { IconSymbol } from '@/components/atoms/icon-symbol';
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
  return (
    <View style={[styles.container, style]}>
      {/* Etiqueta con Icono + Texto */}
      <View style={styles.labelContainer}>
        <IconSymbol name={iconName} size={16} color="#334155" style={styles.icon} />
        <Text style={styles.labelText}>{label}</Text>
      </View>

      {/* Input de texto */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
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
    color: '#334155',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  }
});
