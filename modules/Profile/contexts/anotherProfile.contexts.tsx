import React, { createContext } from 'react';

import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import {
  getClosetByUsername,
  getClosetLookByUsername,
  getProfileByProfileId,
  getSocialPostsByUsername,
  getSocialPostsSavedByUsername,
} from '@/modules/Social/services/anotherpersonprofile.services';
import { ClosetClothingListsType, ClosetLookListsType } from '@/types/ClosetClothingType';
import { PostsListsType } from '@/types/PostsType';
import { ProfileAnotherUserType } from '@/types/ProfileType';
import { SocialSavedPostFolderType } from '@/types/SocialSavedPostFolder';

type AnotherProfileContextType = {
  selectedTab: 'posts' | 'saved' | 'closet';
  setSelectedTab: React.Dispatch<React.SetStateAction<AnotherProfileContextType['selectedTab']>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userData: ProfileAnotherUserType | undefined;
  isLoadingUser: boolean;
  posts: InfiniteData<PostsListsType | undefined> | undefined;
  isLoadingPosts: boolean;
  fetchNextPagePosts: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PostsListsType | undefined, unknown>>;
  hasNextPagePosts: boolean | undefined;
  isFetchingNextPagePosts: boolean | undefined;
  postsSaved: SocialSavedPostFolderType[] | undefined;
  isLoadingSaved: boolean;
  closetClothing: InfiniteData<ClosetClothingListsType | undefined> | undefined;
  isLoadingClosetClothing: boolean | undefined;
  fetchNextPageClosetClothing: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ClosetClothingListsType | undefined, unknown>>;
  hasNextPageClosetClothing: boolean | undefined;
  isFetchingNextPageClosetClothing: boolean | undefined;
  refetchPosts: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<InfiniteData<PostsListsType | undefined>, unknown>>;
  closetLook: InfiniteData<ClosetLookListsType | undefined> | undefined;
  isLoadingClosetLook: boolean | undefined;
  fetchNextPageClosetLook: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ClosetLookListsType | undefined, unknown>>;
  hasNextPageClosetLook: boolean | undefined;
  isFetchingNextPageClosetLook: boolean | undefined;
  refetchAll: () => Promise<void>;
  refetchUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ProfileAnotherUserType | undefined, unknown>>;
};

const AnotherProfileContext = createContext<AnotherProfileContextType>(
  {} as AnotherProfileContextType
);

export function useAnotherProfile() {
  const context = React.useContext(AnotherProfileContext);

  if (!context) {
    throw new Error('useAnotherProfile must be used within an ProfileProvider');
  }

  return context;
}

export const AnotherProfileProvider = ({ children }: any) => {
  const [selectedTab, setSelectedTab] =
    React.useState<AnotherProfileContextType['selectedTab']>('posts');
  const [username, setUsername] = React.useState<string>('');

  const {
    data: userData,
    refetch: refetchUser,
    isLoading: isLoadingUser,
  } = useQuery({
    queryKey: ['profileData', username],
    queryFn: async () => await getProfileByProfileId(username),
    enabled: !!username,
  });

  async function fetchPosts({ pageParam = undefined }) {
    const response = await getSocialPostsByUsername(username, pageParam);

    return response;
  }

  const {
    data: posts,
    isLoading: isLoadingPosts,
    refetch: refetchPosts,
    fetchNextPage: fetchNextPagePosts,
    hasNextPage: hasNextPagePosts,
    isFetchingNextPage: isFetchingNextPagePosts,
  } = useInfiniteQuery({
    queryKey: ['profileUserPosts', username],
    queryFn: fetchPosts,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    enabled: !!username,
  });

  const { data: postsSaved, isLoading: isLoadingSaved } = useQuery({
    queryKey: ['profilePostsSaved', username],
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
    queryKey: ['profileClosetClothing', username],
    queryFn: async ({ pageParam = undefined }) => await getClosetByUsername(username, pageParam),
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
    queryKey: ['profileClosetLook', username],
    queryFn: async ({ pageParam = undefined }) =>
      await getClosetLookByUsername(username, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    enabled: !!username,
  });

  async function refetchAll() {
    refetchUser();
    refetchPosts();
    refetchClosetClothing();
    refetchClosetLook();
  }

  return (
    <AnotherProfileContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        setUsername,
        userData,
        isLoadingUser,
        posts,
        isLoadingPosts,
        fetchNextPagePosts,
        hasNextPagePosts,
        isFetchingNextPagePosts,
        postsSaved,
        isLoadingSaved,
        closetClothing,
        isLoadingClosetClothing,
        fetchNextPageClosetClothing,
        hasNextPageClosetClothing,
        isFetchingNextPageClosetClothing,
        refetchPosts,
        closetLook,
        isLoadingClosetLook,
        fetchNextPageClosetLook,
        hasNextPageClosetLook,
        isFetchingNextPageClosetLook,
        refetchAll,
        refetchUser,
      }}
    >
      {children}
    </AnotherProfileContext.Provider>
  );
};
