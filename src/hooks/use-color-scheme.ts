import { useCustomTheme } from '@/src/context/theme-context';

export function useColorScheme() {
  const { colorScheme } = useCustomTheme();
  return colorScheme;
}

