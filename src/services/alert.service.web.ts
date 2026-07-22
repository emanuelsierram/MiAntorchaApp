import Swal from 'sweetalert2';
import { useThemeColor } from '../hooks/use-theme-color';

export const AlertService = {
  /**
   * Muestra un diálogo de confirmación para cerrar sesión usando SweetAlert2 (Versión PC / Web).
   */
  confirmLogout: (onConfirm: () => void) => {
      const tintColor = useThemeColor({}, 'tint');
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: tintColor,
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  }
};
