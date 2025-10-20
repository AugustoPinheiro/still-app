import { api } from '@/config/api';
import { getUserData } from '@/config/mmkvStorage';

export async function getOffersById(
  postId?: number,
  status?: string,
  myOwn?: boolean,
  offerId?: number
) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('User not found');
  }

  const params: any = {};

  if (postId && postId !== 'null') {
    params.post_id = postId;
  }

  if (status) {
    params.status = status;
  }

  if (myOwn === true) {
    params.made_by_me = myOwn;
  }

  const { data } = await api.get(`/offers/${user.id}`, {
    params,
  });

  const hasMyOffer = offerId
    ? data?.result?.filter((offer: any) => offer?.id === Number(offerId))?.length > 0
    : false;

  const checkIsMadeByMe = data?.result?.length === 0 || !hasMyOffer;

  if (checkIsMadeByMe) {
    const response = await api.get(`/offers/${user.id}`, {
      params: { ...params, made_by_me: true },
    });

    return response.data?.result;
  }

  return data?.result;
}

export async function putOfferAccept(offerId: number) {
  const { data } = await api.put(`/offers/${offerId}/accept`);

  return data?.result;
}

export async function putOfferDecline(offerId: number) {
  const { data } = await api.put(`/offers/${offerId}/decline`);

  return data?.result;
}

export async function postRating(profileId: number, rating: number, comment?: string) {
  const payload = {
    profile_id: profileId,
    rating,
    comment,
  };

  const { data } = await api.post('/profiles/rating', payload);

  return data?.result;
}

export async function putOfferComplete(offerId: number) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('User not found');
  }

  const { data } = await api.put(`/offers/${offerId}/complete/${user.id}`);

  return data;
}

export async function postOfferSupport(offerId: number, message: string) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('User not found');
  }

  const payload = {
    offer_id: offerId,
    message,
    profile_id: user.id,
  };

  const { data } = await api.post('/offers/support', payload);

  return data?.result;
}
