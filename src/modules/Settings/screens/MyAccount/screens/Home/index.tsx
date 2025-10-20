import React, { useMemo } from 'react';

import FeatherIcon from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import AccountIcon from '@/assets/images/accountIcon.svg';
import LockIcon from '@/assets/images/lockIcon.svg';
import NoPreviewIcon from '@/assets/images/noPreviewIcon.svg';
import StarsIcon from '@/assets/images/starsIcon.svg';
import TrashIcon from '@/assets/images/trashIcon.svg';
import CreditCardIcon from '@/assets/images/creditCardIcon.svg';
import { getProfiles } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { DeleteAccountModal } from '@/modules/Settings/screens/MyAccount/components/DeleteAccountModal';
import { DeleteProfileModal } from '@/modules/Settings/screens/MyAccount/components/DeleteProfileModal';
import { MyAccountStackParamList } from '@/modules/Settings/screens/MyAccount/routes/myaccount.types';
import { getSnapPoint } from '@/utils/getSnapPoint';

import * as S from './styles';

type TMyAccountNavigationProps = NativeStackNavigationProp<MyAccountStackParamList, 'Home'>;

interface TOptions {
  id: string;
  title: string;
  icon: JSX.Element;
  screen?: keyof MyAccountStackParamList;
  onPress?: () => void;
}

export function MyAccount() {
  const navigation = useNavigation<TMyAccountNavigationProps>();
  const { expand, setBottomSheetProps } = useBottomSheet();
  const profiles = getProfiles();

  const options: TOptions[] = useMemo(() => {
    const data = [
      {
        id: '1',
        title: 'Meus dados',
        icon: <AccountIcon width={24} height={24} />,
        screen: 'MyData',
      },
      {
        id: '2',
        title: 'Alterar senha',
        icon: <LockIcon width={24} height={24} />,
        screen: 'ChangePassword',
      },
      {
        id: '3',
        title: 'Preferências',
        icon: <StarsIcon width={24} height={24} />,
        screen: 'Preferences',
      },
      {
        id: '4',
        title: 'Meus cartões',
        icon: <CreditCardIcon width={24} height={24} />,
        screen: 'MyCreditCards',
      },
      {
        id: '5',
        title: 'Privacidade',
        icon: <NoPreviewIcon width={24} height={24} />,
        screen: 'Privacy',
      },
      {
        id: '6',
        title: 'Excluir perfil',
        icon: (
          <FeatherIcon
            name="user-x"
            color="#8A8A99"
            size={22}
            style={{ paddingLeft: 4, marginRight: -2 }}
          />
        ),
        onPress: () => {
          setBottomSheetProps({
            id: 'DeleteProfileModal',
            content: <DeleteProfileModal />,
            snapPoints: [getSnapPoint(500)],
          });

          expand();
        },
      },
      {
        id: '7',
        title: 'Excluir conta',
        icon: <TrashIcon width={24} height={24} />,
        onPress: () => {
          setBottomSheetProps({
            id: 'DeleteAccountModal',
            content: <DeleteAccountModal />,
            snapPoints: [getSnapPoint(315)],
          });

          expand();
        },
      },
    ];

    if (profiles && profiles?.length <= 1) {
      return data.filter((option) => option.id !== '6');
    }

    return data;
  }, [profiles]);

  function handleNavigate(screen?: keyof MyAccountStackParamList) {
    if (!screen) return;

    navigation.navigate(screen);
  }

  return (
    <S.Container>
      <S.Content>
        {options.map((option) => (
          <S.ItemContainer
            key={option.id}
            onPress={() => {
              if (option?.onPress) {
                option.onPress();
                return;
              }

              handleNavigate(option?.screen);
            }}
          >
            {option.icon}
            <S.ItemTitle>{option.title}</S.ItemTitle>
          </S.ItemContainer>
        ))}
      </S.Content>
    </S.Container>
  );
}
