import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Icon
        family="MaterialCommunityIcons"
        name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={22}
        color={checked ? '#1b8edb' : '#aaa'}
      />
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
});
