import { useEffect, useState } from 'react';
import { useCustomTheme } from '@/src/context/theme-context';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const { colorScheme } = useCustomTheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
