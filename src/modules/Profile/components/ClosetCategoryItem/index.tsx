import React, { useCallback } from 'react';

import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';

import { ClosetClothingType } from '@/types/ClosetClothingType';

import { ClosetItem } from '../ClosetItem';
import * as S from './styles';

export interface ClosetCategoryItemProps {
  description: string;
  items: ClosetClothingType[];
  firstNavigate?: boolean;
  isTab?: boolean;
  total?: number;
  isLook?: boolean;
  isAnotherUser?: boolean;
  isStore?: boolean;
}

export function ClosetCategoryItem({
  description,
  items,
  firstNavigate,
  isTab,
  total,
  isLook,
  isAnotherUser,
  isStore,
}: ClosetCategoryItemProps) {
  const navigation = useNavigation();

  const handleNavigate = () => {
    if (firstNavigate) {
      if (isAnotherUser) {
        // @ts-expect-error
        navigation.navigate('ProfileListClosetByCategoryAnotherUser', {
          data: {
            category: description,
            items,
            isLook,
            isStore,
          },
        });
        return;
      }

      // @ts-expect-error
      navigation.navigate('ProfileListClosetByCategory', {
        data: {
          category: description,
          items,
          isLook,
        },
      });
    }
  };

  const renderItem = useCallback(({ item, i }: { item: any; i: any }) => {
    return (
      <ClosetItem
        key={item?.image}
        item={item}
        seeAll={i === 5}
        actionSeeAll={handleNavigate}
        marginAuto={i % 2 === 0}
        total={total - 6}
        hiddenDescription={isLook}
        isLook={isLook}
        isAnotherStore={isAnotherUser && isStore}
      />
    );
  }, []);

  if (!items?.length) {
    return <></>;
  }

  return (
    <S.Container>
      <S.LabelTitle>{description}</S.LabelTitle>
      <MasonryList
        data={isTab ? items.slice(0, 6) ?? [] : items.slice(0, 6) ?? []}
        keyExtractor={(item): string => `${item.id}`}
        numColumns={2}
        contentContainerStyle={{
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </S.Container>
  );
}
