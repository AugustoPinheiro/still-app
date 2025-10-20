import React, { createContext, useContext, useMemo, useState } from 'react';
import { OneSignal } from 'react-native-onesignal';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { ImagePickerAsset } from 'expo-image-picker';

import { COMETCHAT_AUTH_KEY } from '@/config/cometChat';
import { EXPO_PUBLIC_IS_DEV } from '@/config/env';
import { useToast } from '@/contexts/Toast.contexts';
import { useDiscovery } from '@/modules/Discovery/contexts/discovery.contexts';
import { registerUser as registerUserApi } from '@/modules/Discovery/screens/Register/services/register.services';
import { getNewProfile, login } from '@/modules/Login/services/login.services';
import { uploadPhoto } from '@/services/uploadFile';
import { ProfileType } from '@/types/ProfileType';
import { RegisterType } from '@/types/RegisterType';

interface RegisterContextData {
  formData: RegisterType;
  setFormData: React.Dispatch<React.SetStateAction<RegisterType>>;
  uploadAvatar: (photoUri: string) => Promise<void>;
  registerUser: (register?: RegisterType, isCreateProfile?: boolean) => Promise<void>;
}

interface RegisterProviderProps {
  children: React.ReactNode;
}

const IS_DEV = EXPO_PUBLIC_IS_DEV;
const RegisterContext = createContext({} as RegisterContextData);

const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const [formData, setFormData] = useState<RegisterType>({} as RegisterType);
  const { profile } = useDiscovery();
  const { show } = useToast();

  async function uploadAvatar(photoUri: ImagePickerAsset) {
    const url = await uploadPhoto(photoUri);

    if (!url) return;

    setFormData((prevState) => ({ ...prevState, avatar: url }));
  }

  function getMockUser(username: string) {
    switch (username) {
      case 'teste5':
        return 21;
      case 'teste6':
        return 25;
      case 'mylycystore':
        return 13;
      case 'mylycy':
        return 4;
      default:
        return 6;
    }
  }

  async function registerUser(register?: RegisterType, isCreateProfile?: boolean) {
    try {
      const registerData = register ?? formData;
      if (!Object.keys(registerData).length) return;

      const data = await registerUserApi(registerData, profile, isCreateProfile);

      let user: ProfileType | undefined;

      if (isCreateProfile) {
        user = await getNewProfile(registerData?.username);
      } else {
        user = await login({ email: data.email, password: registerData.password });
      }

      if (!user) throw new Error('Erro ao cadastrar usuário!');

      try {
        if (IS_DEV) {
          const mockUser = getMockUser(user?.username);
          await CometChat.login(mockUser, COMETCHAT_AUTH_KEY);
        } else {
          await CometChat.login(user?.id, COMETCHAT_AUTH_KEY);
        }

        user?.uuid && OneSignal.login(user?.uuid);
      } catch (error) {
        console.error(error);
      }
    } catch (error: any) {
      show({ type: 'error', message: error?.message ?? 'Erro ao cadastrar usuário!' });
    }
  }

  const registerContextValue = useMemo(
    () => ({ formData, setFormData, uploadAvatar, registerUser }),
    [formData, formData?.avatar]
  );

  return (
    <RegisterContext.Provider value={registerContextValue}>{children}</RegisterContext.Provider>
  );
};

function useRegister() {
  const context = useContext(RegisterContext);

  if (!context) {
    throw new Error('useRegister must be used within a RegisterProvider');
  }

  return context;
}

export { RegisterProvider, useRegister };
