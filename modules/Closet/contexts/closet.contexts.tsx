import React, { createContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { Alert } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';

import { storage } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { useDebounce } from '@/hooks/useDebounce';
import {
  addToClosetFolder,
  deleteClosetClothing,
  deleteClosetInspiration,
  deleteClosetLook,
  deleteFolder,
  getClosetClothings,
  getClosetFolders,
  getClosetInspirations,
  getClosetLooks,
  getClosetLooksSuggestions,
  getClosetProfile,
  saveClosetFolder,
} from '@/modules/Closet/services/closet.services';
import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetFolderType } from '@/types/ClosetFolderType';
import { ClosetInspirationType } from '@/types/ClosetInspirationType';
import { ClosetLookType } from '@/types/ClosetLookType';

interface ClosetProviderProps {
  children: React.ReactNode;
}

type BottomSheetOptionsType = {
  bottomSheetComponent: string;
  snapPoints: Array<string | number>;
  backgroundColor: string;
  hasBackdrop: boolean;
  index: number;
};
type ClosetProfile = { total_clothings: number; total_looks: number; utilization: number };
type ClosetContextType = {
  closetProfile: ClosetProfile;
  isLoadingClosetProfile: boolean;
  addNewFolder: (folderName: string) => Promise<void>;
  bottomSheetOptions: BottomSheetOptionsType;
  bottomSheetRef: React.MutableRefObject<BottomSheet | null>;
  clearAllSelectedItems: () => void;
  clearSelectedClothingsItems: () => void;
  clearSelectedInspirationsItems: () => void;
  clearSelectedLooksItems: () => void;
  closeBottomSheet: () => void;
  clothings: ClosetClothingType[] | undefined;
  collapseBottomSheet: () => void;
  dispatch: React.Dispatch<{ type: string }>;
  deleteClothing: () => Promise<void>;
  deleteLook: (lookId?: number, cb?: () => void) => Promise<true | undefined>;
  deleteInspiration: () => Promise<void>;
  expandBottomSheet: () => void;
  folders: ClosetFolderType[] | undefined;
  allFolders: ClosetFolderType[] | undefined;
  handleSelectClothing: (item: ClosetClothingType) => void;
  handleSelectInspirations: (item: ClosetInspirationType) => void;
  handleSelectLook: (item: ClosetLookType) => void;
  isFetching: boolean;
  isItemSelectedClothing: (item: ClosetClothingType) => boolean;
  isItemSelectedInspirations: (item: ClosetInspirationType) => boolean;
  isItemSelectedLook: (item: ClosetLookType) => boolean;
  isLoading: boolean;
  isLoadingClothings: boolean;
  inspirations: ClosetInspirationType[] | undefined;
  isSelectingClothings: boolean;
  isSelectingInspirations: boolean;
  isSelectingLooks: boolean;
  looks: ClosetLookType[] | undefined;
  looksSuggestions: ClosetLookType[] | undefined;
  isLoadingLooksSuggestions: boolean | undefined;
  isFetchingLooksSuggestions: boolean | undefined;
  fetchClosetLooksSuggestions: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ClosetInspirationType[] | undefined, unknown>>;
  refetchLooksSuggestions: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ClosetInspirationType[] | undefined, unknown>>;
  refetchInspirations: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ClosetInspirationType[] | undefined, unknown>>;
  removeFolder: () => Promise<void>;
  saveSelectedItems: (folder_id: number) => Promise<void>;
  searchClothing: string;
  searchLook: string;
  selectedClothingsItems: ClosetClothingType[];
  selectedFolder: ClosetFolderType | undefined;
  selectedLooksItems: ClosetLookType[];
  selectedInspirationsItems: ClosetInspirationType[];
  setFiltersClothing: React.Dispatch<
    React.SetStateAction<
      | {
          categories?: number[];
          attributes?: number[];
        }
      | undefined
    >
  >;
  setFiltersLook: React.Dispatch<
    React.SetStateAction<
      | {
          categories?: number[];
          attributes?: number[];
        }
      | undefined
    >
  >;
  setSearchClothing: React.Dispatch<React.SetStateAction<string>>;
  setSearchLook: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFolder: React.Dispatch<React.SetStateAction<ClosetFolderType | undefined>>;
  showBottomSheet: boolean;
  addToFolder: (folderId: number) => Promise<void>;
  currentTab: 'clothing' | 'look' | 'inspiration';
  setCurrentTab: React.Dispatch<React.SetStateAction<'clothing' | 'look' | 'inspiration'>>;
  hasNextPageClothings: boolean | undefined;
  isFetchingNextPageClothings: boolean | undefined;
  fetchNextPageClothings: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ClosetClothingType[] | undefined, unknown>>;
  refetchLooks: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ClosetInspirationType[] | undefined, unknown>>;
  hasNextPageLooks: boolean | undefined;
  isFetchingNextPageLooks: boolean | undefined;
  fetchNextPageLooks: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ClosetLookType[] | undefined, unknown>>;
  setLooks: React.Dispatch<React.SetStateAction<ClosetLookType[] | undefined>>;
  setLooksSuggestions: React.Dispatch<React.SetStateAction<ClosetLookType[] | undefined>>;
  hasNextPageLooksSuggestions: boolean | undefined;
  isFetchingNextPageLooksSuggestions: boolean | undefined;
  fetchNextPageLooksSuggestions: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ClosetLookType[] | undefined, unknown>>;
  hasNextPageInspirations: boolean | undefined;
  isFetchingNextPageInspirations: boolean | undefined;
  fetchNextPageInspirations: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ClosetInspirationType[] | undefined, unknown>>;
  filtersClothing?: any;
  filtersLook?: any;
  inspiration?: ClosetInspirationType | undefined;
  setInspiration: React.Dispatch<React.SetStateAction<ClosetInspirationType | undefined>>;
  refetchAllCloset: () => void;
};

