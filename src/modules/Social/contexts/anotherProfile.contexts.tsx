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

import { useToast } from '@/contexts/Toast.contexts';
import { useDebounce } from '@/hooks/useDebounce';
import {
  getClosetByUsername,
  getClosetLookByUsername,
  getProfileByProfileId,
  getSocialPostsByUsername,
  getSocialPostsSavedByUsername,
} from '@/modules/Social/services/anotherpersonprofile.services';
import {
  ClosetClothingListsType,
  ClosetClothingType,
  ClosetLookListsType,
} from '@/types/ClosetClothingType';
import { PostsListsType } from '@/types/PostsType';
import { ProfileAnotherUserType } from '@/types/ProfileType';
import { SocialSavedPostFolderType } from '@/types/SocialSavedPostFolder';

type AnotherProfileContextType = {
  clothings: ClosetClothingType[] | undefined;
  searchClosetClothing: string | undefined;
  setSearchClosetClothing: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: 'posts' | 'saved' | 'closet';
  setSelectedTab: React.Dispatch<React.SetStateAction<AnotherProfileContextType['selectedTab']>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userData: ProfileAnotherUserType | undefined;
  isLoadingUser: boolean;
  posts: InfiniteData<PostsListsType | undefined> | undefined;
  isLoadingPosts: boolean;
  fetchNextPagePosts: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<PostsListsType | undefined, unknown>, Error>
  >;
  hasNextPagePosts: boolean | undefined;
  isFetchingNextPagePosts: boolean | undefined;
  postsSaved: SocialSavedPostFolderType[] | undefined;
  isLoadingSaved: boolean;
  closetClothing: InfiniteData<ClosetClothingListsType | undefined> | undefined;
  isLoadingClosetClothing: boolean | undefined;
  fetchNextPageClosetClothing: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<ClosetClothingListsType | undefined, unknown>, Error>
  >;
  hasNextPageClosetClothing: boolean | undefined;
  isFetchingNextPageClosetClothing: boolean | undefined;
  refetchPosts: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<PostsListsType | undefined, unknown>, Error>>;
  closetLook: InfiniteData<ClosetLookListsType | undefined> | undefined;
  isLoadingClosetLook: boolean | undefined;
  fetchNextPageClosetLook: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<ClosetLookListsType | undefined, unknown>, Error>
  >;
  hasNextPageClosetLook: boolean | undefined;
  isFetchingNextPageClosetLook: boolean | undefined;
  isFetchingUser: boolean;
  refetchAll: () => Promise<void>;
  refetchUser: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProfileAnotherUserType | undefined, Error>>;
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
  const { show } = useToast();
  const [username, setUsername] = React.useState<string>('');

  const [searchClosetClothing, setSearchClosetClothing] = React.useState('');
  const debounceValueClosetClothing = useDebounce<string>(searchClosetClothing, 600);

  async function fetchClosetClothings({ pageParam = undefined }) {
    try {
      const data = await getClosetByUsername(username, pageParam, searchClosetClothing);

      return data;
    } catch (error) {
      show({
        message: 'Erro ao carregar peças, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  async function fetchUserData() {
    const data = await getProfileByProfileId(username);

    return data;
  }

  const {
    data: userData,
    refetch: refetchUser,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
  } = useQuery({
    queryKey: ['profileDataAnother', username],
    queryFn: fetchUserData,
    enabled: Boolean(username),
  });

  const {
    data: posts,
    isLoading: isLoadingPosts,
    refetch: refetchPosts,
    fetchNextPage: fetchNextPagePosts,
    hasNextPage: hasNextPagePosts,
    isFetchingNextPage: isFetchingNextPagePosts,
  } = useInfiniteQuery({
    queryKey: ['profileUserPostsAnother', username],
    initialPageParam: 0,
    queryFn: async ({ pageParam = undefined }) =>
      await getSocialPostsByUsername(username, pageParam),
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    enabled: Boolean(username),
  });

  const { data: postsSaved, isLoading: isLoadingSaved } = useQuery({
    queryKey: ['profilePostsSaved', username],
    queryFn: async ({ pageParam = undefined }) =>
      await getSocialPostsSavedByUsername(username, pageParam),
    enabled: Boolean(username),
  });

  const {
    data: closetClothing,
    isLoading: isLoadingClosetClothing,
    refetch: refetchClosetClothing,
    fetchNextPage: fetchNextPageClosetClothing,
    hasNextPage: hasNextPageClosetClothing,
    isFetchingNextPage: isFetchingNextPageClosetClothing,
  } = useInfiniteQuery({
    queryKey: ['profileClosetClothingAnother', debounceValueClosetClothing, username],
    queryFn: fetchClosetClothings,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    enabled: Boolean(username),
  });

  const clothings = React.useMemo(
    () => closetClothing?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [closetClothing]
  );

  const {
    data: closetLook,
    isLoading: isLoadingClosetLook,
    refetch: refetchClosetLook,
    fetchNextPage: fetchNextPageClosetLook,
    hasNextPage: hasNextPageClosetLook,
    isFetchingNextPage: isFetchingNextPageClosetLook,
  } = useInfiniteQuery({
    queryKey: ['profileClosetLookAnother', String(debounceValueClosetClothing), username],
    queryFn: async ({ pageParam = undefined }) =>
      await getClosetLookByUsername(username, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    enabled: Boolean(username),
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
        clothings,
        searchClosetClothing,
        setSearchClosetClothing,
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
        isFetchingUser,
      }}
    >
      {children}
    </AnotherProfileContext.Provider>
  );
};
