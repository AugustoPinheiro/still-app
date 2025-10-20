import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ClosetClothingType } from '@/types/ClosetClothingType';

import { SocialStackParamList } from '../../routes/social.types';
import * as S from './styles';

export interface ClosetItemProps {
  hiddenDescription?: boolean;
  seeAll?: boolean;
  actionSeeAll?: () => void;
  item: ClosetClothingType;
  marginAuto?: boolean;
  hasBg?: boolean;
  total?: number;
  isStore?: boolean;
}

type TCategoryClosetNavigationProps = NativeStackNavigationProp<
  SocialStackParamList,
  'ListClosetByCategory'
>;

export function ClosetItem({
  hiddenDescription,
  seeAll,
  actionSeeAll,
  item,
  marginAuto,
  total = 0,
  isStore,
}: ClosetItemProps) {
  const { title, image } = item;
  const ellipsizedContent = title?.length > 15 ? title.substring(0, 15) + '...' : title;
  const navigation = useNavigation<TCategoryClosetNavigationProps>();
  const handleNavigate = () => {
    if (isStore) {
      // @ts-expect-error
      navigation.navigate('SocialClothingDetailsStore', {
        id: item.id,
      });
      return;
    }

    // @ts-expect-error
    navigation.navigate('SocialClothingDetails', {
      id: item.id,
    });
  };

  return (
    <S.Container
      marginAuto={marginAuto}
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
            <MaterialCommunityIcons name="plus" size={48} color="#FFF" />
          )}
        </S.Background>
      )}
      <S.UserPhoto source={{ uri: image }} cachePolicy="disk" />
      {hiddenDescription ? null : (
        <S.LabelTitle numberOfLines={1} ellipsizeMode="tail">
          {ellipsizedContent}
        </S.LabelTitle>
      )}
    </S.Container>
  );
}
