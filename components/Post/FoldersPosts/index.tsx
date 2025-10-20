import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { Switch } from '@/components/Switch';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import {
  getSocialSavedPostsFolders,
  savePostNewFolder,
} from '@/modules/Social/services/social.services';
import { SocialPostType } from '@/types/SocialPostType';

import { FolderPostRow } from './FolderPostRow';
import * as S from './styles';

type Props = {
  post: SocialPostType;
};

const schema = z.object({
  title: z.string().nonempty('O nome da pasta não pode ser vazio'),
  isPrivate: z.boolean(),
});

type formType = z.infer<typeof schema>;

export function FoldersPosts({ post }: Props) {
  const theme = useTheme();
  const { show } = useToast();
  const [showNew, setShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { close } = useBottomSheet();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      isPrivate: false,
    },
  });

  const {
    data,
    isLoading: isLoadingFolder,
    refetch,
  } = useQuery({
    queryKey: ['folders'],
    queryFn: getSocialSavedPostsFolders,
  });
  const showCreateNewFolder = showNew || (!data?.length && !isLoading);

  async function handleCreateNewFolder(data: formType) {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await savePostNewFolder(data.title, data.isPrivate, post.id);
      await refetch();
      setShowNew(false);

      show({
        type: 'success',
        message: 'Post salvo com sucesso',
      });
    } catch (error: any) {
      const message = error?.message ?? 'Não foi possível criar a pasta';

      show({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleGoBack() {
    if (showNew) {
      setShowNew(false);
      refetch();
    } else close();
  }

  if (isLoading) {
    return (
      <S.Container>
        <Loading hasBackground={false} />
      </S.Container>
    );
  }

  function renderContent() {
    if (isLoadingFolder) {
      return <Loading hasBackground={false} />;
    }

    if (showCreateNewFolder) {
      return (
        <>
          <S.Title>Nova pasta</S.Title>
          <S.FolderPhoto source={{ uri: post?.media[0]?.image_url }} cachePolicy="disk" />
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Nome da pasta"
                placeholder="Nome da pasta"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <S.Row lessMargin>
            <S.SubTitleFolder>Pasta privada</S.SubTitleFolder>
            <Controller
              name="isPrivate"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Switch value={value} onValueChange={onChange} />
              )}
            />
          </S.Row>
          <S.InfoFolder>Somente você poderá visualizar esta pasta</S.InfoFolder>
          <Button
            title="Criar pasta"
            disabled={!isValid}
            onPress={handleSubmit(handleCreateNewFolder)}
          />
        </>
      );
    }

    return (
      <>
        <S.Title>Salvar publicação</S.Title>
        <S.Row>
          <S.SubTitleFolder>Pasta</S.SubTitleFolder>
          <TouchableOpacity onPress={() => setShowNew(true)}>
            <S.Icon name="plus" color={theme.colors.primary_black} />
          </TouchableOpacity>
        </S.Row>

        <BottomSheetFlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => `folder-${item.folder_id}`}
          renderItem={({ item }) => (
            <FolderPostRow folder={item} postId={post.id} refetch={refetch as any} />
          )}
        />
      </>
    );
  }

  return (
    <S.Container>
      <S.ContainerClose onPress={handleGoBack}>
        <S.Icon name="x" color={theme.colors.gray04} />
      </S.ContainerClose>

      {renderContent()}
    </S.Container>
  );
}
