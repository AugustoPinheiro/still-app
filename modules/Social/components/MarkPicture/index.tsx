import React, { useState } from 'react';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';

import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { useDebounce } from '@/hooks/useDebounce';
import { ISelectUserOrStore } from '@/modules/Social/screens/NewPost/contexts/newPost.contexts';
import { searchProfiles } from '@/modules/Social/services/social.services';

import { MarkPictureRow } from '../MarkPictureRow';
import * as S from './styles';

interface IMarkPictureProps {
  title: string;
  searchText: string;
  setSelected: React.Dispatch<React.SetStateAction<ISelectUserOrStore[]>>;
  pos: { x: number; y: number };
  type: 'common' | 'store' | 'professional';
}
export function MarkPicture({ title, searchText, setSelected, pos, type }: IMarkPictureProps) {
  const { close } = useBottomSheet();
  const theme = useTheme();
  const { show } = useToast();
  const [search, setSearch] = useState('');
  const debounceValue = useDebounce<string>(search, 700);

  async function fetchSearch() {
    try {
      const { data } = await searchProfiles(type, search);

      if (!data?.length && search) {
        setSearch('');

        show({
          message:
            'Não encontramos perfil com esses filtros. Por favor, refine sua busca e tente novamente',
          type: 'warning',
        });
      }
      return data;
    } catch (error) {
      console.error('aqui', error);
      show({
        message: 'Erro ao carregar perfis, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['socialProfiles', type, debounceValue],
    queryFn: fetchSearch,
  });

  function toggleSelectedItem(item: ISelectUserOrStore) {
    setSelected((prevSelecteds) => {
      return [
        ...prevSelecteds.filter((selectedItem) => selectedItem.id !== item.id),
        { ...item, type, pos },
      ];
    });

    close();
  }

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      <S.ContentLook>
        <S.ArrowBackButtonContainer onPress={close}>
          <S.Icon name="arrow-left" size={theme.fontSizes.XL} />
        </S.ArrowBackButtonContainer>
        <S.AtNameText>{title}</S.AtNameText>
      </S.ContentLook>
      <S.ContentInput>
        <Input
          leftIcon={{
            name: 'search',
          }}
          placeholder={searchText}
          value={search}
          onChangeText={(e) => setSearch(e)}
        />
      </S.ContentInput>
      <BottomSheetFlatList
        showsVerticalScrollIndicator={false}
        data={data as ISelectUserOrStore[]}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => (
          <MarkPictureRow
            user={item}
            lastItem={index === data?.length - 1}
            toggleSelectedItem={toggleSelectedItem}
            type={type}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      />
    </S.Container>
  );
}
