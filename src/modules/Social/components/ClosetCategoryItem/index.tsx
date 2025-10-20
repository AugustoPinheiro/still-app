import React from 'react';
import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ClosetClothingType } from '@/types/ClosetClothingType';

import { SocialStackParamList } from '../../routes/social.types';
import { ClosetItem } from '../ClosetItem';
import * as S from './styles';

export interface ClosetCategoryItemProps {
  description: string;
  items: ClosetClothingType[];
  firstNavigate?: boolean;
  isTab?: boolean;
  total?: number;
  isStore?: boolean;
}

type TCategoryClosetNavigationProps = NativeStackNavigationProp<
  SocialStackParamList,
  'SocialListClosetByCategory'
>;

export function ClosetCategoryItem({
  description,
  items,
  firstNavigate,
  isTab,
  total,
  isStore,
}: ClosetCategoryItemProps) {
  const navigation = useNavigation<TCategoryClosetNavigationProps>();
  const handleNavigate = () => {
    if (firstNavigate) {
      navigation.navigate('SocialListClosetByCategory', {
        data: {
          category: description,
          items,
        },
      });
    }
  };

  return (
    <S.Container>
      <S.LabelTitle>{description}</S.LabelTitle>
      <FlatList
        data={isTab ? items.slice(0, 6) ?? [] : items.slice(0, 6) ?? []}
        keyExtractor={(item, index) => `${item?.id}_${index}}`}
        style={{ flex: 1, width: '100%' }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          paddingBottom: 20,
          flex: 1,
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ClosetItem
            key={`${item?.id}_${index}}`}
            item={item}
            seeAll={index === 5}
            actionSeeAll={handleNavigate}
            marginAuto={index % 2 === 0}
            total={total}
            isStore={isStore}
          />
        )}
      />
    </S.Container>
  );
}
