export interface LoginRequest {
  usuario: string;
  contrasena: string;
}

// IP de tu PC en la red local (ejemplo: 192.168.1.15)
const API_URL = 'http://192.168.1.3:8080'; 

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