import { api } from '@/config/api';
import { getUserData } from '@/config/mmkvStorage';
import { getProfileByUsername } from '@/modules/Profile/services/profile.services';

export type ResponseTags = {
  id: number;
  title: string;
};

export async function getQuestionnaire(questionnaireType: number) {
  try {
    const response = await api.get(`/questionnaires/${questionnaireType}`);

    return response.data;
  } catch (error) {
    console.error('getQuestionnaire', error);
  }
}

export async function getTags(type: string = 'tag') {
  try {
    const response = await api.get<ResponseTags[]>(`/tags?type=${type}`);

    return response.data;
  } catch (error) {
    console.error('getTags', error);
  }
}

export async function putQuestionnaireAnswers(answers: number[], isSettings?: boolean) {
  const userData = getUserData();

  if (!userData) return;

  await api.put(`/questionnaires/answers/${userData.id}`, { answers });
  isSettings && (await getProfileByUsername());
}

export async function putTags(tags: number[]): Promise<void> {
  const user = getUserData();
  const profileId = user?.id;

  await api.put(`/profiles/${profileId}/tags`, { tags });
}

export async function postQuestionnaireStyle(answers: number[]) {
  const { data } = await api.post<string[]>(`/questionnaires/get-styles/`, { answers });

  return data;
}
