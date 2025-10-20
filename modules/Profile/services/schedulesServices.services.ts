import { api } from "@/config/api";
import { getUserData } from "@/config/mmkvStorage";
import { ScheduledServiceType } from "@/types/ScheduleServiceType";

export async function getProfileScheduledServices(status: number = 1) {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<ScheduledServiceType[]>(`/services/schedule/get-by-profile-id/${user.id}/${status}`);

  return data;
}