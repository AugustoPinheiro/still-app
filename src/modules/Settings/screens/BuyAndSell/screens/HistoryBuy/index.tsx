import React from 'react';
import { FlatList } from 'react-native';

import { Card } from '@/modules/Settings/screens/BuyAndSell/components/Card';
import { Separator } from '@/modules/Settings/screens/BuyAndSell/components/Separator';

import * as S from './styles';

const data = [
  { id: 1, text: 'Zara 1', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 2, text: 'Zara 2', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 3, text: 'Zara 3', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 4, text: 'Zara 4', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 5, text: 'Zara 5', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 6, text: 'Zara 6', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 7, text: 'Zara 7', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 8, text: 'Zara 8', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 9, text: 'Zara 9', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 10, text: 'Zara 10', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
  { id: 11, text: 'Zara 11', value: 'R$ 100,00', status: '01/06/2023 - 12:03 • Concluída' },
];

export function HistoryBuy() {
  return (
    <S.ContainerDefault>
      <S.Container>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Card item={item} />}
          ItemSeparatorComponent={Separator}
        />
      </S.Container>
    </S.ContainerDefault>
  );
}
