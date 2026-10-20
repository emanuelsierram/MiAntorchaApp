export interface CreateStudyRequest {
  nombrePersona: string;
  telefonoPersona: string;
  direccionPersona: string;
  estado: 'en curso';
  idUsuarioAsignado: number;
  personaQueReporta: number;
  idGrupo: number | null;
}

export interface StudyResponse {
  id: number;
  nombrePersona: string;
  telefonoPersona: string;
  direccionPersona: string;
  estado: string;
  leccion: number;
  idUsuarioAsignado: number;
  personaQueReporta: string;
  idGrupo: number | null;
}

export interface Study {
  id: string;
  name: string;
  weeks: string;
}
