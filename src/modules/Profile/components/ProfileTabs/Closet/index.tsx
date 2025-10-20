import React, { useEffect } from 'react';

import { Loading } from '@/components/Loading';
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
  const {
    closetClothing,
    closetLook,
    setSelectedTab,
    isLoadingClosetClothing,
    isLoadingClosetLook,
    userData,
    refetchClosetClothing,
    refetchClosetLook,
  } = useProfile();

  const totalClothings = closetClothing?.pages[0]?.meta?.total ?? 0;
  const totalLooks = closetLook?.pages[0]?.meta?.total ?? 0;

  useEffect(() => {
    setSelectedTab('closet');
    refetchClosetClothing();
    refetchClosetLook();
  }, []);

  const categorizedClothingItems = React.useMemo(
    () => closetClothing?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [closetClothing]
  );
  const categorizedLookItems = React.useMemo(
    () => closetLook?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [closetLook]
  );

  if (isLoadingClosetClothing || isLoadingClosetLook) {
    return <Loading hasBackground={false} />;
  }

  function showContent() {
    if (!categorizedClothingItems?.length && !categorizedLookItems?.length) {
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
            isStore={userData?.profile_type === 'store'}
          />

          {userData?.profile_type !== 'store' ? (
            <ClosetCategoryItem
              key={`looks_category`}
              description="Looks"
              items={categorizedLookItems}
              firstNavigate
              isTab={isTab}
              total={totalLooks}
            />
          ) : null}
        </S.Content>
      );
    }
  }

  return <S.Container>{showContent()}</S.Container>;
}
