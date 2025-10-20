import { api } from "@/config/api";
import { getUserData } from "@/config/mmkvStorage";
import { OrderType, PayOrderType } from "@/types/OrderType";
import { ResponseType } from '@/types/ResponseType';

export async function getProfileOrders(status: string = 'pending', cursor?: number) {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<ResponseType<OrderType[]>>(`/services/orders/get-by-profile-id/${user.id}/${status}`, {
    params: { cursor },
  });

  return data;
}

export async function postProfilePayOrder(order_id: number, payload: PayOrderType) {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  const data = await api.post<void>(`/services/order/${order_id}/pay`, payload);

  return data;
}