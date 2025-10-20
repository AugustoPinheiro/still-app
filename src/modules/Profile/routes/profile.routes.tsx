import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { AnotherProfileProvider } from '@/modules/Profile/contexts/anotherProfile.contexts';
import { ProfileProvider } from '@/modules/Profile/contexts/profile.contexts';
import { type ProfileStackParamList } from '@/modules/Profile/routes/profile.types';
import { AnotherUser } from '@/modules/Profile/screens/AnotherUser';
import { ClothingDetails } from '@/modules/Profile/screens/ClothingDetails';
import { ClothingDetailsStore } from '@/modules/Profile/screens/ClothingDetailsStore';
import { ListClosetByCategory } from '@/modules/Profile/screens/ListClosetByCategory';
import { ListClosetByCategoryAnotherUser } from '@/modules/Profile/screens/ListClosetByCategoryAnotherUser';
import { ListSaves } from '@/modules/Profile/screens/ListSaves';
import { MyAgendaStack } from '@/modules/Profile/screens/MyAgenda/routes/myAgenda.routes';
import { PostDetails } from '@/modules/Profile/screens/PostDetails';
import { User } from '@/modules/Profile/screens/User';
import { SettingsStack } from '@/modules/Settings/routes/settings.routes';

import { Archive } from '../screens/Archive';
import { Follows } from '../screens/Follows';
import { OrdersList } from '../screens/Orders';
import { PayOrder } from '../screens/Orders/PayOrder';
import { ScheduledServicesList } from '../screens/MyServices';
import { ServiceDetail } from '../screens/MyServices/ServiceDetail';
import { ServiceStepDetail } from '../screens/MyServices/ServiceStepDetail';
import { CardForm } from '@/modules/Settings/screens/MyAccount/screens/MyCreditCards/CardForm';

const { Navigator, Screen } = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <ProfileProvider>
      <AnotherProfileProvider>
        <Navigator screenOptions={{ animation: 'slide_from_right', header: HeaderRoute }}>
          <Screen name="User" component={User} options={{ headerShown: false }} />
          <Screen name="Settings" component={SettingsStack} options={{ headerShown: false }} />
          <Screen name="MyAgenda" component={MyAgendaStack} options={{ headerShown: false }} />
          <Screen
            name="Follows"
            component={Follows}
            options={({ route }) => ({ title: route.params?.username })}
          />
          <Screen name="Archive" component={Archive} options={{ title: 'Arquivados' }} />
          <Screen
            name="AnotherUser"
            component={AnotherUser}
            options={({ route }) => ({
              title: route.params?.username,
            })}
          />
          <Screen
            name="ProfileListClosetByCategory"
            component={ListClosetByCategory}
            options={{ title: 'PEÇAS' }}
          />
          <Screen
            name="ProfileListClosetByCategoryAnotherUser"
            component={ListClosetByCategoryAnotherUser}
            options={{ title: 'PEÇAS' }}
          />
          <Screen
            name="ProfileClothingDetails"
            component={ClothingDetails}
            options={{ headerShown: false }}
          />
          <Screen
            name="ProfileClothingDetailsStore"
            component={ClothingDetailsStore}
            options={{ title: 'COMPRAR PEÇA' }}
          />
          <Screen name="ProfilePostDetails" component={PostDetails} options={{ title: 'POST' }} />
          <Screen
            name="ProfileListSaves"
            component={ListSaves}
            options={({ route }) => ({
              title: route?.params?.data?.description ?? 'Salvos',
            })}
          />
          <Screen name="Orders" component={OrdersList} options={{ title: 'Pagamentos' }} />
          <Screen
            name="PayOrder"
            component={PayOrder}
            options={{ title: 'Pagamento' }}
          />
          <Screen name="CardForm" component={CardForm} options={{ title: 'Novo cartão' }} />
          <Screen name="MyServices" component={ScheduledServicesList} options={{ title: 'Agendamentos' }} />
          <Screen name="ServiceDetail" component={ServiceDetail} options={{ title: 'Agendamentos' }} />
          <Screen name="ServiceStepDetail" component={ServiceStepDetail} options={{ title: 'Agendamentos' }} />
        </Navigator>
      </AnotherProfileProvider>
    </ProfileProvider>
  );
}
