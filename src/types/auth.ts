export interface LoginRequest {
  usuario: string;
  contrasena: string;
}

export interface AuthResponse {
  token: string;
}