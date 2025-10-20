import React, { useCallback, useState } from 'react';
import { FlatList, Platform, RefreshControl, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FilterIcon from '@/assets/images/filterIcon.svg';
import { FlagIcon } from '@/components/FlagIcon';
import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { Filters } from '@/modules/Search/components/Filters';
import { useSearch } from '@/modules/Search/contexts/search.contexts';

import { ProductItem } from '../ProductItem';
import * as S from './styles';

export function ProductSearch() {
  const navigation = useNavigation<any>();
  const {
    clothings,
    searchClothings,
    setSearchClothings,
    isLoadingClothings,
    filters,
    setFilters,
    hasNextPageClothings,
    isFetchingNextPageClothings,
    fetchNextPageClothings,
    isFetchingClothings,
    refetchClothings,
  } = useSearch();
  const { expand, setBottomSheetProps, close } = useBottomSheet();
  const hasFilter = filters?.attributes?.length || filters?.categories?.length;

  function handleOpenFilter() {
    setBottomSheetProps({
      id: 'FilterCommunityClothes',
      content: <Filters setFilters={setFilters} closeBottomSheet={close} />,
      snapPoints: ['94%'],
    });
    expand();
  }

  const handleProductPress = useCallback((product: any) => {
    const targerIdPost = product?.tagged_at?.at(-1);
    if (!targerIdPost) return;

    const IS_STORE = product?.owned_by?.profile_type === 'store';

    if (IS_STORE) {
      navigation.navigate('Feed', {
        screen: 'SocialClothingDetailsStore',
        params: {
          id: product.id,
          from: 'searchProducts',
        },
      });
      return;
    }

    navigation.navigate('Feed', {
      screen: 'SocialOffer',
      params: {
        postId: targerIdPost?.post_id,
        from: 'searchProducts',
      },
    });
  }, [navigation]);

  const renderProductCard = useCallback(({ item, index }: { item: any; index: number }) => {
    return (
      <S.ProductCard key={`${item?.id}_${index}`} onPress={() => handleProductPress(item)}>
        <S.ProductImageContainer>
          <S.ProductImage source={{ uri: item?.image }} cachePolicy="disk" />
          {item?.owned_by?.profile_type === 'store' && (
            <S.StoreBadge>
              <S.StoreBadgeText>Loja</S.StoreBadgeText>
            </S.StoreBadge>
          )}
        </S.ProductImageContainer>
        <S.ProductInfo>
          <S.ProductTitle numberOfLines={2}>{item?.title}</S.ProductTitle>
          <S.ProductOwner>
            <S.OwnerPhoto source={{ uri: item?.owned_by?.avatar }} cachePolicy="disk" />
            <S.OwnerName numberOfLines={1}>@{item?.owned_by?.username}</S.OwnerName>
          </S.ProductOwner>
          <S.ProductPrice>
            <S.PriceText>R$ {item?.price || 'Sob consulta'}</S.PriceText>
          </S.ProductPrice>
        </S.ProductInfo>
      </S.ProductCard>
    );
  }, [handleProductPress]);

  const renderProductItem = useCallback(({ item }: { item: any }) => {
    return <ProductItem product={item} />;
  }, []);

  return (
    <S.Container>
      {isLoadingClothings ? (
        <Loading />
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <S.Content>
            <S.SearchContainer>
              <Search
                placeholder="Busque por produtos"
                onChangeText={(value) => setSearchClothings(value)}
                value={searchClothings}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
              />

              <S.ButtonIcon onPress={handleOpenFilter}>
                {hasFilter ? <FlagIcon /> : <></>}
                <FilterIcon width={24} height={24} />
              </S.ButtonIcon>
            </S.SearchContainer>

            {/* Cards de produtos em destaque - horizontal */}
            {clothings && clothings.length > 0 && (
              <S.HighlightSection>
                <S.SectionTitle>PRODUTOS EM DESTAQUE</S.SectionTitle>
                <S.HorizontalScrollContainer>
                  {clothings.slice(0, 5).map((item, index) => renderProductCard({ item, index }))}
                </S.HorizontalScrollContainer>
              </S.HighlightSection>
            )}

            {/* Lista melhorada para todos os produtos */}
            {clothings && clothings.length > 0 && (
              <S.ProductsSection>
                <S.SectionTitle>TODOS OS PRODUTOS</S.SectionTitle>
                <S.ProductsGrid>
                  {clothings.map((item, index) => (
                    <S.GridProductCard key={`grid_${item?.id}_${index}`} onPress={() => handleProductPress(item)}>
                      <S.GridProductImage source={{ uri: item?.image }} cachePolicy="disk" />
                      <S.GridProductInfo>
                        <S.GridProductTitle numberOfLines={2}>{item?.title}</S.GridProductTitle>
                        <S.GridProductOwner>
                          <S.GridOwnerPhoto source={{ uri: item?.owned_by?.avatar }} cachePolicy="disk" />
                          <S.GridOwnerName numberOfLines={1}>@{item?.owned_by?.username}</S.GridOwnerName>
                        </S.GridProductOwner>
                        <S.GridProductPrice>
                          <S.GridPriceText>R$ {item?.price || 'Sob consulta'}</S.GridPriceText>
                        </S.GridProductPrice>
                      </S.GridProductInfo>
                    </S.GridProductCard>
                  ))}
                </S.ProductsGrid>
                
                {/* Botão carregar mais */}
                {hasNextPageClothings && (
                  <S.LoadMoreButton onPress={fetchNextPageClothings}>
                    <S.LoadMoreText>
                      {isFetchingNextPageClothings ? 'Carregando...' : 'Carregar Mais Produtos'}
                    </S.LoadMoreText>
                  </S.LoadMoreButton>
                )}
              </S.ProductsSection>
            )}

            {/* Estado vazio */}
            {(!clothings || clothings.length === 0) && !isLoadingClothings && (
              <S.EmptyContainer>
                <S.EmptyTitle>Nenhum produto encontrado</S.EmptyTitle>
                <S.EmptySubtitle>
                  {searchClothings 
                    ? 'Tente ajustar sua busca ou filtros' 
                    : 'Explore produtos da comunidade'
                  }
                </S.EmptySubtitle>
              </S.EmptyContainer>
            )}
          </S.Content>
        </ScrollView>
      )}
    </S.Container>
  );
}
