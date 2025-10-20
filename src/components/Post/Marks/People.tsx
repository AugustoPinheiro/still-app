import React from 'react';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { SocialFeedType } from '@/types/SocialFeedType';

import * as S from './styles';

type Props = {
  people: SocialFeedType['people'];
};

export function People({ people }: Props) {
  const navigation = useNavigation<any>();
  const { close } = useBottomSheet();

  function handleNavigateUser(item: any) {
    navigation.navigate('AnotherUserProfile', {
      username: item.username,
      id: item.profile_id,
    });

    close();
  }

  return (
    <S.Container>
      <BottomSheetFlatList
        data={people}
        contentContainerStyle={{ padding: 20, gap: 20 }}
        keyExtractor={(item) => String(item?.profile_id)}
        renderItem={({ item }) => (
          <S.Line>
            <S.TouchToProfile
              onPress={() =>
                handleNavigateUser({
                  username: item?.profile?.username,
                  profile_id: item?.profile_id,
                })
              }
            >
              <S.Photo source={{ uri: item?.profile?.avatar }} cachePolicy="disk" />
              <S.LabelName>@{item?.profile?.username}</S.LabelName>
            </S.TouchToProfile>
          </S.Line>
        )}
      />
    </S.Container>
  );
}
