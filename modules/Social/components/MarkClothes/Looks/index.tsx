import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { CardsImage } from '@/components/CardsImage';
import { Loading } from '@/components/Loading';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { getClosetLooks } from '@/modules/Closet/services/closet.services';
import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetLookType } from '@/types/ClosetLookType';

import * as S from './styles';

type Props = {
  setSelectedItem: React.Dispatch<React.SetStateAction<ClosetClothingType[] | ClosetLookType[]>>;
};

export function Looks({ setSelectedItem }: Props) {
  const { show } = useToast();
  const { close } = useBottomSheet();

  async function fetchClosetLooks() {
    try {
      const data = await getClosetLooks();

      return data?.result;
    } catch (error) {
      show({
        message: 'Erro ao carregar looks, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['looks'],
    queryFn: fetchClosetLooks,
  });

  function handleSelect(item: any) {
    setSelectedItem((prevState) => [...prevState, item]);
    close();
  }

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      {data?.length ? (
        <CardsImage
          data={data}
          hasTitle={false}
          isSelecting={false}
          onPress={handleSelect}
          isItemSelected={() => false}
          onClickItem={handleSelect}
        />
      ) : (
        <></>
      )}
    </S.Container>
  );
}
