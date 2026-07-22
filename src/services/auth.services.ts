import { LoginRequest } from "../types/auth";

const API_URL = 'https://portex-2scu.onrender.com'; 

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<string> => {
    // MOCK TEMPORAL PARA PRUEBAS LOCALES E2E
    if (credentials.contrasena === '1234') {
      return 'Bearer mock-jwt-token-xyz';
    }

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

      // Tu backend de Spring Boot retorna el JWT en el Header "Authorization"
      const token = response.headers.get('Authorization'); 
      
      if (!token) throw new Error('No se recibió el token del servidor');
      
      return token;
    } catch (error) {
      console.error("Error en AuthService:", error);
      throw error;
    }
  }
};