import React from 'react';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { getProfile } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { checkUsernameAvailability } from '@/modules/Discovery/screens/Register/services/register.services';

import * as S from './styles';

interface ICommentTextProps {
  text: string;
  isMyComment?: boolean;
  onDelete?: () => void;
  isActionLoading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentText = ({
  text,
  isMyComment,
  onDelete,
  isActionLoading,
  setLoading,
}: ICommentTextProps) => {
  const navigation = useNavigation();
  const { close } = useBottomSheet();
  const { show } = useToast();
  const user = getProfile();
  const words = text.split(' ');

  async function handleUsernameAvailble(username: string) {
    try {
      setLoading?.(true);
      const isAvailable = await checkUsernameAvailability(username.replace('@', ''));
      return !isAvailable;
    } catch (error) {
      return false;
    } finally {
      setLoading?.(false);
    }
  }

  const hasAtOnWord = (word: string) => word.startsWith('@');

  async function handleNavigateUser(word: string) {
    const isUserAvailable = await handleUsernameAvailble(word);

    if (!isUserAvailable) {
      show({
        type: 'warning',
        message: 'Usuário não existe',
      });

      return;
    }

    close();
    const username = word.replace('@', '');

    if (username === user?.username) {
      // @ts-expect-error
      navigation.navigate('Profile');
      return;
    }

    // @ts-expect-error
    navigation.navigate('AnotherUserProfile', {
      username,
    });
  }

  return (
    <S.Container>
      {words.map((word, index) => (
        <React.Fragment key={`${index}_${word}`}>
          {hasAtOnWord(word) ? (
            <TouchableOpacity onPress={async () => await handleNavigateUser(word)}>
              <S.TimeText key={`${index}_${word}`} hasColor>
                {word}
                {index < words.length - 1 ? ' ' : ''}
              </S.TimeText>
            </TouchableOpacity>
          ) : (
            <S.TimeText key={`${index}_${word}`}>
              {word}
              {index < words.length - 1 ? ' ' : ''}
            </S.TimeText>
          )}
        </React.Fragment>
      ))}
      {isMyComment ? (
        <S.FloatingButton onPress={onDelete} disabled={isActionLoading}>
          {isActionLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <S.Icon name="trash-can-outline" size={18} />
          )}
        </S.FloatingButton>
      ) : (
        <></>
      )}
    </S.Container>
  );
};

export default CommentText;
