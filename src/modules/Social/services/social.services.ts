import { format } from 'date-fns';

import { api } from '@/config/api';
import { getUserData, isLogged } from '@/config/mmkvStorage';
import { NotificationType } from '@/modules/Social/components/NotificationsListByDate';
import {
  ISelectClothing,
  ISelectUserOrStore,
} from '@/modules/Social/screens/NewPost/contexts/newPost.contexts';
import { FollowRequestType } from '@/types/FollowRequestType';
import { ResponseType } from '@/types/ResponseType';
import { SocialCommentType } from '@/types/SocialCommentType';
import { SocialFeedType } from '@/types/SocialFeedType';
import { SocialPostType } from '@/types/SocialPostType';
import { SocialProfileType } from '@/types/SocialProfileType';
import { SocialSaveFolderType } from '@/types/SocialSaveFolderType';
import { SocialSavedPostFolderType } from '@/types/SocialSavedPostFolder';
import { SocialSavedPostFolderDetailsType } from '@/types/SocialSavedPostFolderDetails';
import { convertLocalIdentifierToAssetLibrary } from '@/utils/convertLocalIdentifierToAssetLibrary';

type PostSocialPostParams = {
  description?: string;
  image: string;
  tags?: number[];
  clothing?: ISelectClothing[];
  people?: ISelectUserOrStore[];
  accept_offer?: boolean;
};

type SearchProfilesResponse = {
  data: SocialProfileType[];
  count: number;
};

export async function getSocialPosts() {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<ResponseType<SocialPostType[]>>(`/social/posts/${user.id}`);

  return data;
}

export async function getSocialFeed(cursor?: number) {
  const user = getUserData();

  if (!user?.id || !isLogged()) {
    const { data } = await api.get<ResponseType<SocialFeedType>>(`/social/discover/`, {
      params: { cursor },
    });

    return data;
  }

  const { data } = await api.get<ResponseType<SocialFeedType[]>>(`/social/feed/${user.id}`, {
    params: { cursor, limit: 10 },
  });

  return data;
}

export async function postSocialPost(
  payload: PostSocialPostParams,
  needsConvertImage: boolean = false
) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const formData = new FormData();
  const date = format(new Date(), 'yyyyMMddhhmmss');

  if (payload?.image) {
    const image =
      needsConvertImage && payload.image.includes('ph://')
        ? convertLocalIdentifierToAssetLibrary(payload.image.replace('ph://', ''), 'jpg')
        : payload.image;

    const file = {
      uri: image,
      type: 'image/jpeg',
      name: `${user.username}_${date}.jpg`,
    };

    formData.append('image', file as unknown as File);
  }

  // formData.append('image_url', payload?.image);
  formData.append('description', payload?.description ?? '');
  formData.append('profile_id', String(user.id));
  formData.append('accept_offer', String(payload.accept_offer ?? false));

  // if (payload.tags?.length) {
  //   payload.tags.forEach((tag, index) => {
  //     formData.append(`tags[${index}]`, String(tag));
  //   });
  // }

  if (payload.clothing?.length) {
    payload.clothing.forEach((clothing, index) => {
      formData.append(`clothing[${index}][clothing_id]`, `${clothing.id}`);
      formData.append(`clothing[${index}][pos_x]`, `${clothing.pos.x}`);
      formData.append(`clothing[${index}][pos_y]`, `${clothing.pos.y}`);
    });
  }

  if (payload.people?.length) {
    payload.people.forEach((people, index) => {
      formData.append(`people[${index}][profile_id]`, `${people.id}`);
      formData.append(`people[${index}][pos_x]`, `${people.pos.x}`);
      formData.append(`people[${index}][pos_y]`, `${people.pos.y}`);
    });
  }

  const { data } = await api.post('/social/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export async function postSocialToggleLike(postId: number, like: boolean) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const url = !like ? '/social/like' : '/social/dislike';

  const payload = {
    post_id: postId,
    profile_id: user.id,
  };

  await api.post(url, payload);
}

export async function getSocialComments(postId: number, cursor?: number) {
  const { data } = await api.get<ResponseType<SocialCommentType[]>>(
    `/social/post-meta/${postId}/comments`,
    {
      params: { limit: 20, cursor },
    }
  );

  return data;
}

export async function deleteSocialComment(commentId: number) {
  await api.delete(`/social/comment/${commentId}`);
}

export async function postSocialComment(postId: number, text: string) {
  try {
    const user = getUserData();

    if (!user?.id) {
      throw new Error('Profile not found');
    }

    const payload = {
      profile_id: user.id,
      text,
    };

    await api.post(`/social/post/${postId}/comment`, payload);
  } catch (er) {
    console.error(er);
  }
}

export async function reportReasonList(): Promise<
  Array<{ id: string; description: string; name: 'string' }> | undefined
> {
  const { data } =
    await api.get<Array<{ id: string; description: string; name: 'string' }>>(`/report-reason`);

  return data;
}

