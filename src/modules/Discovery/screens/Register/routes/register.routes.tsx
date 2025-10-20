import React from 'react';

import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { RegisterProvider } from '@/modules/Discovery/screens/Register/contexts/register.contexts';
import { RegisterCompany } from '@/modules/Discovery/screens/Register/screens/RegisterCompany';
import { PasswordCompany } from '@/modules/Discovery/screens/Register/screens/RegisterCompany/password';
import { RegisterCompanyPhoto } from '@/modules/Discovery/screens/Register/screens/RegisterCompany/photo';
import { SuccessRegisterCompany } from '@/modules/Discovery/screens/Register/screens/RegisterCompany/success';
import { RegisterCompanyUsername } from '@/modules/Discovery/screens/Register/screens/RegisterCompany/username';
import { RegisterProfessional } from '@/modules/Discovery/screens/Register/screens/RegisterProfessional';
import { PasswordProfessional } from '@/modules/Discovery/screens/Register/screens/RegisterProfessional/password';
import { SuccessRegisterProfessional } from '@/modules/Discovery/screens/Register/screens/RegisterProfessional/success';
import { RegisterProfessionalUsername } from '@/modules/Discovery/screens/Register/screens/RegisterProfessional/username';
import { RegisterUser } from '@/modules/Discovery/screens/Register/screens/RegisterUser';
import { PasswordUser } from '@/modules/Discovery/screens/Register/screens/RegisterUser/password';
import { RegisterUserPhoto } from '@/modules/Discovery/screens/Register/screens/RegisterUser/photo';
import { SuccessRegisterUser } from '@/modules/Discovery/screens/Register/screens/RegisterUser/success';
import { RegisterUserUsername } from '@/modules/Discovery/screens/Register/screens/RegisterUser/username';

import { RegisterStackParamList } from './register.types';

const { Navigator, Screen, Group } = createNativeStackNavigator<RegisterStackParamList>();

export function RegisterStack() {
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;

  return (
    <RegisterProvider>
      <Navigator
        screenOptions={{
          animation: 'slide_from_right',
          header: HeaderRoute,
        }}
      >
        <Group key="User">
          <Screen
            name="RegisterUserUsername"
            component={RegisterUserUsername}
            options={{ title: ' ' }}
            initialParams={{ isCreateProfile }}
          />

          <Screen name="RegisterUser" component={RegisterUser} options={{ title: ' ' }} />

          <Screen name="RegisterUserPassword" component={PasswordUser} options={{ title: ' ' }} />

          <Screen name="RegisterUserPhoto" component={RegisterUserPhoto} options={{ title: ' ' }} />

          <Screen
            name="SuccessRegisterUser"
            component={SuccessRegisterUser}
            options={{ title: ' ' }}
          />
        </Group>

        <Group key="Professional">
          <Screen
            name="RegisterProfessionalUsername"
            component={RegisterProfessionalUsername}
            options={{ title: ' ' }}
            initialParams={{ isCreateProfile }}
          />
          <Screen
            name="RegisterProfessional"
            component={RegisterProfessional}
            options={{ title: ' ' }}
          />
          <Screen
            name="RegisterProfessionalPassword"
            component={PasswordProfessional}
            options={{ title: ' ' }}
          />
          <Screen
            name="SuccessRegisterProfessional"
            component={SuccessRegisterProfessional}
            options={{ title: ' ' }}
          />
        </Group>

        <Group key="Company">
          <Screen
            name="RegisterCompanyUsername"
            component={RegisterCompanyUsername}
            options={{ title: ' ' }}
            initialParams={{ isCreateProfile }}
          />

          <Screen name="RegisterCompany" component={RegisterCompany} options={{ title: ' ' }} />
          <Screen
            name="RegisterCompanyPassword"
            component={PasswordCompany}
            options={{ title: ' ' }}
          />
          <Screen
            name="RegisterCompanyPhoto"
            component={RegisterCompanyPhoto}
            options={{ title: ' ' }}
          />
          <Screen
            name="SuccessRegisterCompany"
            component={SuccessRegisterCompany}
            options={{ title: ' ' }}
          />
        </Group>
      </Navigator>
    </RegisterProvider>
  );
}
