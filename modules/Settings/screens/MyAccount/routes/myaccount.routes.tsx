import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { BlockedAccounts } from '@/modules/Settings/screens/MyAccount/screens/BlockedAccounts';
import { ChangePassword } from '@/modules/Settings/screens/MyAccount/screens/ChangePassword';
import { MyAccount } from '@/modules/Settings/screens/MyAccount/screens/Home';
import { MyCreditCards } from '@/modules/Settings/screens/MyAccount/screens/MyCreditCards';
import { MyData } from '@/modules/Settings/screens/MyAccount/screens/MyData';
import { Preferences } from '@/modules/Settings/screens/MyAccount/screens/Preferences';
import { Privacy } from '@/modules/Settings/screens/MyAccount/screens/Privacy';

import { type MyAccountStackParamList } from './myaccount.types';
import { CardForm } from '../screens/MyCreditCards/CardForm';

const { Navigator, Screen } = createNativeStackNavigator<MyAccountStackParamList>();

export function MyAccountStack() {
  return (
    <Navigator
      screenOptions={{
        animation: 'slide_from_right',
        header: HeaderRoute,
      }}
    >
      <Screen name="Home" component={MyAccount} options={{ title: 'Minha Conta' }} />
      <Screen name="MyData" component={MyData} options={{ title: 'Meus Dados' }} />
      <Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: 'Alterar senha' }}
      />
      <Screen
        name="Preferences"
        component={Preferences}
        options={{ title: 'Editar preferências' }}
      />
      <Screen name="MyCreditCards" component={MyCreditCards} options={{ title: 'Meus Cartões' }} />
      <Screen name="CardForm" component={CardForm} options={{ title: 'Novo cartão' }} />
      <Screen name="Privacy" component={Privacy} options={{ title: 'Privacidade' }} />
      <Screen
        name="BlockedAccounts"
        component={BlockedAccounts}
        options={{ title: 'Contas bloqueadas' }}
      />
    </Navigator>
  );
}
