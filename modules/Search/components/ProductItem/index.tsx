import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { ClosetClothingType } from '@/types/ClosetClothingType';

import * as S from './styles';

export interface ProductItemProps {
  product: ClosetClothingType;
}

export function ProductItem({ product }: ProductItemProps) {
  const targerIdPost = product?.tagged_at?.at(-1);
  const navigation = useNavigation<any>();
  const IS_STORE = product?.owned_by?.profile_type === 'store';

  function handleOffer() {
    if (!targerIdPost) return;

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
  }

  return (
    <S.Container disabled={!targerIdPost} onPress={handleOffer}>
      <S.WrapperPicture>
        <S.ProductPhoto source={{ uri: product?.image }} cachePolicy="disk" />
      </S.WrapperPicture>
      <S.Line>
        <S.UserPhoto isSmaller source={{ uri: product?.owned_by?.avatar }} cachePolicy="disk" />
        <S.LabelSmall numberOfLines={1} ellipsizeMode="tail">
          {product?.owned_by.username}
        </S.LabelSmall>
      </S.Line>
      <S.Line>
        <S.LabelTitle numberOfLines={1}>{product.title}</S.LabelTitle>
      </S.Line>
    </S.Container>
  );
}
