import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { ClosetClothingType } from '@/types/ClosetClothingType';

import * as S from './styles';

export interface ClosetItemProps {
  hiddenDescription?: boolean;
  seeAll?: boolean;
  actionSeeAll?: () => void;
  item: ClosetClothingType;
  marginAuto?: boolean;
  hasBg?: boolean;
  total?: number;
  isLook?: boolean;
  isAnotherStore?: boolean;
}

export function ClosetItem({
  hiddenDescription,
  seeAll,
  actionSeeAll,
  item,
  marginAuto,
  total = 0,
  isLook,
  isAnotherStore,
}: ClosetItemProps) {
  const navigation = useNavigation();
  const { title, image } = item;
  const ellipsizedContent = title?.length > 15 ? title.substring(0, 15) + '...' : title;

  const handleNavigate = () => {
    if (isLook) return;

    if (isAnotherStore) {
      // @ts-expect-error
      navigation.navigate('ProfileClothingDetailsStore', {
        id: item.id,
      });
      return;
    }

    // @ts-expect-error
    navigation.navigate('ProfileClothingDetails', {
      id: item.id,
    });
  };

  return (
    <S.Container
      marginAuto={marginAuto}
      activeOpacity={isLook ? 1 : 0.7}
      onPress={() => {
        if (seeAll && actionSeeAll) {
          actionSeeAll();
          return;
        }
        handleNavigate();
      }}
    >
      {seeAll && (
        <S.Background>
          {total > 0 ? (
            <>
              <S.SeeAll>+{total}</S.SeeAll>
            </>
          ) : (
            <MaterialCommunityIcons name="plus" size={48} color="#FFF" cachePolicy="disk" />
          )}
        </S.Background>
      )}
      <S.UserPhoto key={image} source={{ uri: image }} />
      {hiddenDescription ? null : (
        <S.LabelTitle numberOfLines={1} ellipsizeMode="tail">
          {ellipsizedContent}
        </S.LabelTitle>
      )}
    </S.Container>
  );
}
