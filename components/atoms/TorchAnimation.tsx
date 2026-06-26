import React, { useRef } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import LottieView from 'lottie-react-native';

export interface TorchAnimationProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function TorchAnimation({ size = 120, style }: TorchAnimationProps) {
  const animationRef = useRef<LottieView>(null);

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <LottieView
        ref={animationRef}
        source={require('@/assets/animations/torch-fire.json')}
        autoPlay
        loop
        style={StyleSheet.absoluteFillObject}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
