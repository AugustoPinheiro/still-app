import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import DollarCoinIcon from '@/assets/images/dollarCoinIcon.svg';
import InvoiceIcon from '@/assets/images/invoiceIcon.svg';
import LockIcon from '@/assets/images/lockIcon.svg';
import { type BuyAndSellStackParamList } from '@/modules/Settings/screens/BuyAndSell/routes/buyAndSell.types';

import * as S from './styles';

type BuyAndSellNavigationProp = NativeStackNavigationProp<BuyAndSellStackParamList, 'Home'>;

export function BuyAndSell() {
  const navigation = useNavigation<BuyAndSellNavigationProp>();

  return (
    <S.ContainerDefault>
      <S.Container>
        <S.Option
          onPress={() => {
            navigation.navigate('MyOffers');
          }}
        >
          <InvoiceIcon width={20} height={20} />
          <S.Label>Ofertas Recebidas</S.Label>
        </S.Option>
        <S.Option
          onPress={() => {
            navigation.navigate('MyOffersDone');
          }}
        >
          <DollarCoinIcon width={20} height={20} />
          <S.Label>Ofertas Realizadas</S.Label>
        </S.Option>
        {/* <S.Option
          onPress={() => {
            navigation.navigate('HistoryBuy');
          }}
        >
          <AccountIcon width={20} height={20} />
          <S.Label>Histórico de compras</S.Label>
        </S.Option> */}

        <S.Option
          onPress={() => {
            navigation.navigate('MyPiggyBank');
          }}
        >
          <LockIcon width={20} height={20} />
          <S.Label>Meu cofrinho</S.Label>
        </S.Option>
      </S.Container>
    </S.ContainerDefault>
  );
}
