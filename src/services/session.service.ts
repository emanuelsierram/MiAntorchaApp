import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'session_token';
const PHONE_KEY = 'session_last_phone';

export const SessionService = {
  /**
   * Guarda el token JWT de la sesión.
   */
  saveToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error al guardar el token de sesión:', error);
    }
  },

  /**
   * Obtiene el token JWT de la sesión.
   */
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error al obtener el token de sesión:', error);
      return null;
    }
  },

  /**
   * Elimina el token de sesión (Cerrar sesión).
   */
  clearToken: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error al eliminar el token de sesión:', error);
    }
  },

  /**
   * Guarda el último número de teléfono utilizado.
   */
  saveLastPhone: async (phone: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(PHONE_KEY, phone);
    } catch (error) {
      console.error('Error al guardar el último teléfono:', error);
    }
  },

  /**
   * Obtiene el último número de teléfono utilizado.
   */
  getLastPhone: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(PHONE_KEY);
    } catch (error) {
      console.error('Error al obtener el último teléfono:', error);
      return null;
    }
  },

  /**
   * Obtiene las cabeceras de autorización con el token actual para peticiones HTTP.
   */
  getAuthHeaders: async (): Promise<HeadersInit> => {
    const token = await SessionService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': token } : {}),
    };
  }
};
