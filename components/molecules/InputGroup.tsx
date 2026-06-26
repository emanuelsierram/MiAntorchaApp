import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Icon, IconFamily } from '../atoms/Icon';
import { Input } from '../atoms/Input';

export interface InputGroupProps extends TextInputProps {
  leftIconName?: string;
  leftIconFamily?: IconFamily;
  rightIconName?: string;
  rightIconFamily?: IconFamily;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export function InputGroup({
  leftIconName,
  leftIconFamily = 'FontAwesome',
  rightIconName,
  rightIconFamily = 'FontAwesome',
  onRightIconPress,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}: InputGroupProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
        containerStyle,
      ]}
    >
      {leftIconName && (
        <Icon
          name={leftIconName}
          family={leftIconFamily}
          size={20}
          color={isFocused ? '#1b8edb' : '#666'}
          style={styles.leftIcon}
        />
      )}
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {rightIconName && (
        <TouchableOpacity
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
          style={styles.rightIconContainer}
          activeOpacity={0.7}
        >
          <Icon
            name={rightIconName}
            family={rightIconFamily}
            size={20}
            color={isFocused ? '#1b8edb' : '#666'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  containerFocused: {
    borderBottomColor: '#1b8edb',
  },
  leftIcon: {
    marginRight: 10,
    width: 20,
    textAlign: 'center',
  },
  rightIconContainer: {
    padding: 10,
    marginRight: -10,
  },
});
