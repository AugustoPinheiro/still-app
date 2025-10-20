import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';

import * as amplitude from '@amplitude/analytics-react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { useDebounce } from '@/hooks/useDebounce';
import {
  deleteSocialComment,
  getSocialComments,
  postSocialComment,
  searchProfiles,
} from '@/modules/Social/services/social.services';
import { SocialCommentType } from '@/types/SocialCommentType';
import { SocialFeedType } from '@/types/SocialFeedType';
import { SocialProfileType } from '@/types/SocialProfileType';

import { CommentRow } from './CommentRow';
import * as S from './styles';

interface ICommentsProps {
  userPicture: string;
  userName: string;
  postId: number;
}

const schema = z.object({
  comment: z.string().min(1, 'O comentário não pode ser vazio'),
});

export function Comments({ userPicture, userName, postId }: ICommentsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [actionLoading, setActionLoading] = useState<number>(0);
  const { show } = useToast();
  const [search, setSearch] = useState('');
  const debounceValue = useDebounce<string>(search, 700);
  const [startSearch, setStartSearch] = useState(false);
  const [lastAtIndex, setLastAtIndex] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  async function fetchComments({ pageParam = undefined }) {
    try {
      const response = await getSocialComments(postId, pageParam);
      return response;
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível carregar os comentários',
      });
    }
  }

  const {
    data,
    isLoading: isLoadingComments,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [`comments${postId}`, postId],
    initialPageParam: undefined,
    queryFn: fetchComments,
    getNextPageParam: (lastPage: any) => lastPage?.meta?.cursor,
  });

  async function fetchSearch({ pageParam = 0 }) {
    try {
      const data = await searchProfiles(undefined, search, pageParam);

      return data;
    } catch (error) {
      console.error(error);

      show({
        message: 'Erro ao carregar perfis, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  const {
    data: profilesPages,
    isLoading: isLoadingProfiles,
    isFetching: isFetchingProfiles,
    hasNextPage: hasNextPageProfiles,
    fetchNextPage: fetchNextPageProfiles,
    isFetchingNextPage: isFetchingNextPageProfiles,
  } = useInfiniteQuery({
    queryKey: ['searchProfiles', debounceValue],
    queryFn: fetchSearch,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      const limit = 30;
      const total = lastPage?.count ?? 0;
      const totalPage = Math.ceil(total / limit);
      const count = (allpages?.length ?? 0) + 1;
      return count <= totalPage ? count : undefined;
    },
    enabled: !!debounceValue,
  });

  // const profiles = React.useMemo(
  //   () => profilesPages?.pages.flatMap((page) => page?.data ?? []),
  //   [profilesPages]
  // );
  const profiles = profilesPages;

  const comments = React.useMemo(
    () => data?.pages.flatMap((page: any) => page?.result ?? []) as SocialCommentType[],
    [data]
  );

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      comment: '',
    },
  });

  const commentWatch = watch('comment');

  function handleUpdateCommentsInPost(reduce?: boolean) {
    queryClient.setQueryData(['socialPosts'], (state: any) => {
      if (!state?.pages) return state;

      const newPages = state?.pages?.map((page: { result?: SocialFeedType }) => {
        if (!page?.result) return page;

        const newResult = page?.result?.map((post: SocialFeedType) => {
          if (post?.id === postId) {
            const countComments = post?.comments ?? 0;
            const newComments = reduce ? countComments - 1 : countComments + 1;

            return {
              ...post,
              comments: newComments < 0 ? 0 : newComments,
            };
          }

          return post;
        });

        return { ...page, result: newResult };
      });

      const newState = { ...state, pages: newPages };

      return newState;
    });
  }

  const handleDeleteComment = React.useCallback(async (comment: SocialCommentType) => {
    try {
      Alert.alert('Excluir comentário', 'Deseja realmente excluir o comentário?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setActionLoading(comment.id);
              await deleteSocialComment(comment.id);
              await refetch();
              handleUpdateCommentsInPost(true);
            } catch (error) {
              show({
                type: 'error',
                message: 'Não foi possível deletar o comentário',
              });
            } finally {
              setActionLoading(0);
            }
          },
        },
      ]);
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível deletar o comentário',
      });
    }
  }, []);

  async function handleSubmitComment(data: any) {
    amplitude.track('Comment Post');
    if (isLoading) return;

    try {
      setIsLoading(true);
      await postSocialComment(postId, data.comment);
      await refetch();
      handleUpdateCommentsInPost();
      reset();
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível enviar seu comentário',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function getProfileUser(user?: SocialProfileType) {
    if (user?.common_profile) {
      return user.common_profile;
    }

    if (user?.professional_profile) {
      return user.professional_profile;
    }

    if (user?.store_profile) {
      return user.store_profile;
    }
  }

  function setUsernameOnComment(username: string) {
    const commentToAt = commentWatch.substring(0, lastAtIndex + 1);

    setValue('comment', `${commentToAt + username} `);
    setLastAtIndex(0);
    setStartSearch(false);
  }

  function renderProfiles({ item }: { item: SocialProfileType }) {
    const profile = getProfileUser(item);

    return (
      <S.Option
        onPress={() => {
          setUsernameOnComment(item.username);
        }}
      >
        <S.ProfilePhoto source={{ uri: profile?.avatar }} cachePolicy="disk" />
        <S.OptionText>{[profile?.name, profile?.last_name].join(' ')}</S.OptionText>
      </S.Option>
    );
  }

  function handleSearchProfile(key: string) {
    const lastKey = key.slice(-1);
    const keyWithoutSpaces = lastKey.replace(/\s/g, '');

    if (!keyWithoutSpaces) {
      setStartSearch(false);
      setSearch('');
      return;
    }

    if (!startSearch && keyWithoutSpaces === '@') {
      setLastAtIndex(key.length - 1);
      setStartSearch(true);
    } else if (startSearch) {
      setSearch(key.slice(lastAtIndex + 1).replace('@', ''));
    }
  }

  if (showLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      {startSearch ? (
        <>
          {isLoadingProfiles || isFetchingProfiles ? <ActivityIndicator /> : <></>}
          <BottomSheetFlatList
            showsVerticalScrollIndicator={false}
            data={profiles}
            keyExtractor={(item) => `${item?.id}`}
            renderItem={renderProfiles}
            contentContainerStyle={{ flexGrow: 1, gap: 16, paddingHorizontal: 20, paddingTop: 20 }}
            onEndReached={() => {
              if (
                isFetchingNextPageProfiles ||
                !hasNextPageProfiles ||
                isFetchingProfiles ||
                isLoadingProfiles
              )
                return;
              fetchNextPageProfiles();
            }}
            ListEmptyComponent={() => <S.EmptyListText>Nenhum usuário encontrado</S.EmptyListText>}
          />
        </>
      ) : (
        <>
          <S.Title>Comentários</S.Title>

          {isLoadingComments ? <Loading hasBackground={false} /> : <></>}

          <BottomSheetFlatList
            showsVerticalScrollIndicator={false}
            data={comments}
            keyExtractor={(item) => `${item?.id}`}
            renderItem={({ item }) => (
              <CommentRow
                comment={item}
                username={userName}
                onDelete={async () => await handleDeleteComment(item)}
                isActionLoading={actionLoading === item.id}
                setLoading={setShowLoading}
              />
            )}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 12, paddingTop: 0 }}
            onEndReached={() => {
              if (isFetchingNextPage || !hasNextPage || isFetching || isLoading) return;
              fetchNextPage();
            }}
            ListEmptyComponent={() => <S.EmptyListText>Nenhum feito ainda</S.EmptyListText>}
          />
        </>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 54 : 0}
      >
        <S.CommentInputContainer>
          <S.UserPhoto source={{ uri: userPicture }} cachePolicy="disk" />
          <S.WrapperInput>
            <Controller
              name="comment"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  placeholder={isLoading ? 'Enviando comentário...' : `Comentar como ${userName}`}
                  value={value}
                  onChangeText={(texte) => {
                    onChange(texte);
                    handleSearchProfile(texte);
                  }}
                  onBlur={onBlur}
                  editable={!isLoading}
                  isLoading={isLoading}
                  rightIcon={{
                    text: value ? 'Publicar' : '',
                    onPress: handleSubmit(handleSubmitComment),
                  }}
                  keyboardType="default"
                  returnKeyType="send"
                  returnKeyLabel="Publicar"
                  onSubmitEditing={handleSubmit(handleSubmitComment)}
                  paddingRight={52}
                  width="98%"
                />
              )}
            />
          </S.WrapperInput>
        </S.CommentInputContainer>
      </KeyboardAvoidingView>
    </S.Container>
  );
}
