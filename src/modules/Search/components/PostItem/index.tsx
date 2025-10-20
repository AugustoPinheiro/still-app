import React from 'react';

import { useNavigation } from '@react-navigation/native';

import ThreeDotsIcon from '@/assets/images/threeDotsBlack.svg';
import { MainMenuLoginOrRegister } from '@/components/MainMenuLoginOrRegister';
import { isLogged } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { SocialFeedType } from '@/types/SocialFeedType';

import { MenuOptionsPost } from '../MenuOptionsPost';
import * as S from './styles';

export interface PostItemProps {
  post: SocialFeedType;
  isBigger?: boolean;
  onClickPost?: (post: SocialFeedType) => void;
}

export function PostItem({ post, isBigger, onClickPost }: PostItemProps) {
  const { expand, setBottomSheetProps } = useBottomSheet();
  const navigation = useNavigation();

  function showAuthModal() {
    setBottomSheetProps({
      id: 'MainModal',
      content: <MainMenuLoginOrRegister />,
      snapPoints: [416],
    });
    expand();
  }

  const handleOptions = () => {
    if (!isLogged()) {
      showAuthModal();
      return;
    }

    setBottomSheetProps({
      id: 'MenuOptionsPost',
      content: <MenuOptionsPost post={post} />,
      snapPoints: [220],
    });
    expand();
  };

  function handlePostDetails() {
    if (onClickPost) {
      onClickPost(post);
      return;
    }

    // @ts-expect-error
    navigation.navigate('PostSearchDetails', { post });
  }

  return (
    <S.Container>
      <S.WrapperImage onPress={handlePostDetails} isBigger={isBigger}>
        <S.UserPhoto
          source={{ uri: post?.media[0]?.image_url }}
          cachePolicy="disk"
          isBigger={isBigger}
        />
      </S.WrapperImage>
      <S.Line>
        <S.LabelTitle numberOfLines={2} ellipsizeMode="tail">
          {post?.description}
        </S.LabelTitle>
        <S.ButtonOptions onPress={handleOptions}>
          <ThreeDotsIcon />
        </S.ButtonOptions>
      </S.Line>
    </S.Container>
  );
}
