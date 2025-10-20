import React, { createContext } from 'react';

import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import { getProfile } from '@/config/mmkvStorage';
import {
  getProfileArchivedPosts,
  getProfileByUsername,
  getProfilePosts,
  getProfileCards
} from '@/modules/Profile/services/profile.services';
import {
  getClosetByUsername,
  getClosetLookByUsername,
  getSocialPostsSavedByUsername,
} from '@/modules/Social/services/anotherpersonprofile.services';
import { ProfileType } from '@/types/ProfileType';
import { ResponseType } from '@/types/ResponseType';
import { SocialFeedType } from '@/types/SocialFeedType';
import { SocialSavedPostFolderType } from '@/types/SocialSavedPostFolder';
import { CreditCard } from '@/types/CreditCardType';

type ProfileContextType = {
  selectedTab: 'posts' | 'saved' | 'closet';
  setSelectedTab: React.Dispatch<React.SetStateAction<ProfileContextType['selectedTab']>>;
  userData: ProfileType | undefined;
  isLoadingUser: boolean;
  isFetchingUser: boolean;
  posts: InfiniteData<ResponseType<SocialFeedType[]>> | undefined;
  isLoadingPosts: boolean;
  fetchNextPagePosts: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<ResponseType<SocialFeedType[]>, unknown>, Error>
  >;
  hasNextPagePosts: boolean | undefined;
  isFetchingNextPagePosts: boolean | undefined;
  postsSaved: SocialSavedPostFolderType[] | undefined;
  isLoadingSaved: boolean;
  closetClothing: InfiniteData<unknown, unknown> | undefined;
  isLoadingClosetClothing: boolean | undefined;
  fetchNextPageClosetClothing: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>>;
  hasNextPageClosetClothing: boolean | undefined;
  isFetchingNextPageClosetClothing: boolean | undefined;
  refetchPosts: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<ResponseType<SocialFeedType[]>, unknown>, Error>>;
  closetLook: InfiniteData<unknown, unknown> | undefined;
  isLoadingClosetLook: boolean | undefined;
  fetchNextPageClosetLook: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>>;
  hasNextPageClosetLook: boolean | undefined;
  isFetchingNextPageClosetLook: boolean | undefined;
  refetchAll: () => Promise<void>;
  refetchUser: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProfileType | undefined, Error>>;
  archivedPosts: InfiniteData<unknown, unknown> | undefined;
  isLoadingArchivedPosts: boolean | undefined;
  fetchNextPageArchivedPosts: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>>;
  hasNextPageArchivedPosts: boolean | undefined;
  isFetchingNextPageArchivedPosts: boolean | undefined;
  refetchArchivedPosts: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<unknown, unknown>, Error>>;
  isFetchingPosts: boolean | undefined;
  refetchClosetClothing: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<unknown, unknown>, Error>>;
  refetchClosetLook: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<unknown, unknown>, Error>>;
  refetchPostsSaved: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SocialSavedPostFolderType[] | undefined, Error>>;

  cards: CreditCard[] | undefined;
  isLoadingCards: boolean;
  hasNextPageCards: boolean | undefined;
  isFetchingNextPageCards: boolean | undefined;
  refetchCards: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<unknown, unknown>, Error>>;
};

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);

export function useProfile() {
  const context = React.useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within an ProfileProvider');
  }

  return context;
}

