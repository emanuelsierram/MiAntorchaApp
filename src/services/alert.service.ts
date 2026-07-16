import { Alert } from 'react-native';

export const AlertService = {
  /**
   * Muestra un diálogo de confirmación para cerrar sesión (Versión Móvil).
   */
  confirmLogout: (onConfirm: () => void) => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar sesión', 
          style: 'destructive',
          onPress: onConfirm
        }
      ]
    );
  }
};
