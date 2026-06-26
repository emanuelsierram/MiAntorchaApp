import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export const Input = forwardRef<TextInput, TextInputProps>(
  ({ style, placeholderTextColor = '#999', ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
});
