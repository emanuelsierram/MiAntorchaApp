import { LoginRequest } from '../types/auth';

const API_URL = 'http://192.168.1.3:8080'; // Recuerda usar la IP de tu PC, no 'localhost' en móviles

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<string> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const token = response.headers.get('Authorization'); 
    
    if (!token) throw new Error('No se recibió el token');
    
    return token;
  }
};