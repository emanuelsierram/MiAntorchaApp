import { LoginRequest } from "../types/auth";

const API_URL = 'https://portex-2scu.onrender.com';

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas o error en el servidor');
      }

      const token = response.headers.get('Authorization')?.trim();

      if (!token) {
        throw new Error('No se recibió el token del servidor');
      }

      const bearerToken = token.replace(/^Bearer\s+/i, '');
      const authorizationToken = `Bearer ${bearerToken}`;
      console.info('[AuthService] Token recibido:', `${authorizationToken.length}:${authorizationToken.slice(-8)}`);
      return authorizationToken;
    } catch (error) {
      console.error('Error en AuthService:', error);
      throw error;
    }
  },
};
