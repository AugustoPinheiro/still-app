import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { HighlightPosts } from '@/modules/Search/components/HighlightPosts';
import { SocialFeedType } from '@/types/SocialFeedType';

type Props = {
  highlights: Array<SocialFeedType | undefined>;
};
export function HighlightList({ highlights }: Props) {
  const navigation = useNavigation();

  const handleClick = useCallback((post: any) => {
    // @ts-expect-error
    navigation.navigate('PostSearchDetails', { post });
  }, []);

  const highlightSeparated = useMemo(() => {
    if (!highlights) return [];

    const highlightEven = highlights.filter((_, index) => index % 2 === 0);
    const highlightOdd = highlights.filter((_, index) => index % 2 !== 0);
    return [highlightEven, highlightOdd];
  }, [highlights]);

  const renderItem = useCallback(
    ({ item, isBigger }: any) => (
      <HighlightPosts post={item} isBigger={isBigger} onClickPost={handleClick} />
    ),
    []
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: 60,
        paddingTop: 24,
        paddingHorizontal: 20,
        gap: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={highlightSeparated[0]}
          keyExtractor={(item) => `${item?.id}`}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item, index }) => renderItem({ item, isBigger: index % 2 === 0 })}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          // updateCellsBatchingPeriod={100}
          // removeClippedSubviews
        />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={highlightSeparated[1]}
          keyExtractor={(item) => `${item?.id}`}
          scrollEnabled={false}
          contentContainerStyle={{
            gap: 16,
          }}
          renderItem={({ item, index }) => renderItem({ item, isBigger: index % 2 !== 0 })}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          // updateCellsBatchingPeriod={100}
          // removeClippedSubviews
        />
      </View>
    </View>
  );
}
