import React, { useEffect } from 'react';

import { ClosetCategoryItem } from '@/modules/Profile/components/ClosetCategoryItem';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';
import { InfiniteQueryDataCloset } from '@/types/ClosetClothingType';

import * as S from './styles';

type ClosetProps = {
  closet: InfiniteQueryDataCloset | undefined;
  name: string;
  isTab?: boolean;
};

export function Closet({ name, isTab }: ClosetProps) {
  const { setSelectedTab } = useProfile();
  const { closetClothing, closetLook } = useProfile();

  const totalClothings = closetClothing?.pages[0]?.meta?.total ?? 0;
  const privateClothings = closetClothing?.pages[0]?.meta?.private ?? false;

  const totalLooks = closetLook?.pages[0]?.meta?.total ?? 0;
  const privateLooks = closetLook?.pages[0]?.meta?.private ?? false;

  useEffect(() => {
    setSelectedTab('closet');
  }, []);

  const categorizedClothingItems = React.useMemo(
    () => closetClothing?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [closetClothing]
  );
  const categorizedLookItems = React.useMemo(
    () => closetLook?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [closetLook]
  );

  function showContent() {
    if (privateClothings || privateLooks) {
      return (
        <>
          <S.EmptyTitle>Essa seção é privada.</S.EmptyTitle>
          <S.EmptyText>{name} preferiu privar seus salvos.</S.EmptyText>
        </>
      );
    } else if (!totalClothings && !totalLooks) {
      return (
        <>
          <S.EmptyTitle>Você ainda não possui nada no seu closet</S.EmptyTitle>
          <S.EmptyText>
            Digitalize as suas primeiras peças para poder montar os seus looks e inspirar outras
            pessoas
          </S.EmptyText>
        </>
      );
    } else {
      return (
        <S.Content>
          <ClosetCategoryItem
            key={`clothing_category`}
            description="Peças"
            items={categorizedClothingItems}
            firstNavigate
            isTab={isTab}
            total={totalClothings}
          />

          <ClosetCategoryItem
            key={`looks_category`}
            description="Looks"
            items={categorizedLookItems}
            firstNavigate
            isTab={isTab}
            total={totalLooks}
            isLook
          />
        </S.Content>
      );
    }
  }

  return <S.Container>{showContent()}</S.Container>;
}
