import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ThreeDotsIcon from '@/assets/images/threeDotsBlack.svg';
import { MainMenuLoginOrRegister } from '@/components/MainMenuLoginOrRegister';
import { MenuOptionsPost } from '@/components/MenuOptionsPost';
import { isLogged } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { SocialFeedType } from '@/types/SocialFeedType';

import * as S from './styles';

type CardImageProps = {
  post: SocialFeedType;
  isBigger?: boolean;
  onClickPost?: (post: SocialFeedType) => void;
};

function HighlightPostsComponent({ post, isBigger, onClickPost }: CardImageProps) {
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

  const handleOptions = (post: any) => {
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

  function handlePostDetails(post: any) {
    if (onClickPost) {
      onClickPost(post);
      return;
    }

    // @ts-expect-error
    navigation.navigate('PostSearchDetails', { post });
  }

  return (
    <S.ContainerPost>
      <TouchableOpacity onPress={() => handlePostDetails(post)}>
        <S.UserPhoto
          source={{
            uri: post?.media[0]?.image_url,
            height: 1920,
            width: 1080,
            isAnimated: false,
          }}
          isBigger={isBigger}
          // allowDownscaling={false}
          recyclingKey={`${post?.id}`}
          cachePolicy={'none'}
        />
      </TouchableOpacity>
      <S.Line>
        <S.LabelTitle numberOfLines={1} ellipsizeMode="tail">
          {post?.description?.trim()}
        </S.LabelTitle>
        <S.ButtonOptions onPress={() => handleOptions(post)}>
          <ThreeDotsIcon />
        </S.ButtonOptions>
      </S.Line>
    </S.ContainerPost>
  );
}

const HighlightPosts = React.memo(HighlightPostsComponent);
export { HighlightPosts };
