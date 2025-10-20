import React, { useEffect, useMemo, useRef } from 'react';
import { FlatList } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';

import FilterIcon from '@/assets/images/filterIcon.svg';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { useDebounce } from '@/hooks/useDebounce';
import { Filters } from '@/modules/Closet/screens/NewClothingPart/components/Filters';
import {
  getClosetClothingCommunity,
  postClosetClothingCommunity,
} from '@/modules/Closet/services/closet.services';
import { ClosetClothingType } from '@/types/ClosetClothingType';

import * as S from './styles';

const placeholderSource = require('@/assets/images/logo.png');

export function CommunityClothes() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { setBottomSheetProps, expand, close } = useBottomSheet();
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<ClosetClothingType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const debounceValueClothing = useDebounce<string>(search, 600);
  const [filters, setFilters] = React.useState<{
    categories?: number[];
    attributes?: number[];
  }>();
  const { show } = useToast();
  const navigation = useNavigation();

  function goToCloset() {
    const routes = {
      index: 0,
      routes: [{ name: 'Closet' }],
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  const fetchCommunityClothes = async ({ pageParam = undefined }) => {
    try {
      const data = await getClosetClothingCommunity(search, filters, pageParam);

      return data;
    } catch (error) {
      show({ type: 'error', message: 'Erro ao buscar peças da comunidade' });
    }
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['communityClothes', debounceValueClothing, filters],
    queryFn: fetchCommunityClothes,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const parts = data?.pages.flatMap((page) => page?.result ?? []);

  function handleOpenFilter() {
    setBottomSheetProps({
      id: 'FilterCommunityClothes',
      content: <Filters setFilters={setFilters} closeBottomSheet={close} />,
      snapPoints: ['94%'],
    });
    expand();
  }

  const theme = useTheme();
  const snapPoints = useMemo(() => [90], []);

  function handleSelectItem(item: ClosetClothingType) {
    if (isSelecting) {
      if (isItemSelected(item)) {
        setSelectedItems((prevState) =>
          prevState.filter((selectedItem) => selectedItem.id !== item.id)
        );
        return;
      } else {
        setSelectedItems((prevState) => [...prevState, item]);
      }
      return;
    }

    setIsSelecting(true);
    setSelectedItems((prevState) => [...prevState, item]);
  }

  function isItemSelected(item: ClosetClothingType) {
    return selectedItems.some((selectedItem) => selectedItem.id === item.id);
  }

  async function handleSaveImage() {
    if (!selectedItems?.length) return;

    try {
      setLoading(true);
      await postClosetClothingCommunity(selectedItems);

      show({
        type: 'success',
        message: 'Peças salvas com sucesso',
      });

      goToCloset();
    } catch (error) {
      show({
        type: 'error',
        message: 'Erro ao salvar peças no closet',
      });

      console.error(error);
    } finally {
      setLoading(false);
      setSelectedItems([]);
      setIsSelecting(false);
    }
  }

  useEffect(() => {
    if (selectedItems.length === 0) {
      setIsSelecting(false);
    }
  }, [selectedItems]);

  function renderItem({ item }: { item: ClosetClothingType }) {
    return (
      <S.ImageContainer
        key={item.id}
        onLongPress={() => handleSelectItem(item)}
        onPress={() => handleSelectItem(item)}
      >
        {isSelecting && isItemSelected(item) && (
          <S.ImageOverlayCheck>
            <MaterialCommunityIcons name="check" size={48} color="#FFF" />
          </S.ImageOverlayCheck>
        )}

        <S.ImageContent
          source={{ uri: item.image }}
          contentFit="contain"
          defaultSource={placeholderSource}
          cachePolicy="disk"
        />
      </S.ImageContainer>
    );
  }

  return (
    <S.Container>
      {(isLoading || loading) && <Loading />}
      <S.Header>
        <S.Title>Peças da comunidade Finti</S.Title>

        <S.SearchContainer>
          <Search
            placeholder="Busque pela descrição"
            onChangeText={(value) => setSearch(value)}
            value={search}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />

          <S.ButtonIcon onPress={handleOpenFilter}>
            <FilterIcon width={24} height={24} />
          </S.ButtonIcon>
        </S.SearchContainer>

        {isSelecting && !!selectedItems.length && (
          <S.CountContainer>
            <S.CountText>
              {selectedItems.length === 1
                ? '1 peça selecionada'
                : `${selectedItems.length} peças selecionadas`}
            </S.CountText>
            <S.CountButtonContainer>
              <Button
                title="Cancelar"
                type="primary"
                onPress={() => setSelectedItems([])}
                marginBottom={0}
                weight="flat"
              />
            </S.CountButtonContainer>
          </S.CountContainer>
        )}
      </S.Header>
      <S.Content>
        <FlatList
          data={parts}
          renderItem={renderItem}
          numColumns={3}
          horizontal={false}
          columnWrapperStyle={{ gap: 8 }}
          contentContainerStyle={{
            gap: 8,
            paddingBottom: 50,
          }}
          keyExtractor={(item) => `${item.id}`}
          onEndReached={() => {
            if (!hasNextPage || isFetchingNextPage) return;

            fetchNextPage();
          }}
          onEndReachedThreshold={1}
          ListFooterComponent={isFetchingNextPage ? <Loading hasBackground={false} /> : <></>}
        />
      </S.Content>

      {selectedItems.length > 0 && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          handleStyle={{ backgroundColor: theme?.colors?.primary_black }}
          handleComponent={() => null}
          enableHandlePanningGesture={false}
        >
          <S.BottomSheetContainer onPress={handleSaveImage}>
            <MaterialCommunityIcons name="hanger" color="#fff" size={24} />
            <S.BottomSheetText>Adicionar ao closet</S.BottomSheetText>
          </S.BottomSheetContainer>
        </BottomSheet>
      )}
    </S.Container>
  );
}
