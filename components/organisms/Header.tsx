import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export interface HeaderProps {
  imageSource?: ImageSourcePropType;
  heightRatio?: number; // Porcentaje del alto de la pantalla (ej. 0.4)
  logoSource?: ImageSourcePropType;
  title?: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
}

export function Header({
  imageSource = require('@/assets/images/logo.png'),
  heightRatio = 0.4,
  title,
  subtitle,
  style,
}: HeaderProps) {
  const computedHeight = screenHeight * heightRatio;

  return (
    <View style={[styles.container, { height: computedHeight }, style]}>
      {imageSource && (
        <Image
          source={imageSource}
          style={styles.headerImage}
          resizeMode="cover"
        />
      )}
      {(title || subtitle) && (
        <View style={styles.textOverlay}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});