export const ProfileProvider = ({ children }: any) => {
  const [selectedTab, setSelectedTab] = React.useState<ProfileContextType['selectedTab']>('posts');
  const user = getProfile();
  const username = user?.username ?? '';

  const {
    data: userData,
    refetch: refetchUser,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
  } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => await getProfileByUsername(),
  });

  async function fetchPosts({ pageParam = undefined }) {
    const data = await getProfilePosts(pageParam);

    return data;
  }

  const {
    data: posts,
    isLoading: isLoadingPosts,
    refetch: refetchPosts,
    fetchNextPage: fetchNextPagePosts,
    isFetching: isFetchingPosts,
    hasNextPage: hasNextPagePosts,
    isFetchingNextPage: isFetchingNextPagePosts,
  } = useInfiniteQuery({
    queryKey: ['profileUserPosts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const {
    data: archivedPosts,
    isLoading: isLoadingArchivedPosts,
    refetch: refetchArchivedPosts,
    fetchNextPage: fetchNextPageArchivedPosts,
    hasNextPage: hasNextPageArchivedPosts,
    isFetchingNextPage: isFetchingNextPageArchivedPosts,
  } = useInfiniteQuery({
    queryKey: ['profileUserArchivedPosts'],
    queryFn: async ({ pageParam = undefined }) => await getProfileArchivedPosts(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const {
    data: postsSaved,
    refetch: refetchPostsSaved,
    isLoading: isLoadingSaved,
  } = useQuery({
    queryKey: ['profilePostsSaved'],
    queryFn: async ({ pageParam = undefined }) =>
      await getSocialPostsSavedByUsername(username, pageParam),
    enabled: !!username,
  });

  const {
    data: closetClothing,
    isLoading: isLoadingClosetClothing,
    refetch: refetchClosetClothing,
    fetchNextPage: fetchNextPageClosetClothing,
    hasNextPage: hasNextPageClosetClothing,
    isFetchingNextPage: isFetchingNextPageClosetClothing,
  } = useInfiniteQuery({
    queryKey: ['profileClosetClothing'],
    queryFn: async ({ pageParam }) => await getClosetByUsername(username, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    enabled: !!username,
  });

  const {
    data: closetLook,
    isLoading: isLoadingClosetLook,
    refetch: refetchClosetLook,
    fetchNextPage: fetchNextPageClosetLook,
    hasNextPage: hasNextPageClosetLook,
    isFetchingNextPage: isFetchingNextPageClosetLook,
  } = useInfiniteQuery({
    queryKey: ['profileClosetLook'],
    queryFn: async ({ pageParam = undefined }) =>
      await getClosetLookByUsername(username, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    enabled: !!username,
  });

  const {
    data,
    isLoading: isLoadingCards,
    refetch: refetchCards,
    hasNextPage: hasNextPageCards,
    isFetchingNextPage: isFetchingNextPageCards,
  } = useInfiniteQuery({
    queryKey: ['profileUserCards'],
    queryFn: async ({ pageParam = undefined }) =>
      await getProfileCards(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });
  const cards = React.useMemo(
    () => data?.pages?.flatMap((page: any) => page?.result ?? []) ?? [],
    [data]
  );

  async function refetchAll() {
    refetchUser();
    refetchPosts();
    refetchClosetClothing();
    refetchClosetLook();
    refetchPostsSaved();
    refetchCards();
  }

  return (
    <ProfileContext.Provider
      value={{
        archivedPosts,
        closetClothing,
        closetLook,
        fetchNextPageArchivedPosts,
        fetchNextPageClosetClothing,
        fetchNextPageClosetLook,
        fetchNextPagePosts,
        hasNextPageArchivedPosts,
        hasNextPageClosetClothing,
        hasNextPageClosetLook,
        hasNextPagePosts,
        isFetchingNextPageArchivedPosts,
        isFetchingNextPageClosetClothing,
        isFetchingNextPageClosetLook,
        isFetchingNextPagePosts,
        isFetchingPosts,
        isLoadingArchivedPosts,
        isLoadingClosetClothing,
        isLoadingClosetLook,
        isLoadingPosts,
        isLoadingSaved,
        isLoadingUser,
        posts,
        postsSaved,
        refetchAll,
        refetchArchivedPosts,
        refetchPosts,
        refetchUser,
        refetchClosetClothing,
        refetchClosetLook,
        selectedTab,
        setSelectedTab,
        userData,
        refetchPostsSaved,
        isFetchingUser,
        cards,
        isLoadingCards,
        isFetchingNextPageCards,
        hasNextPageCards,
        refetchCards,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
