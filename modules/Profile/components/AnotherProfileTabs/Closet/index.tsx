import React, { useCallback, useEffect } from 'react';

import { ClosetCategoryItem } from '@/modules/Profile/components/ClosetCategoryItem';
import { useAnotherProfile } from '@/modules/Profile/contexts/anotherProfile.contexts';
import { InfiniteQueryDataCloset } from '@/types/ClosetClothingType';

import * as S from './styles';

type ClosetProps = {
  closet: InfiniteQueryDataCloset | undefined;
  name: string;
  isTab?: boolean;
};

export function Closet({ name, isTab }: ClosetProps) {
  const { closetClothing, closetLook, setSelectedTab, userData } = useAnotherProfile();

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

  const showContent = useCallback(() => {
    if ((userData?.private && !userData?.followed) || userData?.private_closet) {
      return (
        <>
          <S.EmptyTitle>Essa seção é privada.</S.EmptyTitle>
          <S.EmptyText>{name} preferiu privar seu closet.</S.EmptyText>
        </>
      );
    } else if (!categorizedClothingItems?.length && !categorizedLookItems?.length) {
      return (
        <S.EmptyTitle>
          {[userData?.name?.trim(), userData?.last_name?.trim()].join(' ')} ainda não possui nada no
          seu closet
        </S.EmptyTitle>
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
            isAnotherUser
            isStore={userData?.profile_type === 'store'}
          />

          {userData?.profile_type !== 'store' ? (
            <ClosetCategoryItem
              key={`looks_category`}
              description="Looks"
              items={categorizedLookItems as any}
              firstNavigate
              isTab={isTab}
              total={totalLooks}
              isLook
              isAnotherUser
            />
          ) : (
            <></>
          )}
        </S.Content>
      );
    }
  }, [
    userData,
    privateClothings,
    privateLooks,
    categorizedClothingItems,
    categorizedLookItems,
    totalClothings,
    totalLooks,
    isTab,
    name,
  ]);

  return <S.Container>{showContent()}</S.Container>;
}
