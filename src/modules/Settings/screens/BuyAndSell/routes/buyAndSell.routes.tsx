import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { HistoryBuy } from '@/modules/Settings/screens/BuyAndSell/screens/HistoryBuy';
import { BuyAndSell } from '@/modules/Settings/screens/BuyAndSell/screens/Home';
import { MyOffers } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffers';
import { Details } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffers/Details';
import { Evaluation } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffers/Evaluation';
import { Success } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffers/Success';
import { Support } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffers/Support';
import { MyOffersDone } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffersDone';
import { DetailsDone } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffersDone/Details';
import { EvaluationDone } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffersDone/Evaluation';
import { SuccessDone } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffersDone/Success';
import { SupportDone } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffersDone/Support';
import { MyPiggyBank } from '@/modules/Settings/screens/BuyAndSell/screens/MyPiggyBank';

import { type BuyAndSellStackParamList } from './buyAndSell.types';

const { Navigator, Screen } = createNativeStackNavigator<BuyAndSellStackParamList>();

export function BuyAndSellStack() {
  return (
    <Navigator
      screenOptions={{
        animation: 'slide_from_right',
        header: HeaderRoute,
      }}
    >
      <Screen name="Home" component={BuyAndSell} options={{ title: 'Compra e Venda' }} />
      <Screen
        name="HistoryBuy"
        component={HistoryBuy}
        options={{ title: 'Histórico de Compras' }}
      />
      <Screen name="MyPiggyBank" component={MyPiggyBank} options={{ title: 'Meu cofrinho' }} />
      <Screen name="MyOffers" component={MyOffers} options={{ title: 'OFERTAS RECEBIDAS' }} />
      <Screen
        name="MyOffersDone"
        component={MyOffersDone}
        options={{ title: 'OFERTAS REALIZADAS' }}
      />
      <Screen name="MyOffersDetails" component={Details} options={{ title: 'MINHAS OFERTAS' }} />
      <Screen
        name="MyOffersDetailsDone"
        component={DetailsDone}
        options={{ title: 'MINHAS OFERTAS' }}
      />
      <Screen name="Evaluation" component={Evaluation} options={{ headerShown: false }} />
      <Screen name="Success" component={Success} options={{ headerShown: false }} />
      <Screen name="EvaluationDone" component={EvaluationDone} options={{ headerShown: false }} />
      <Screen name="SuccessDone" component={SuccessDone} options={{ headerShown: false }} />
      <Screen name="Support" component={Support} options={{ title: 'AJUDA' }} />
      <Screen name="SupportDone" component={SupportDone} options={{ title: 'AJUDA' }} />
    </Navigator>
  );
}
