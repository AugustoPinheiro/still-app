import React from 'react';
import { FlatList } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

export function ListSaves() {
  const { params } = useRoute<any>();
  const theme = useTheme();
  const { data } = params;

  const renderItem = React.useCallback(
    ({ item }: any) => (
      <Image
        source={{ uri: item }}
        cachePolicy="disk"
        style={{
          width: '100%',
          height: 544,
          backgroundColor: theme?.colors?.gray06,
          borderWidth: 1,
          borderColor: theme?.colors?.gray06,
        }}
      />
    ),
    []
  );

  return (
    <S.Container>
      <S.Content>
        <FlatList
          data={data?.images}
          keyExtractor={(item): string => `${item}`}
          contentContainerStyle={{
            paddingBottom: 80,
            width: '100%',
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </S.Content>
    </S.Container>
  );
}
