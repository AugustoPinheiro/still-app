import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { SocialCommentType } from '@/types/SocialCommentType';

import CommentText from './CommentText';
import * as S from './styles';

interface ICommentProps {
  comment: SocialCommentType;
  username: string;
  onDelete?: () => void;
  isActionLoading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CommentRow({
  comment,
  username,
  onDelete,
  isActionLoading,
  setLoading,
}: ICommentProps) {
  const navigation = useNavigation();
  const { close } = useBottomSheet();
  const isMyComment = comment?.username === username;

  const formatDistanceOptions = {
    locale: {
      ...ptBR,
      formatDistance: (unit: string, count: number) => {
        switch (true) {
          case unit === 'xDays':
            return `${count}d`;

          case unit === 'xHours':
            return `${count}h`;

          case unit === 'xMinutes':
            return `${count}min`;

          case unit === 'xMonths':
            return `${count}M`;

          case unit === 'xSeconds':
            return `${count}s`;

          case unit === 'xYears':
            return `${count}y`;
        }

        return '%d hours';
      },
    },
  };

  function handleNavigateUser() {
    close();

    if (isMyComment) {
      navigation.navigate('Profile');
      return;
    }

    // @ts-expect-error
    navigation.navigate('AnotherUserProfile', {
      username: comment?.username,
    });
  }

  return (
    <S.Container>
      <S.UserPhoto source={{ uri: comment?.avatar }} cachePolicy="disk" />
      <S.Content>
        <S.UserDataContainer onPress={handleNavigateUser}>
          <S.AtNameText>{comment?.username}</S.AtNameText>
          {comment?.created_at ? (
            <S.TimeText>
              {formatDistanceToNowStrict(new Date(comment?.created_at), formatDistanceOptions)}
            </S.TimeText>
          ) : (
            <></>
          )}
        </S.UserDataContainer>
        <CommentText
          text={comment.text}
          isMyComment={isMyComment}
          onDelete={onDelete}
          isActionLoading={isActionLoading}
          setLoading={setLoading}
        />
      </S.Content>
    </S.Container>
  );
}
