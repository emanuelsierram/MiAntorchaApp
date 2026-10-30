import { CreateStudyRequest, Study, StudyResponse } from '@/src/types/study';
import { SessionService } from './session.service';

const API_URL = 'https://portex-2scu.onrender.com/api/estudios-biblicos';

function getErrorMessage(response: Response, fallback: string) {
  return response.text().then((message) => message.trim() || fallback);
}

async function getRequiredAuthHeaders(): Promise<HeadersInit> {
  const token = await SessionService.getToken();
  if (!token) {
    throw new Error('No hay una sesión autenticada para consultar estudios bíblicos.');
  }

  const headers = await SessionService.getAuthHeaders();
  const authorization = new Headers(headers).get('Authorization');
  console.info(
    '[EstudiosBiblicosService] Token utilizado:',
    typeof authorization === 'string' ? `${authorization.length}:${authorization.slice(-8)}` : 'ausente',
  );

  return headers;
}

function toStudy(study: StudyResponse): Study {
  return {
    id: String(study.id),
    name: study.nombrePersona,
    weeks: `Semana ${study.leccion}/20`,
  };
}

function extractStudyList(payload: unknown): StudyResponse[] {
  if (Array.isArray(payload)) {
    return payload as StudyResponse[];
  }

  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    Array.isArray(payload.data)
  ) {
    return payload.data as StudyResponse[];
  }

  throw new Error('La respuesta de estudios bíblicos no tiene un formato válido.');
}

export const EstudiosBiblicosService = {
  getCurrent: async (userId: string): Promise<Study[]> => {
    const headers = await getRequiredAuthHeaders();
    console.info('[EstudiosBiblicosService] Consultando estudios actuales para el usuario:', encodeURIComponent(userId));
    const response = await fetch(`${API_URL}/actuales/${encodeURIComponent(userId)}`, {
      headers,
    });

    console.info('[EstudiosBiblicosService] Respuesta de la API:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(await getErrorMessage(response, 'No se pudieron consultar los estudios bíblicos.'));
    }

    const studies = extractStudyList(await response.json());
    return studies.map(toStudy);
  },

  create: async (study: CreateStudyRequest): Promise<void> => {
    const headers = await getRequiredAuthHeaders();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(study),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response, 'No se pudo registrar el estudio bíblico.'));
    }
  },

  remove: async (studyId: string): Promise<void> => {
    if (!studyId.trim()) {
      throw new Error('El estudio bíblico no tiene un identificador válido.');
    }

    const headers = await getRequiredAuthHeaders();
    const response = await fetch(`${API_URL}/${encodeURIComponent(studyId)}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response, 'No se pudo eliminar el estudio bíblico.'));
    }
  },
};