const ClosetContext = createContext({} as ClosetContextType);

const ClosetProvider = ({ children }: ClosetProviderProps) => {
  const theme = useTheme();
  const { show } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<'clothing' | 'look' | 'inspiration'>(
    'clothing'
  );
  const [selectedFolder, setSelectedFolder] = React.useState<ClosetFolderType>();
  const [isSelectingClothings, setIsSelectingClothings] = React.useState(false);
  const [selectedClothingsItems, setSelectedClothingsItems] = React.useState<ClosetClothingType[]>(
    []
  );
  let [looksSuggestions, setLooksSuggestions] = React.useState<ClosetLookType[] | undefined>();
  let [looks, setLooks] = React.useState<ClosetLookType[] | undefined>();
  const [inspiration, setInspiration] = React.useState<ClosetInspirationType>();

  const [isSelectingLooks, setIsSelectingLooks] = React.useState(false);
  const [selectedLooksItems, setSelectedLooksItems] = React.useState<ClosetLookType[]>([]);
  const [searchClothing, setSearchClothing] = React.useState('');
  const [searchLook, setSearchLook] = React.useState('');
  const [filtersClothing, setFiltersClothing] = React.useState<{
    categories?: number[];
    attributes?: number[];
  }>();
  const [filtersLook, setFiltersLook] = React.useState<{
    categories?: number[];
    attributes?: number[];
  }>();
  const debounceValueClothing = useDebounce<string>(searchClothing, 600);
  const debounceValueLook = useDebounce<string>(searchLook, 600);

  const [isSelectingInspirations, setIsSelectingInspirations] = React.useState(false);
  const [selectedInspirationsItems, setSelectedInspirationsItems] = React.useState<
    ClosetInspirationType[]
  >([]);
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  async function fetchInspirations({ pageParam = undefined }) {
    try {
      const data = await getClosetInspirations(pageParam);

      return data;
    } catch (error) {
      show({
        message: 'Erro ao carregar inspirações, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  async function fetchClosetClothings({ pageParam = undefined }) {
    try {
      const data = await getClosetClothings(searchClothing, filtersClothing, pageParam);

      if (!data?.result?.length && (filtersClothing || searchClothing)) {
        // setFiltersClothing(undefined);
        // setSearchClothing('');
      }

      return data;
    } catch (error) {
      if (filtersClothing) {
        setFiltersClothing(undefined);

        show({
          message: 'Erro ao realizar consulta, tente novamente mais tarde',
          type: 'error',
        });

        return;
      }

      show({
        message: 'Erro ao carregar peças, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  async function fetchClosetLooks({ pageParam = undefined }) {
    try {
      const data = await getClosetLooks(searchLook, filtersLook, pageParam);

      if (!data?.result?.length && (filtersLook || searchLook)) {
        // setFiltersLook(undefined);
        // setSearchLook('');
        // show({
        //   message:
        //     'Não encontramos looks com esses filtros. Por favor, refine sua busca e tente novamente',
        //   type: 'warning',
        // });
      }

      return data;
    } catch (error) {
      if (filtersLook) {
        setFiltersLook(undefined);

        show({
          message: 'Erro ao realizar consulta, tente novamente mais tarde',
          type: 'error',
        });

        return;
      }

      show({
        message: 'Erro ao carregar looks, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  const {
    data: looksPages,
    isFetching: isFetchingLooks,
    isLoading: isLoadingLooks,
    refetch: refetchLooks,
    hasNextPage: hasNextPageLooks,
    fetchNextPage: fetchNextPageLooks,
    isFetchingNextPage: isFetchingNextPageLooks,
  } = useInfiniteQuery({
    queryKey: ['looks', debounceValueLook, filtersLook],
    queryFn: fetchClosetLooks,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  looks = React.useMemo(
    () => looksPages?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [looksPages]
  );

  async function fetchClosetLooksSuggestions({ pageParam = undefined }) {
    try {
      const data = await getClosetLooksSuggestions(searchLook, filtersLook, pageParam);

      if (!data?.result?.length && (filtersLook || searchLook)) {
        // setFiltersLook(undefined);
        // setSearchLook('');
        // show({
        //   message:
        //     'Não encontramos looks com esses filtros. Por favor, refine sua busca e tente novamente',
        //   type: 'warning',
        // });
      }

      return data;
    } catch (error) {
      if (filtersLook) {
        setFiltersLook(undefined);

        show({
          message: 'Erro ao realizar consulta, tente novamente mais tarde',
          type: 'error',
        });

        return;
      }

      show({
        message: 'Erro ao carregar as sugestões, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  const {
    data: looksSuggestionsPages,
    isFetching: isFetchingLooksSuggestions,
    isLoading: isLoadingLooksSuggestions,
    refetch: refetchLooksSuggestions,
    hasNextPage: hasNextPageLooksSuggestions,
    fetchNextPage: fetchNextPageLooksSuggestions,
    isFetchingNextPage: isFetchingNextPageLooksSuggestions,
  } = useInfiniteQuery({
    queryKey: ['looksSuggestions', debounceValueLook, filtersLook],
    queryFn: fetchClosetLooksSuggestions,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  looksSuggestions = React.useMemo(
    () => looksSuggestionsPages?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [looksSuggestionsPages]
  );

  const {
    data: folders,
    isFetching: isFetchingFolders,
    isLoading: isLoadingFolders,
    refetch: refetchFolders,
  } = useQuery({
    queryKey: ['folders', debounceValueClothing, debounceValueLook],
    queryFn: async () => await getClosetFolders(searchClothing || searchLook),
  });

  const { data: allFolders, refetch: refetchAllFolders } = useQuery({
    queryKey: ['allFolders'],
    queryFn: async () => await getClosetFolders(),
  });

  const {
    data: closetProfile,
    refetch: refetchClosetProfile,
    isLoading: isLoadingClosetProfile,
  } = useQuery({
    queryKey: [`closetProfile`],
    queryFn: async () => await getClosetProfile(),
  });

  const {
    data: clothingsPages,
    isFetching: isFetchingClothings,
    isLoading: isLoadingClothings,
    refetch: refetchClothings,
    hasNextPage: hasNextPageClothings,
    fetchNextPage: fetchNextPageClothings,
    isFetchingNextPage: isFetchingNextPageClothings,
  } = useInfiniteQuery({
    queryKey: ['clothings', debounceValueClothing, filtersClothing],
    queryFn: fetchClosetClothings,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const clothings = React.useMemo(
    () => clothingsPages?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [clothingsPages]
  );

  const {
    data: inspirationsPages,
    isFetching: isFetchingInspirations,
    isLoading: isLoadingInspirations,
    refetch: refetchInspirations,
    hasNextPage: hasNextPageInspirations,
    fetchNextPage: fetchNextPageInspirations,
    isFetchingNextPage: isFetchingNextPageInspirations,
  } = useInfiniteQuery({
    queryKey: ['inspirations'],
    queryFn: fetchInspirations,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const inspirations = inspirationsPages?.pages?.flatMap((page) => page?.result ?? []);

  const isFetching =
    isFetchingFolders ||
    isFetchingClothings ||
    isFetchingLooks ||
    isFetchingInspirations ||
    isFetchingLooksSuggestions;
  const isLoading =
    loading ||
    isLoadingFolders ||
    isLoadingClothings ||
    isLoadingLooks ||
    isLoadingInspirations ||
    isLoadingLooksSuggestions;

  const initialState = {
    bottomSheetComponent: <></>,
    snapPoints: [1],
    backgroundColor: theme?.colors?.primary_black,
    hasBackdrop: false,
    index: 0,
  };

  const [bottomSheetOptions, dispatch] = useReducer((state, action) => {
    bottomSheetRef.current?.collapse();
    switch (action.type) {
      case 'combinations':
      case 'inspirations':
      case 'part':
      case 'folder':
        return {
          ...state,
          bottomSheetComponent: action.type,
          snapPoints: [81],
          backgroundColor: theme?.colors?.white,
          hasBackdrop: false,
        };
      case 'filters':
        return {
          ...state,
          bottomSheetComponent: action.type,
          snapPoints: ['92%'],
          backgroundColor: theme?.colors?.white,
          hasBackdrop: true,
          index: 0,
        };
      case 'addPart':
      case 'addFolder':
        return {
          ...state,
          bottomSheetComponent: action.type,
          snapPoints: ['80%'],
          backgroundColor: theme?.colors?.white,
          hasBackdrop: true,
          index: 0,
        };

      default:
        return initialState;
    }
  }, initialState);

  function expandBottomSheet() {
    setShowBottomSheet(true);

    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 150);
  }

  function closeBottomSheet() {
    bottomSheetRef.current?.close();

    setTimeout(() => {
      setShowBottomSheet(false);
    }, 150);
  }

  function collapseBottomSheet() {
    bottomSheetRef.current?.collapse();

    setTimeout(() => {
      setShowBottomSheet((prevState) => !prevState);
    }, 150);
  }

  function isItemSelectedClothing(item: ClosetClothingType) {
    return selectedClothingsItems.some((selectedItem) => selectedItem.id === item.id);
  }

  function isItemSelectedLook(item: ClosetLookType) {
    return selectedLooksItems.some((selectedItem) => selectedItem.id === item.id);
  }

  function isItemSelectedInspirations(item: ClosetInspirationType) {
    return selectedInspirationsItems.some((selectedItem) => selectedItem.id === item.id);
  }

  function handleSelectClothing(item: any) {
    if (selectedClothingsItems.length >= 50) {
      show({
        message: 'Limite de 50 itens selecionados',
        type: 'warning',
      });
      return;
    }

    if (isSelectingClothings) {
      if (isItemSelectedClothing(item)) {
        setSelectedClothingsItems((prevState) =>
          prevState.filter((selectedItem) => selectedItem.id !== item.id)
        );
        return;
      } else {
        setSelectedClothingsItems((prevState) => [...prevState, item]);
      }
      return;
    }

    setIsSelectingClothings(true);
    dispatch({ type: 'part' });
    expandBottomSheet();

    setSelectedClothingsItems((prevState) => [...prevState, item]);
  }

  function handleSelectLook(item: any) {
    if (selectedLooksItems.length >= 50) {
      show({
        message: 'Limite de 50 itens selecionados',
        type: 'warning',
      });
      return;
    }

    if (isSelectingLooks) {
      if (isItemSelectedLook(item)) {
        setSelectedLooksItems((prevState) =>
          prevState.filter((selectedItem) => selectedItem.id !== item.id)
        );
        return;
      } else {
        setSelectedLooksItems((prevState) => [...prevState, item]);
      }
      return;
    }

    setIsSelectingLooks(true);
    dispatch({ type: 'combinations' });
    expandBottomSheet();

    setSelectedLooksItems((prevState) => [...prevState, item]);
  }

  function handleSelectInspirations(item: any) {
    if (isSelectingInspirations) {
      if (isItemSelectedInspirations(item)) {
        setSelectedInspirationsItems((prevState) =>
          prevState.filter((selectedItem) => selectedItem.id !== item.id)
        );
        return;
      } else {
        setSelectedInspirationsItems((prevState) => [...prevState, item]);
      }
      return;
    }

    setIsSelectingInspirations(true);
    dispatch({ type: 'inspirations' });
    expandBottomSheet();

    setSelectedInspirationsItems((prevState) => [...prevState, item]);
  }

  async function addNewFolder(folderName: string) {
    const folder = await saveClosetFolder(folderName);
    if (!folder) return;

    await addToFolder(folder?.id);
  }

  async function addToFolder(folderId: number) {
    const clothingsIds = selectedClothingsItems?.map((item) => item.id);
    const looksIds = selectedLooksItems?.map((item) => item.id);
    const inspirationsIds = selectedInspirationsItems?.map((item) => item.id);

    await addToClosetFolder({
      folderId,
      clothings: clothingsIds,
      looks: looksIds,
      inspirations: inspirationsIds,
    });

    await refetchFolders();
    refetchAllFolders();
    clearAllSelectedItems();
  }

  async function saveSelectedItems(folderId: number) {
    await addToClosetFolder({ folderId });
  }

  function clearSelectedClothingsItems() {
    setSelectedClothingsItems([]);
  }

  function clearSelectedLooksItems() {
    setSelectedLooksItems([]);
  }

  function clearSelectedInspirationsItems() {
    setSelectedInspirationsItems([]);
  }

  function clearAllSelectedItems() {
    clearSelectedClothingsItems();
    clearSelectedLooksItems();
    clearSelectedInspirationsItems();
    setFiltersClothing(undefined);
    setFiltersLook(undefined);
    setSearchClothing('');
    setSearchLook('');
  }

  async function removeFolder() {
    if (!selectedFolder?.id) return;
    closeBottomSheet();
    Alert.alert(
      'Excluir pasta',
      `Tem certeza que deseja excluir a pasta ${selectedFolder.title}?`,
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              setLoading(true);
              selectedFolder?.id && (await deleteFolder(selectedFolder.id));
              await refetchFolders();
              refetchAllFolders();
              setSelectedFolder(undefined);

              show({
                message: 'Pasta removida com sucesso',
                type: 'success',
              });
            } catch (error) {
              show({
                message: 'Erro ao remover pasta, tente novamente mais tarde',
                type: 'error',
              });
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  }

  async function deleteClothing() {
    if (!selectedClothingsItems?.length) return;

    closeBottomSheet();
    const text = selectedClothingsItems?.length > 1 ? 'peças' : 'peça';
    const textArticle = selectedClothingsItems?.length > 1 ? 'as' : 'a';
    const textDelete = selectedClothingsItems?.length > 1 ? 'excluídas' : 'excluída';
    const ids = selectedClothingsItems.map((item) => item.id);

    Alert.alert(`Excluir ${text}`, `Tem certeza que deseja excluir ${textArticle} ${text}?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            setLoading(true);
            await deleteClosetClothing(ids);
            await refetchClothings({ refetchPage: (page, index) => index === 0 });
            refetchClosetProfile();

            show({
              message: `${text.charAt(0).toUpperCase() + text.slice(1)} ${textDelete} com sucesso`,
              type: 'success',
            });
          } catch (error) {
            show({
              message: `Erro ao excluír ${text}, tente novamente mais tarde`,
              type: 'error',
            });
          } finally {
            setLoading(false);
            clearAllSelectedItems();
          }
        },
      },
    ]);
  }

  async function deleteInspiration() {
    if (!selectedInspirationsItems?.length) return;

    closeBottomSheet();
    const text = selectedInspirationsItems?.length > 1 ? 'inspirações' : 'inspiração';
    const textArticle = selectedInspirationsItems?.length > 1 ? 'as' : 'a';
    const textDelete = selectedInspirationsItems?.length > 1 ? 'excluídas' : 'excluída';
    const ids = selectedInspirationsItems.map((item) => item.id);

    Alert.alert(`Excluir ${text}`, `Tem certeza que deseja excluir ${textArticle} ${text}?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            setLoading(true);
            await deleteClosetInspiration(ids);
            await refetchInspirations({ refetchPage: (page, index) => index === 0 });

            show({
              message: `${text.charAt(0).toUpperCase() + text.slice(1)} ${textDelete} com sucesso`,
              type: 'success',
            });
          } catch (error) {
            show({
              message: `Erro ao excluír ${text}, tente novamente mais tarde`,
              type: 'error',
            });
          } finally {
            setLoading(false);
            clearAllSelectedItems();
          }
        },
      },
    ]);
  }

  async function deleteLook(lookId?: number, cb?: () => void) {
    if (!selectedLooksItems?.length && !lookId) return;
    const looksSelecteds = lookId ? [{ id: lookId }] : selectedLooksItems;

    closeBottomSheet();
    const text = looksSelecteds?.length > 1 ? 'looks' : 'look';
    const textArticle = looksSelecteds?.length > 1 ? 'os' : 'o';
    const textDelete = looksSelecteds?.length > 1 ? 'excluídos' : 'excluído';
    const ids = looksSelecteds.map((item) => item.id);
    let response = true;

    Alert.alert(`Excluir ${text}`, `Tem certeza que deseja excluir ${textArticle} ${text}?`, [
      {
        text: 'Não',
        style: 'cancel',
        onPress: () => {
          response = false;
        },
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            setLoading(true);
            await deleteClosetLook(ids);
            await refetchLooks({ refetchPage: (page, index) => index === 0 });

            show({
              message: `${text.charAt(0).toUpperCase() + text.slice(1)} ${textDelete} com sucesso`,
              type: 'success',
            });

            if (cb) cb();
          } catch (error) {
            show({
              message: `Erro ao excluír ${text}, tente novamente mais tarde`,
              type: 'error',
            });
          } finally {
            setLoading(false);
            clearAllSelectedItems();
          }
        },
      },
    ]);

    return response;
  }

  useEffect(() => {
    if (
      selectedClothingsItems.length === 0 &&
      selectedLooksItems.length === 0 &&
      selectedInspirationsItems.length === 0
    ) {
      setIsSelectingClothings(false);
      setIsSelectingLooks(false);
      setIsSelectingInspirations(false);
      closeBottomSheet();
    }
  }, [selectedClothingsItems, selectedLooksItems, selectedInspirationsItems]);

  function refetchAllCloset() {
    refetchAllFolders();
    refetchClosetProfile();
    refetchClothings();
    refetchLooks();
    refetchInspirations();
    refetchLooksSuggestions();
  }

  useEffect(() => {
    return () => {
      setFiltersLook(undefined);
      setSearchLook('');
      setFiltersClothing(undefined);
      setSearchClothing('');
    };
  }, []);

  useEffect(() => {
    const listenerStorage = storage.addOnValueChangedListener((key) => {
      if (key === 'profile') {
        const data = storage.getString('profile');

        if (!data) return;

        refetchAllCloset();
      }
    });

    return () => {
      listenerStorage.remove();
    };
  }, [storage]);

  const valueMemo = useMemo(
    () => ({
      addNewFolder,
      addToFolder,
      allFolders,
      bottomSheetOptions,
      bottomSheetRef,
      clearAllSelectedItems,
      clearSelectedClothingsItems,
      clearSelectedInspirationsItems,
      clearSelectedLooksItems,
      closeBottomSheet,
      closetProfile,
      clothings,
      collapseBottomSheet,
      currentTab,
      deleteClothing,
      deleteInspiration,
      deleteLook,
      dispatch,
      expandBottomSheet,
      fetchNextPageClothings,
      fetchNextPageInspirations,
      refetchLooks,
      fetchNextPageLooks,
      filtersClothing,
      filtersLook,
      folders,
      handleSelectClothing,
      handleSelectInspirations,
      handleSelectLook,
      hasNextPageClothings,
      hasNextPageInspirations,
      hasNextPageLooks,
      inspirations,
      isFetching,
      isFetchingNextPageClothings,
      isFetchingNextPageInspirations,
      isFetchingNextPageLooks,
      isItemSelectedClothing,
      isItemSelectedInspirations,
      isItemSelectedLook,
      isLoading,
      isLoadingClosetProfile,
      isLoadingClothings,
      isSelectingClothings,
      isSelectingInspirations,
      isSelectingLooks,
      looks,
      setLooks,
      looksSuggestions,
      setLooksSuggestions,
      isLoadingLooksSuggestions,
      isFetchingLooksSuggestions,
      refetchAllCloset,
      fetchClosetLooksSuggestions,
      refetchLooksSuggestions,
      refetchInspirations,
      removeFolder,
      saveSelectedItems,
      searchClothing,
      searchLook,
      selectedClothingsItems,
      selectedFolder,
      selectedInspirationsItems,
      selectedLooksItems,
      setCurrentTab,
      setFiltersClothing,
      setFiltersLook,
      setSearchClothing,
      setSearchLook,
      setSelectedClothingsItems,
      setSelectedFolder,
      showBottomSheet,
      hasNextPageLooksSuggestions,
      isFetchingNextPageLooksSuggestions,
      fetchNextPageLooksSuggestions,
      loading,
      setLoading,
      inspiration,
      setInspiration,
    }),
    [
      allFolders,
      bottomSheetOptions,
      bottomSheetRef.current,
      closetProfile,
      clothings,
      currentTab,
      filtersClothing,
      filtersLook,
      folders,
      hasNextPageClothings,
      hasNextPageInspirations,
      hasNextPageLooks,
      inspirations,
      isFetching,
      isFetchingNextPageClothings,
      isFetchingNextPageInspirations,
      isFetchingNextPageLooks,
      isLoading,
      isLoadingClosetProfile,
      isSelectingClothings,
      isSelectingInspirations,
      isSelectingLooks,
      looks,
      setLooks,
      looksSuggestions,
      setLooksSuggestions,
      isLoadingLooksSuggestions,
      isFetchingLooksSuggestions,
      fetchClosetLooksSuggestions,
      refetchLooksSuggestions,
      searchClothing,
      searchLook,
      selectedClothingsItems,
      selectedFolder,
      selectedInspirationsItems,
      selectedLooksItems,
      showBottomSheet,
      selectedFolder,
      hasNextPageClothings,
      isFetchingNextPageClothings,
      currentTab,
      hasNextPageLooks,
      isFetchingNextPageLooks,
      hasNextPageLooksSuggestions,
      isFetchingNextPageLooksSuggestions,
      closetProfile,
      isLoadingClosetProfile,
      hasNextPageInspirations,
      isFetchingNextPageInspirations,
      filtersClothing,
      filtersLook,
      loading,
      setLoading,
      inspiration,
    ]
  );

  return <ClosetContext.Provider value={valueMemo}>{children}</ClosetContext.Provider>;
};

const useCloset = (): ClosetContextType => {
  const context = React.useContext(ClosetContext);

  if (!context) {
    throw new Error('useCloset must be used within a ClosetProvider');
  }

  return context;
};

export { ClosetProvider, useCloset };
