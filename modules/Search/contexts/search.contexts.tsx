import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  FetchNextPageOptions,
  FetchPreviousPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useToast } from '@/contexts/Toast.contexts';
import { useDebounce } from '@/hooks/useDebounce';
import {
  GetSearchClothingsResponse,
  getSearchClothings,
} from '@/modules/Search/services/search.services';
import { getSocialDiscover, searchProfiles } from '@/modules/Social/services/social.services';
import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ResponseType } from '@/types/ResponseType';
import { SocialFeedType } from '@/types/SocialFeedType';
import { SocialProfileType } from '@/types/SocialProfileType';

type SearchContextType = {
  users: Array<SocialProfileType | undefined> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;

  usersPersonalStylist: Array<SocialProfileType | undefined> | undefined;
  isLoadingPersonalStylist: boolean;
  isFetchingPersonalStylist: boolean;
  searchPersonalStylist: string;
  setSearchPersonalStylist: React.Dispatch<React.SetStateAction<string>>;
  filterStylist: string;
  setFilterStylist: React.Dispatch<React.SetStateAction<string>>;
  hasNextPagePersonalStylist: boolean;
  fetchNextPagePersonalStylist: () => void;
  isFetchingNextPagePersonalStylist: boolean;

  usersStores: Array<SocialProfileType | undefined> | undefined;
  isLoadingStores: boolean;
  isFetchingStores: boolean;
  searchStores: string;
  setSearchStore: React.Dispatch<React.SetStateAction<string>>;
  hasNextPageStores: boolean;
  fetchNextPageStores: () => void;
  isFetchingNextPageStores: boolean;

  clothings: ClosetClothingType[] | undefined;
  isLoadingClothings: boolean;
  isFetchingClothings: boolean;
  hasNextPageClothings: boolean;
  isFetchingNextPageClothings: boolean;
  refetchClothings: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<InfiniteData<GetSearchClothingsResponse | undefined, unknown>, Error>
  >;
  fetchNextPageClothings: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<GetSearchClothingsResponse | undefined, unknown>,
      Error
    >
  >;
  searchClothings: string;
  setSearchClothings: React.Dispatch<React.SetStateAction<string>>;
  filters:
    | {
        categories?: number[] | undefined;
        attributes?: number[] | undefined;
      }
    | undefined;
  setFilters: React.Dispatch<
    React.SetStateAction<
      | {
          categories?: number[] | undefined;
          attributes?: number[] | undefined;
        }
      | undefined
    >
  >;
  highlights: Array<SocialFeedType | undefined>;
  refetchHighlights: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<InfiniteData<ResponseType<SocialFeedType> | undefined, unknown>, Error>
  >;
  hasNextPageHighlights: boolean;
  fetchNextPageHighlights: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<ResponseType<SocialFeedType> | undefined, unknown>,
      Error
    >
  >;
  isFetchingNextPageHighlights: boolean;
  cleanupMorePages: () => void;
  fetchPreviousPageHighlights: (
    options?: FetchPreviousPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<ResponseType<SocialFeedType> | undefined, unknown>,
      Error
    >
  >;
  isFetchingPreviousPageHighlights: boolean;
  hasPreviousPageHighlights: boolean;
};

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

type SearchProviderProps = {
  children: React.ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const { show } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [searchPersonalStylist, setSearchPersonalStylist] = useState('');
  const [filterStylist, setFilterStylist] = useState('');
  const [searchStore, setSearchStore] = useState('');
  const debounceValue = useDebounce<string>(search, 700);
  const debounceValuePersonalStylist = useDebounce<string>(searchPersonalStylist, 700);
  const debounceValueStore = useDebounce<string>(searchStore, 700);
  const [searchClothings, setSearchClothings] = React.useState('');
  const debounceValueClothing = useDebounce<string>(searchClothings, 700);
  const [filters, setFilters] = React.useState<{
    categories?: number[];
    attributes?: number[];
  }>();

  const fetchClothings = async ({ pageParam }) => {
    try {
      const data = await getSearchClothings(searchClothings, filters, pageParam);
      return data;
    } catch (error) {
      show({ type: 'error', message: 'Erro ao buscar peças da comunidade' });
    }
  };

  const {
    data: clothingsPages,
    isLoading: isLoadingClothings,
    isFetching: isFetchingClothings,
    refetch: refetchClothings,
    fetchNextPage: fetchNextPageClothings,
    hasNextPage: hasNextPageClothings,
    isFetchingNextPage: isFetchingNextPageClothings,
  } = useInfiniteQuery({
    queryKey: ['ClothingsOnSale', debounceValueClothing, filters],
    queryFn: fetchClothings,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    staleTime: 1000 * 60,
  });

  const clothings = React.useMemo(
    () => clothingsPages?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [clothingsPages?.pages]
  );

  const fetchSearch = async ({ pageParam }) => {
    try {
      const data = await searchProfiles("common", search, pageParam);

      return data;
    } catch (error) {
      console.error(error);

      show({
        message: 'Erro ao carregar perfis, tente novamente mais tarde',
        type: 'error',
      });
    }
  };

  const {
    data: usersPages,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['searchProfiles', debounceValue],
    queryFn: fetchSearch,
    initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => {
      const limit = 10;
      const total = lastPage?.count ?? 0;
      const totalPage = Math.ceil(total / limit);
      const count = (pages?.length ?? 0) + 1;

      return count <= totalPage ? count : undefined;
    },
    staleTime: 1000 * 60,
  });

  const users = React.useMemo(
    () => usersPages?.pages?.flatMap((page) => page?.data ?? []) ?? [],
    [usersPages?.pages]
  );

  const fetchSearchPersonalStylist = async ({ pageParam }) => {
    try {
      const data = await searchProfiles('professional', searchPersonalStylist, pageParam, filterStylist);

      return data;
    } catch (error) {
      console.error(error);

      show({
        message: 'Erro ao carregar perfis, tente novamente mais tarde',
        type: 'error',
      });
    }
  };

  const {
    data: usersPagesPersonalStylist,
    isLoading: isLoadingPersonalStylist,
    isFetching: isFetchingPersonalStylist,
    hasNextPage: hasNextPagePersonalStylist,
    fetchNextPage: fetchNextPagePersonalStylist,
    isFetchingNextPage: isFetchingNextPagePersonalStylist,
  } = useInfiniteQuery({
    queryKey: ['searchProfilesPersonalStylist', debounceValuePersonalStylist, filterStylist],
    queryFn: fetchSearchPersonalStylist,
    initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => {
      const limit = 10;
      const total = lastPage?.count ?? 0;
      const totalPage = Math.ceil(total / limit);
      const count = (pages?.length ?? 0) + 1;

      return count <= totalPage ? count : undefined;
    },
    staleTime: 1000 * 60,
  });

  const usersPersonalStylist = React.useMemo(
    () => usersPagesPersonalStylist?.pages?.flatMap((page) => page?.data ?? []) ?? [],
    [usersPagesPersonalStylist?.pages]
  );

  const fetchSearchStores = async ({ pageParam }) => {
    try {
      const data = await searchProfiles('store', searchStore, pageParam);

      return data;
    } catch (error) {
      console.error(error);

      show({
        message: 'Erro ao carregar perfis, tente novamente mais tarde',
        type: 'error',
      });
    }
  };

  const {
    data: usersPagesStores,
    isLoading: isLoadingStores,
    isFetching: isFetchingStores,
    hasNextPage: hasNextPageStores,
    fetchNextPage: fetchNextPageStores,
    isFetchingNextPage: isFetchingNextPageStores,
  } = useInfiniteQuery({
    queryKey: ['searchProfilesStores', debounceValueStore],
    queryFn: fetchSearchStores,
    initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => {
      const limit = 10;
      const total = lastPage?.count ?? 0;
      const totalPage = Math.ceil(total / limit);
      const count = (pages?.length ?? 0) + 1;

      return count <= totalPage ? count : undefined;
    },
    staleTime: 1000 * 60,
  });

  const usersStores = React.useMemo(
    () => usersPagesStores?.pages?.flatMap((page) => page?.data ?? []) ?? [],
    [usersPagesStores?.pages]
  );

  async function fetchDiscover({ pageParam }) {
    try {
      const data = await getSocialDiscover(pageParam);
      return data;
    } catch (error) {
      show({ type: 'error', message: 'Não foi possível carregar os destaques' });
    }
  }

  const {
    data: highlightsPages,
    refetch: refetchHighlights,
    hasNextPage: hasNextPageHighlights,
    hasPreviousPage: hasPreviousPageHighlights,
    fetchNextPage: fetchNextPageHighlights,
    fetchPreviousPage: fetchPreviousPageHighlights,
    isFetchingPreviousPage: isFetchingPreviousPageHighlights,
    isFetchingNextPage: isFetchingNextPageHighlights,
  } = useInfiniteQuery({
    queryKey: ['highlightSearch'],
    queryFn: fetchDiscover,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const highlights = React.useMemo(
    () => highlightsPages?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [highlightsPages?.pages]
  );

  function keepOnlyFirstPage(key: any) {
    queryClient.setQueryData(key, (data: any) => {
      if (!data?.pages) return data;
      return {
        pages: data.pages.slice(0, 1),
        pageParams: data.pageParams?.slice(0, 1) || [],
      };
    });
  }

  function cleanupMorePages() {
    keepOnlyFirstPage(['highlightSearch']);
    keepOnlyFirstPage(['searchProfiles', debounceValue]);
    keepOnlyFirstPage(['ClothingsOnSale', debounceValueClothing, filters]);
  }

  useEffect(() => {
    return () => {
      cleanupMorePages();
    };
  }, []);

  const values = React.useMemo(
    () => ({
      cleanupMorePages,
      clothings,
      fetchNextPage,
      fetchNextPageClothings,
      fetchNextPageHighlights,
      fetchPreviousPageHighlights,
      filters,
      hasNextPage,
      hasNextPageClothings,
      hasNextPageHighlights,
      hasPreviousPageHighlights,
      highlights,
      isFetching,
      isFetchingClothings,
      isFetchingNextPage,
      isFetchingNextPageClothings,
      isFetchingNextPageHighlights,
      isFetchingPreviousPageHighlights,
      isLoading,
      isLoadingClothings,
      refetchClothings,
      refetchHighlights,
      search,
      searchClothings,
      setFilters,
      setSearch,
      setSearchClothings,
      users,

      usersPagesPersonalStylist,
      isLoadingPersonalStylist,
      isFetchingPersonalStylist,
      hasNextPagePersonalStylist,
      fetchNextPagePersonalStylist,
      isFetchingNextPagePersonalStylist,
      searchPersonalStylist,
      setSearchPersonalStylist,
      filterStylist,
      setFilterStylist,
      usersPersonalStylist,

      usersPagesStores,
      isLoadingStores,
      isFetchingStores,
      hasNextPageStores,
      fetchNextPageStores,
      isFetchingNextPageStores,
      searchStores: searchStore,
      setSearchStore,
      usersStores,
    }),
    [
      clothings,
      filters,
      hasNextPage,
      hasNextPageClothings,
      hasNextPageHighlights,
      hasPreviousPageHighlights,
      highlights,
      isFetching,
      isFetchingClothings,
      isFetchingNextPage,
      isFetchingNextPageClothings,
      isFetchingNextPageHighlights,
      isFetchingPreviousPageHighlights,
      isLoading,
      isLoadingClothings,
      search,
      searchClothings,
      users,

      usersPagesPersonalStylist,
      isLoadingPersonalStylist,
      isFetchingPersonalStylist,
      hasNextPagePersonalStylist,
      isFetchingNextPagePersonalStylist,
      searchPersonalStylist,
      filterStylist,
      usersPersonalStylist,

      usersPagesStores,
      isLoadingStores,
      isFetchingStores,
      hasNextPageStores,
      isFetchingNextPageStores,
      searchStore,
      usersStores,
    ]
  );

  return <SearchContext.Provider value={values}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within an SearchProvider');
  }

  return context;
};
