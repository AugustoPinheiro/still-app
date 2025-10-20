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
  posts: SocialFeedType[];
  isBigger?: boolean;
  onClickPost?: (post: SocialFeedType) => void;
};

export function HighlightPosts({ posts, onClickPost }: CardImageProps) {
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

  const handleOptions = (post: SocialFeedType) => {
    if (!isLogged()) {
      showAuthModal();
      return;
    }

    setBottomSheetProps({
      id: 'MenuOptionsPost',
      content: <MenuOptionsPost post={post} />,
      snapPoints: [270],
    });
    expand();
  };

  function handlePostDetails(post: SocialFeedType) {
    if (onClickPost) {
      onClickPost(post);
      return;
    }

    // @ts-expect-error
    navigation.navigate('PostSearchDetails', { post });
  }

  const dataOdd = posts?.filter((_, index) => (index + 1) % 2 !== 0);
  const dataEven = posts?.filter((_, index) => (index + 1) % 2 === 0);

  return (
    <S.Container>
      <S.Column>
        {dataOdd.map((item, index) => (
          <S.ContainerPost key={`highlight_post_${item?.username}_${item?.id}`}>
            <TouchableOpacity onPress={() => handlePostDetails(item)}>
              <S.UserPhoto
                source={{ uri: item?.media[0]?.image_url }}
                cachePolicy="disk"
                isBigger={(index + 1) % 2 !== 0}
              />
            </TouchableOpacity>
            <S.Line>
              <S.LabelTitle numberOfLines={2} ellipsizeMode="tail">
                {item?.description?.trim()}
              </S.LabelTitle>
              <S.ButtonOptions onPress={() => handleOptions(item)}>
                <ThreeDotsIcon />
              </S.ButtonOptions>
            </S.Line>
          </S.ContainerPost>
        ))}
      </S.Column>
      <S.Column>
        {dataEven.map((item, index) => (
          <S.ContainerPost key={`highlight_post_${item?.username}_${item?.id}`}>
            <TouchableOpacity onPress={() => handlePostDetails(item)}>
              <S.UserPhoto
                source={{ uri: item?.media[0]?.image_url }}
                cachePolicy="disk"
                isBigger={(index + 1) % 2 === 0}
              />
            </TouchableOpacity>
            <S.Line>
              <S.LabelTitle numberOfLines={2} ellipsizeMode="tail">
                {item?.description?.trim()}
              </S.LabelTitle>
              <S.ButtonOptions onPress={() => handleOptions(item)}>
                <ThreeDotsIcon />
              </S.ButtonOptions>
            </S.Line>
          </S.ContainerPost>
        ))}
      </S.Column>
    </S.Container>
  );
}
