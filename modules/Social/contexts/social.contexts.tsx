import React, { createContext, useContext } from 'react';

import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { getSocialFollowRequests } from '@/modules/Social/services/social.services';
import { FollowRequestType } from '@/types/FollowRequestType';
import { ResponseType } from '@/types/ResponseType';

type SocialContextType = {
  followRequests: FollowRequestType[];
  isLoadingFollowRequests: boolean;
  refetchFollowRequests: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<InfiniteData<never[] | ResponseType<FollowRequestType[]>, unknown>, Error>
  >;
  fetchNextPageFollowRequests: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<never[] | ResponseType<FollowRequestType[]>, unknown>,
      Error
    >
  >;
  hasNextPageFollowRequests?: boolean;
  isFetchingNextPageFollowRequests: boolean;
  isFetchingFollowRequests: boolean;
};

const SocialContext = createContext<SocialContextType | undefined>(undefined);

const useSocial = (): SocialContextType => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialContextProvider');
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

const SocialContextProvider = ({ children }: Props) => {
  async function fetchSocialFollowRequests({ pageParam = undefined }) {
    try {
      const data = await getSocialFollowRequests(pageParam);

      return data;
    } catch (error: any) {
      return [];
    }
  }

  const {
    data: followRequestsPage,
    isLoading: isLoadingFollowRequests,
    refetch: refetchFollowRequests,
    fetchNextPage: fetchNextPageFollowRequests,
    hasNextPage: hasNextPageFollowRequests,
    isFetchingNextPage: isFetchingNextPageFollowRequests,
    isFetching: isFetchingFollowRequests,
  } = useInfiniteQuery({
    queryKey: ['socialFollowRequests'],
    queryFn: fetchSocialFollowRequests,
    initialPageParam: undefined,
    getNextPageParam: (lastPage: any) => lastPage?.meta?.cursor,
  });

  const followRequests = React.useMemo(
    () =>
      followRequestsPage?.pages.flatMap((page: any) =>
        page?.result ? page?.result : []
      ) as FollowRequestType[],
    [followRequestsPage?.pages]
  );

  return (
    <SocialContext.Provider
      value={{
        followRequests,
        isLoadingFollowRequests,
        refetchFollowRequests,
        fetchNextPageFollowRequests,
        hasNextPageFollowRequests,
        isFetchingNextPageFollowRequests,
        isFetchingFollowRequests,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export { SocialContextProvider, useSocial };
