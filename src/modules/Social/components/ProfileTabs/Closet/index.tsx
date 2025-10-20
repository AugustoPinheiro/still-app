import React, { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button } from '@/components/Button';
import { ClosetCategoryItem } from '@/modules/Social/components/ClosetCategoryItem';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';
import { ClosetClothingType, InfiniteQueryDataCloset } from '@/types/ClosetClothingType';

import * as S from './styles';

type ClosetProps = {
  closet: InfiniteQueryDataCloset | undefined;
  name: string;
  isTab?: boolean;
};

export function Closet({ closet, name, isTab }: ClosetProps) {
  const navigation = useNavigation<any>();

  const { setSelectedTab, userData } = useAnotherProfile();

  const total = closet?.pages[0]?.meta?.total ?? 0;

  useEffect(() => {
    setSelectedTab('closet');
  }, []);

  function groupByCategoryArray(
    clothingList: ClosetClothingType[]
  ): Array<{ category_id: string; items: ClosetClothingType[] }> {
    return [
      {
        category_id: 'Peças',
        items: clothingList,
      },
    ];
  }

  const categorizedClothingItems = groupByCategoryArray(
    closet?.pages.flatMap((page) => page.result) ?? []
  );

  function handleNavigationToSuggestions() {
    navigation.navigate({
      name: 'NewSuggestions',
    });
  }

  const showContent = useCallback(() => {
    if ((userData?.private && !userData?.followed) || userData?.private_closet) {
      return (
        <>
          <S.EmptyTitle>Essa seção é privada.</S.EmptyTitle>
          <S.EmptyText>{name} preferiu privar seu closet.</S.EmptyText>
        </>
      );
    } else if (!closet?.pages[0]?.meta?.total) {
      return (
        <>
          <S.EmptyTitle>
            {[userData?.name?.trim(), userData?.last_name?.trim()].join(' ')} ainda não possui nada
            no seu closet
          </S.EmptyTitle>
        </>
      );
    } else {
      return (
        <>
          { userData?.profile_type === 'common' ? (
            <S.Section>
              <Button
                title="Sugerir um look"
                onPress={handleNavigationToSuggestions}
                disabled={closet?.pages[0]?.meta?.total < 2}
              />
            </S.Section>
          )  : (<></>) }
          
          <FlatList
            data={categorizedClothingItems ?? []}
            keyExtractor={(item): string => `${item?.category_id}`}
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={{
              gap: 20,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ClosetCategoryItem
                description={`${item?.category_id}`}
                items={item?.items}
                firstNavigate
                isTab={isTab}
                total={total > 5 ? total - 5 : total}
                isStore={userData?.profile_type === 'store'}
              />
            )}
          />
        </>
      );
    }
  }, [closet, userData, name, isTab, total]);

  return <S.Container>{showContent()}</S.Container>;
}
