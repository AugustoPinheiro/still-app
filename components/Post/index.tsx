import React from 'react';
import { TouchableOpacity, View, Vibration, useWindowDimensions, Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Share from 'react-native-share';

import theme from '@/theme';
import * as amplitude from '@amplitude/analytics-react-native';
import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNowStrict } from 'date-fns';

import LogoFinti from '@/assets/images/logo-post.png';
import Dots from '@/assets/images/threeDots.svg';
import { Comments } from '@/components/Comments';
import { MainMenuLoginOrRegister } from '@/components/MainMenuLoginOrRegister';
import { Marks } from '@/components/Post/Marks';
import { OfferMenu } from '@/components/Post/OfferMenu';
import { getProfile, isLogged } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { postSocialToggleLike } from '@/modules/Social/services/social.services';
import { SocialFeedType } from '@/types/SocialFeedType';
import { SocialPostType } from '@/types/SocialPostType';

import { FoldersPosts } from './FoldersPosts';
import { MenuPost } from './MenuPost';
import * as S from './styles';

interface IPostProps {
  post: SocialFeedType;
  isDetails?: boolean;
  isFeed?: boolean;
  onGoToStore?: (post: SocialFeedType) => void;
}

function Post({ post, isDetails, isFeed, onGoToStore }: IPostProps) {
  const navigation = useNavigation();
  const { expand, setBottomSheetProps } = useBottomSheet();
  const [isLikeLoading, setIsLikeLoading] = React.useState(false);
  const [showMoreDescription, setShowMoreDescription] = React.useState(false);
  const user = getProfile();
  const { width } = useWindowDimensions();
  const maxLenthDescription = Platform.select({
    ios: width / 3.7,
    android: width / 4,
    default: 80,
  });

  const hasMarks = (post && post?.clothing && post?.clothing?.length > 0) || (post && post?.people && post.people?.length > 0);

  function showAuthModal() {
    setBottomSheetProps({
      id: 'MainModal',
      content: <MainMenuLoginOrRegister />,
      snapPoints: [416],
    });
    expand();
  }

  function showMarks() {
    setBottomSheetProps({
      id: 'Marks',
      content: <Marks post={post} />,
      snapPoints: ['55%'],
    });
    expand();
  }

  const handleLikePost = (like: boolean) => {
    post.liked = like;
  };

  function handleOpenMenuComment() {
    if (!isLogged()) {
      showAuthModal();
      return;
    }

    setBottomSheetProps({
      id: 'CommentsPost',
      content: (
        <Comments
          postId={post.id}
          userPicture={user?.avatar ?? ''}
          userName={user?.username ?? ''}
        />
      ),
      snapPoints: ['95%'],
    });
    expand();
  }

  function handleOpenMenuPost() {
    if (!isLogged()) {
      showAuthModal();
      return;
    }
    setBottomSheetProps({ id: 'MenuPost', content: <MenuPost post={post} />, snapPoints: ['35%'] });
    expand();
  }

  async function handleToggleLikePost() {
    amplitude.track('Like Post');
    if (!isLogged()) {
      showAuthModal();
      return;
    }

    if (isLikeLoading) return;

    try {
      setIsLikeLoading(true);
      handleLikePost(!post.liked);
      Vibration.vibrate([10, 100, 50, 100]);
      await postSocialToggleLike(post.id, !post.liked);
    } catch (error) {
      handleLikePost(post.liked);
    } finally {
      setIsLikeLoading(false);
    }
  }

  function handleOpenSavePost() {
    if (!isLogged()) {
      showAuthModal();
      return;
    }
    setBottomSheetProps({
      id: 'FoldersPosts',
      content: <FoldersPosts post={post as unknown as SocialPostType} />,
      snapPoints: ['95%'],
    });
    expand();
  }

  const showOffer = post?.accept_offer;

  const handleHasLink = post?.clothing?.some((clothing) => clothing?.clothing?.link);

  function handleOpenOfferMenu() {
    amplitude.track('Click Offer');
    if (!isLogged()) {
      showAuthModal();
      return;
    }
    setBottomSheetProps({
      id: 'FoldersPosts',
      content: (
        <OfferMenu
          post={post as unknown as SocialPostType}
          hasLink={handleHasLink}
          onGoToStore={onGoToStore}
        />
      ),
      snapPoints: handleHasLink ? [220] : [160],
    });
    expand();
  }

  function handleNavigateUser() {
    if (!isLogged()) {
      showAuthModal();
      return;
    }

    if (post.username === user?.username) {
      navigation.navigate('Profile');
      return;
    }

    // @ts-expect-error
    navigation.navigate('AnotherUserProfile', {
      username: post.username,
      id: post.profile_id,
    });
  }

  const shareFunc = async () => {
    amplitude.track('Share Post');
    if (!isLogged()) {
      showAuthModal();
      return;
    }

    try {
      await Share.open({
                title: 'Still',
        url:
          Platform.OS === 'ios'
            ? `${post?.media[0]?.image_url}`
            : `https://app.fintiapp.com.br/home/feed/post/${post?.id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const taps = Gesture.Exclusive(
    Gesture.Tap().numberOfTaps(2).runOnJS(true).onStart(handleToggleLikePost),
    Gesture.Tap()
      .numberOfTaps(1)
      .runOnJS(true)
      .onStart(() => {
        if (isFeed) return;
        if (!isLogged()) {
          showAuthModal();
          return;
        }
        !isDetails && navigation.navigate('SocialPostDetails', { postId: post.id });
      })
  );

  function renderShowMoreDescription() {
    return !showMoreDescription ? (
      <S.ShowMoreButton onPress={() => setShowMoreDescription(true)}>
        <S.ShowMoreText>Mostrar mais</S.ShowMoreText>
      </S.ShowMoreButton>
    ) : (
      <S.ShowMoreButton onPress={() => setShowMoreDescription(false)}>
        <S.ShowMoreText>Mostrar menos</S.ShowMoreText>
      </S.ShowMoreButton>
    );
  }

  return (
    <S.Container>
      <S.MenuContainer onPress={handleOpenMenuPost}>
        <Dots width={24} height={24} />
      </S.MenuContainer>
      <GestureDetector gesture={taps}>
        <View>
          <S.Image
            source={{
              uri: post?.media[0]?.image_url,
              width: 1080,
              height: 1920,
              isAnimated: false,
            }}
            contentFit="cover"
            placeholder={LogoFinti}
            placeholderContentFit="cover"
          />
          {showOffer ? (
            <S.floatIconContainer onPress={handleOpenOfferMenu}>
              <S.FloatIcon name="tag-outline" />
            </S.floatIconContainer>
          ) : (
            <></>
          )}
        </View>
      </GestureDetector>
      <S.Content>
        <S.InfoAndActionsContainer>
          <S.UserDataContainer>
            <TouchableOpacity onPress={handleNavigateUser}>
              <S.UserPhoto source={{ uri: post.avatar }} cachePolicy="disk" />
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={handleNavigateUser}>
                <S.AtNameText>{post?.username}</S.AtNameText>
              </TouchableOpacity>
              <S.TimeText>{formatDistanceToNowStrict(new Date(post.created_at))}</S.TimeText>
            </View>
          </S.UserDataContainer>
          <S.ActionsContainer>
            <TouchableOpacity onPress={handleToggleLikePost}>
              {post.liked ? (
                <S.Icon2 name="heart" color={theme?.colors.red01} />
              ) : (
                <S.Icon name="heart" />
              )}
            </TouchableOpacity>

            {hasMarks && (
              <TouchableOpacity onPress={showMarks}>
                <S.IconRotate name="tag" />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleOpenMenuComment}>
              <S.Icon name="message-circle" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleOpenSavePost}>
              <S.Icon name="bookmark" />
            </TouchableOpacity>

            <TouchableOpacity onPress={shareFunc}>
              <S.Icon name="arrow-up-right" />
            </TouchableOpacity>
          </S.ActionsContainer>
        </S.InfoAndActionsContainer>
        <S.DescriptionContainer>
          <S.Description numberOfLines={showMoreDescription ? 6 : 2}>
            {showMoreDescription
              ? post.description
              : post.description?.slice(0, maxLenthDescription).trim() +
                `${post.description?.length > maxLenthDescription ? '...' : ''}`}
          </S.Description>
          {post.description.length > maxLenthDescription ? renderShowMoreDescription() : <></>}
          <S.CommentsButton onPress={handleOpenMenuComment}>
            <S.TimeText>
              {post?.comments ? `Ver ${post?.comments} comentários` : 'Ver comentários'}
            </S.TimeText>
          </S.CommentsButton>
        </S.DescriptionContainer>
      </S.Content>
    </S.Container>
  );
}

const MemoizedPost = React.memo(Post);

export { MemoizedPost as Post };
