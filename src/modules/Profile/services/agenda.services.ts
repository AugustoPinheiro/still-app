import { api } from '@/config/api';
import { getUserData } from '@/config/mmkvStorage';
import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetLookType } from '@/types/ClosetLookType';
import { ScheduleType } from '@/types/ScheduleType';
import { TripType } from '@/types/TripType';

interface IPostScheduleProps {
  title: string;
  start_date: string | Date;
  end_date: string | Date;
  profile_id: number;
  location?: string;
  all_day?: boolean;
}

interface ISaveScheduleProps extends IPostScheduleProps {
  tags?: number[];
  isMoreThanOneDay?: boolean;
}

interface IPostScheduleResponse {
  id: number;
  title: string;
  profile_id: number;
  start_date: string;
  end_date: string;
  active: boolean;
  private: boolean;
  location: string;
  image: null | string;
  mood: null | string;
  trip_id: null | number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

type GetAgendaTagsResponse = {
  key: string;
  value: string;
};

export type ResponseTags = {
  id: number;
  title: string;
};

export async function getSchedules(year: string, month: string): Promise<ScheduleType[]> {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('User not found');
  }

  const { data } = await api.get<ScheduleType[]>(
    `events/schedule/${user?.username}/${year}/${month}`
  );

  return data;
}

export const postSchedule = async (schedule: IPostScheduleProps) => {
  const { data } = await api.post<TripType>('events/schedule', schedule);

  return data;
};

export const putSchedule = async (schedule: IPostScheduleProps, scheduleId: number) => {
  const { data } = await api.put<TripType>(`events/schedule/${scheduleId}`, schedule);

  return data;
};

export const postTrip = async (trip: IPostScheduleProps) => {
  const { data } = await api.post<IPostScheduleResponse>('events/trips', trip);

  return data;
};

export const saveSchedule = async (
  schedule: Omit<ISaveScheduleProps, 'profile_id'>,
  scheduleId?: number
): Promise<IPostScheduleResponse | TripType> => {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('User not found');
  }

  const payload = {
    title: schedule.title,
    location: schedule.location,
    profile_id: user.id,
    start_date: schedule.start_date,
    end_date: schedule.end_date,
    all_day: schedule.all_day,
    tags: schedule.tags,
  };

  if (scheduleId) {
    const data = await putSchedule(payload, scheduleId);

    return data;
  }

  if (schedule.isMoreThanOneDay) {
    const data = await postTrip(payload);

    return data;
  }

  const data = await postSchedule(payload);

  return data;
};

export async function savePartToEvent(
  date: string,
  looksIds: number[],
  clothingsIds: number[],
  eventId?: number
) {
  const user = getUserData();
  let scheduleId = eventId;

  if (!user?.id) {
    throw new Error('User not found');
  }

  if (!looksIds.length && !clothingsIds.length) {
    throw new Error('Looks and clothings not found');
  }

  const payloadEvent = {
    title: 'LOOK_DAY',
    start_date: new Date(date + 'T12:00:00').toISOString(),
    end_date: new Date(date + 'T12:00:00').toISOString(),
    location: 'LOOK_DAY',
    profile_id: user?.id,
  };

  if (!eventId) {
    const schedule = await postSchedule(payloadEvent);
    scheduleId = schedule.id;
  }

  if (looksIds?.length) {
    await api.post(`events/schedule/${scheduleId}/add-looks`, looksIds);
  }

  if (clothingsIds?.length) {
    await api.post(`events/schedule/${scheduleId}/add-clothings`, clothingsIds);
  }
}

export async function getLooksById(ids: number[]): Promise<ClosetLookType[]> {
  if (!ids.length) {
    throw new Error('Looks not found');
  }

  const looks: ClosetLookType[] = [];

  for (const id of ids) {
    const { data } = await api.get<ClosetLookType>(`closet/look/${id}`);

    looks.push(data);
  }

  return looks;
}

export async function getClothingsById(ids: number[]): Promise<ClosetClothingType[]> {
  if (!ids.length) {
    throw new Error('Clothings not found');
  }

  const clothings: ClosetClothingType[] = [];

  for (const id of ids) {
    const { data } = await api.get<ClosetClothingType>(`/closet/clothing/id/${id}`);

    clothings.push(data);
  }

  return clothings;
}

export async function removeScheduleLook(id: number, lookId: number) {
  await api.post(`events/schedule/${id}/remove-looks/`, [lookId]);
}

export async function removeScheduleClothing(id: number, clothingId: number) {
  await api.post(`events/schedule/${id}/remove-clothings/`, [clothingId]);
}

export async function deletePartToEvent(
  scheduleId: number,
  looksIds: number[],
  clothingsIds: number[]
) {
  if (!looksIds.length && !clothingsIds.length) {
    throw new Error('Looks and clothings not found');
  }

  if (looksIds?.length) {
    await api.post(`events/schedule/${scheduleId}/remove-looks/`, looksIds);
  }

  if (clothingsIds?.length) {
    await api.post(`events/schedule/${scheduleId}/remove-clothings/`, clothingsIds);
  }
}

export async function getAgendaTags(
  type: string = 'tag'
): Promise<GetAgendaTagsResponse[] | undefined> {
  const { data } = await api.get<ResponseTags[]>(`/tags?type=${type}`);

  if (!data) {
    throw new Error('Tags not found');
  }

  const tagsParsed = [] as GetAgendaTagsResponse[];

  for (const tag of data) {
    tagsParsed.push({ key: `${tag.id}`, value: tag.title });
  }

  return tagsParsed;
}

export async function deleteSchedule(id: number) {
  await api.delete(`/events/schedule/${id}`);
}
