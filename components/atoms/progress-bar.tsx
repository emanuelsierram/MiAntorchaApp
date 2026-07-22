import { useThemeColor } from '@/src/hooks/use-theme-color';
import React from 'react';
import { DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface ProgressBarProps {
  progress: number;
  fillColor: string;
  trackColor?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({ 
  progress, 
  fillColor, 
  trackColor, 
  height = 8, 
  style 
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const widthPercentage: DimensionValue = `${clampedProgress}%`;
  
  const defaultTrackColor = useThemeColor({ light: '#E5E7EB', dark: '#334155' }, 'icon');
  const resolvedTrackColor = trackColor ?? defaultTrackColor;

  return (
    <View style={[styles.track, { backgroundColor: resolvedTrackColor, height }, style]}>
      <View 
        style={[
          styles.fill, 
          { width: widthPercentage, backgroundColor: fillColor }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  }
});