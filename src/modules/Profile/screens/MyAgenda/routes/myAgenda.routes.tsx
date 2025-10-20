import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { AgendaProvider } from '@/modules/Profile/screens/MyAgenda/contexts/agenda.context';
import { BottomSheetAgendaProvider } from '@/modules/Profile/screens/MyAgenda/contexts/bottomSheet.context';
import { CreateEvent } from '@/modules/Profile/screens/MyAgenda/screens/CreateEvent';
import { DetailsSchedule } from '@/modules/Profile/screens/MyAgenda/screens/DetailsSchedule';
import { MyAgendaHome } from '@/modules/Profile/screens/MyAgenda/screens/Home';
import { Details } from '@/modules/Profile/screens/MyAgenda/screens/MyLooks/screens/Details';
import { MyLooksHome } from '@/modules/Profile/screens/MyAgenda/screens/MyLooks/screens/Home';
import { SuccessEvent } from '@/modules/Profile/screens/MyAgenda/screens/SuccessEvent';

const { Navigator, Screen } = createNativeStackNavigator();

export function MyAgendaStack() {
  return (
    <AgendaProvider>
      <BottomSheetAgendaProvider>
        <Navigator screenOptions={{ animation: 'slide_from_right', header: HeaderRoute }}>
          <Screen name="Home" component={MyAgendaHome} options={{ title: 'Minha Agenda' }} />
          <Screen
            name="MyLooks"
            component={MyLooksHome}
            options={({ route }) => ({
              // @ts-expect-error
              title: route.params?.event?.title ?? 'Meus Looks',
            })}
          />
          <Screen
            name="MyLooksDetails"
            component={Details}
            options={({ route }) => ({
              // @ts-expect-error
              title: route.params?.title,
            })}
          />
          <Screen
            name="CreateEvent"
            component={CreateEvent}
            options={({ route }) => ({
              title: route.params?.item ? 'Editar Evento' : 'Criar Evento',
            })}
          />
          <Screen
            name="SuccessEvent"
            component={SuccessEvent}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Screen
            name="DetailsSchedule"
            component={DetailsSchedule}
            options={{ headerShown: false }}
          />
        </Navigator>
      </BottomSheetAgendaProvider>
    </AgendaProvider>
  );
}
