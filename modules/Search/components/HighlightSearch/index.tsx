import React, { useCallback, useRef } from 'react';
import { Platform, View, ScrollView } from 'react-native';

import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { Image } from 'expo-image';

import { Loading } from '@/components/Loading';
import { HighlightList } from '@/modules/Search/components/HighlightList';
import { useSearch } from '@/modules/Search/contexts/search.contexts';

import * as S from './styles';

export const HighlightSearch = () => {
  const listRef = useRef<ScrollView>(null);

  const {
    highlights,
    isFetchingNextPageHighlights,
    fetchNextPageHighlights,
    hasNextPageHighlights,
  } = useSearch();
  useScrollToTop(listRef as any);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        Image.clearMemoryCache();
        Image.clearDiskCache();
      };
    }, [])
  );

  const isCloseToBottom = useCallback(({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const offset = Platform.OS === 'ios' ? 100 : 240;
    const paddingToBottom = contentSize.height - offset;

    return layoutMeasurement.height + contentOffset.y >= paddingToBottom;
  }, []);

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      if (isCloseToBottom(nativeEvent)) {
        if (isFetchingNextPageHighlights || !hasNextPageHighlights) return;
        fetchNextPageHighlights();
      }
    },
    [isFetchingNextPageHighlights, hasNextPageHighlights, fetchNextPageHighlights, isCloseToBottom]
  );

  if (!highlights || highlights?.length === 0) {
    return (
      <S.ContainerEmpty>
        <S.EmptyTitle>Nenhum destaque encontrado.</S.EmptyTitle>
      </S.ContainerEmpty>
    );
  }

  return (
    <S.Container
      ref={listRef}
      onScroll={handleScroll}
      scrollEventThrottle={200}
      removeClippedSubviews
      decelerationRate="fast"
    >
      <HighlightList highlights={highlights} />
      {isFetchingNextPageHighlights ? (
        <View style={{ height: 150, marginTop: -90 }}>{<Loading hasBackground={false} />}</View>
      ) : (
        <></>
      )}
    </S.Container>
  );
};