export async function postReport({
  reason,
  details,
  id,
  isProfile,
  reasonId,
}: {
  reasonId: string;
  reason: string;
  details: string;
  id: string;
  isProfile: boolean;
}) {
  const payload = {
    reason_id: reasonId,
    reason,
    details,
  };

  if (isProfile) {
    await api.post(`/profiles/${id}/report`, payload);
  } else {
    await api.post(`/social/post/${id}/report`, payload);
  }
}

export async function getSocialSavedPostsFolders() {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<SocialSavedPostFolderType[]>(
    `/social/saved-posts/folders/${user.username}`
  );

  return data;
}

export async function getSocialSavedPostsFolderDetails(folderId: number) {
  const { data } = await api.get<SocialSavedPostFolderDetailsType>(
    `/social/saved-posts/folder/${folderId}`
  );

  return data;
}

export async function postSocialSavedPostsFolder(title: string, isPrivate?: boolean) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const payload = {
    title,
    profile_id: user.id,
    private: isPrivate,
  };

  const { data } = await api.post<SocialSaveFolderType>('/social/saved-posts/folders', payload);

  return data;
}

export async function postSocialSavedPost(folderId: number, postId: number, isPrivate?: boolean) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const payload = {
    profile_id: user.id,
    folder_id: folderId,
    post_id: postId,
    private: isPrivate,
  };

  await api.post(`/social/saved-posts`, payload);
}

export async function savePostNewFolder(title: string, isPrivate: boolean, postId: number) {
  const folder = await postSocialSavedPostsFolder(title, isPrivate);

  await postSocialSavedPost(folder.id, postId, isPrivate);
}

export async function searchProfiles(
  type?: 'common' | 'professional' | 'store',
  search?: string,
  page = 1,
  stylistFilter = ''
) {
  const user = getUserData();

  // if (!user?.id) {
  //   throw new Error('Profile not found');
  // }

  const params: any = {
    profile_id: user?.id,
    profileTypes: type ?? null,
    limit: 10,
    page,
  };

  if (search) {
    params.search = search;
  }

  if (stylistFilter.length) {
    params.serviceType = stylistFilter;
  }

  const { data } = await api.get<SearchProfilesResponse>(`/profiles/search/`, {
    params,
  });

  return data;
}

export async function getNotificationsCount() {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<number>(`/notifications/new/${user.id}`);

  return data;
}

export async function getSocialNotifications({ pageParam = undefined }) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<ResponseType<NotificationType[]>>(
    `/notifications/list/${user.id}`,
    {
      params: { cursor: pageParam, limit: 20 },
    }
  );

  return data;
}

export async function readNotifications(notifications: number[]) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const payload = {
    profile_id: user.id,
    notifications,
  };

  await api.post(`/notifications/seen`, payload);
}

export async function getSocialPostDetails(postId: number) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<SocialFeedType>(`/social/post/${postId}/${user?.id}`);

  return data;
}

export async function getSocialDiscover(cursor?: number) {
  const user = getUserData();
  const { data } = await api.get<ResponseType<SocialFeedType>>(`/social/discover/${user?.id}`, {
    params: { cursor, limit: 16 },
  });

  return data;
}

export async function postSocialOffer(data: {
  value: number;
  postId: number;
  postProfileId: number;
  description: string;
  clothings: number[];
}) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const payload = {
    profile_id: user.id,
    post_id: data.postId,
    for_profile_id: data.postProfileId,
    value: data.value,
    description: data.description ?? '',
    clothings: data?.clothings ?? [],
  };

  await api.post(`/offers`, payload);
}

export async function getSocialFollowRequests(cursor?: number) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<ResponseType<FollowRequestType[]>>(
    `/profiles/${user.username}/follow-requests`,
    {
      params: { cursor },
    }
  );

  return data;
}

export async function putAcceptFollowRequest(username: string) {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  await api.put(`/profiles/${user.username}/accept-follow-from/${username}`);
}

export async function deleteFollowRequest(username: string) {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  await api.delete(`/profiles/${user.username}/follow-requests/${username}`);
}

export async function getPsInvites({ pageParam = undefined }) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<ResponseType<Array<{
    id: number,
    profile_id: number,
    client_profile_id: number,
    approved_by_profile: boolean,
    approved_by_client: boolean,
    profile: {
      id: number,
      username: string,
      professional_profile: {
        avatar: string, 
        name: string, 
        last_name: string
      }
    },
    created_at: string,
    updated_at: string
  }>>>(
    `/profiles/client-relation-request/${user.id}/false?status=pending`,
    {
      params: { cursor: pageParam, limit: 20 },
    }
  );

  return data;
}

export async function putAcceptPsInvite(inviteId: number) {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  await api.put(`/profiles/client-relation-request/${inviteId}/${user.id}/true`);
}

export async function deletePsInvites(inviteId: number) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }
  await api.delete(`/profiles/client-relation-request/${inviteId}/${user.id}`);
}