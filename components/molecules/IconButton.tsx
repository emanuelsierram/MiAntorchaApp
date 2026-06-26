import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Icon, IconFamily } from '../atoms/Icon';

export interface IconButtonProps {
  label: string;
  iconSource?: any;
  iconName?: string;
  iconFamily?: IconFamily;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function IconButton({
  label,
  iconSource,
  iconName,
  iconFamily = 'FontAwesome',
  onPress,
  style,
  textStyle,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {iconSource ? (
        <Image source={iconSource} style={styles.imageIcon} />
      ) : iconName ? (
        <Icon
          name={iconName}
          family={iconFamily}
          size={20}
          color="#444"
          style={styles.vectorIcon}
        />
      ) : null}
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  imageIcon: {
    width: 22,
    height: 22,
  },
  vectorIcon: {
    marginRight: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
});
