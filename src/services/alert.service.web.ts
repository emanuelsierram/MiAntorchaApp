import Swal from 'sweetalert2';

export const AlertService = {
  /**
   * Muestra un diálogo de confirmación para cerrar sesión usando SweetAlert2 (Versión PC / Web).
   */
  confirmLogout: (onConfirm: () => void) => {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1450B8',
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
