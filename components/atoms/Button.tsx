import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, IconFamily } from './Icon';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'text';
  iconName?: string;
  iconFamily?: IconFamily;
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  iconName,
  iconFamily = 'FontAwesome',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const isInteractionDisabled = disabled || isLoading;

  const renderContent = () => {
    if (isLoading) {
      const loaderColor = variant === 'primary' ? '#fff' : '#1474f1';
      return <ActivityIndicator size="small" color={loaderColor} />;
    }

    return (
      <View style={styles.contentContainer}>
        {iconName && (
          <Icon
            name={iconName}
            family={iconFamily}
            size={18}
            color={variant === 'primary' ? '#fff' : '#1474f1'}
            style={styles.iconStyle}
          />
        )}
        <Text
          style={[
            styles.baseText,
            variant === 'primary' && styles.primaryText,
            variant === 'outline' && styles.outlineText,
            variant === 'text' && styles.textBtnText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    );
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isInteractionDisabled}
        activeOpacity={0.8}
        style={[
          styles.container,
          styles.shadow,
          isInteractionDisabled && styles.disabled,
          style,
        ]}
      >
        <LinearGradient
          colors={['#3db9f3', '#1b8edb', '#1474f1']}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isInteractionDisabled}
      activeOpacity={0.8}
      style={[
        styles.container,
        variant === 'outline' && styles.outline,
        variant === 'text' && styles.textBtn,
        isInteractionDisabled && styles.disabled,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  outline: {
    borderWidth: 1,
    borderColor: '#1b8edb',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  textBtn: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    marginRight: 8,
  },
  baseText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  primaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#1b8edb',
  },
  textBtnText: {
    color: '#1b8edb',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 6,
  },
  disabled: {
    opacity: 0.6,
  },
});
