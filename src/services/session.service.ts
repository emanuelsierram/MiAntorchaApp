import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'session_token';
const PHONE_KEY = 'session_last_phone';

function decodeTokenPayload(token: string): Record<string, unknown> | null {
  try {
    const tokenValue = token.replace(/^Bearer\s+/i, '').trim();
    const tokenParts = tokenValue.split('.');
    if (tokenParts.length !== 3) {
      console.warn('El token de sesión no tiene formato JWT; no se puede obtener el id del usuario.');
      return null;
    }

    const payload = tokenParts[1];

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, '=');
    return JSON.parse(atob(paddedPayload)) as Record<string, unknown>;
  } catch (error) {
    console.error('Error al leer la información del token de sesión:', error);
    return null;
  }
}

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
      ...(token ? { 'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}` } : {}),
    };
  },

  getUserId: async (): Promise<string | null> => {
    const token = await SessionService.getToken();
    if (!token) {
      console.warn('No existe un token de sesión guardado.');
      return null;
    }

    const payload = decodeTokenPayload(token);
    if (!payload) {
      await SessionService.clearToken();
      return null;
    }

    const userId = payload?.idUsuario ?? payload?.usuarioId ?? payload?.userId ?? payload?.id ?? payload?.sub;
    if (userId === undefined || userId === null) {
      console.warn('El JWT no contiene un claim compatible con el identificador del usuario.');
      return null;
    }

    return String(userId);
  },

  getTokenFingerprint: async (): Promise<string | null> => {
    const token = await SessionService.getToken();
    if (!token) return null;

    return `${token.length}:${token.slice(-8)}`;
  },
};
