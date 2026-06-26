import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Icon, IconFamily } from '../atoms/Icon';

export interface MenuItemProps {
  title: string;
  subtitle?: string;
  iconName: string;
  iconFamily?: IconFamily;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function MenuItem({
  title,
  subtitle,
  iconName,
  iconFamily = 'MaterialCommunityIcons',
  onPress,
  style,
}: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      <View style={styles.iconContainer}>
        <Icon
          family={iconFamily}
          name={iconName}
          size={24}
          color="#000"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle && <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginRight: 16,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    lineHeight: 16,
  },
});
