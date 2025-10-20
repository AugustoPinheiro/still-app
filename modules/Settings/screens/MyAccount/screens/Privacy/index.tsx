import React from 'react';

import { getProfile, setProfile } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { getProfileByUsername } from '@/modules/Profile/services/profile.services';
import { updatePrivacy } from '@/modules/Settings/services/settings.services';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';

export function Privacy({ navigation }: GenericPageProp) {
  const profile = getProfile();
  const { show } = useToast();
  const [notifyPush, setNotifyPush] = React.useState(profile?.notify_push);
  const [privateProfile, setPrivateProfile] = React.useState(profile?.private);
  const [privateCloset, setPrivateCloset] = React.useState(
    profile?.closet ?? profile?.private_closet
  );
  const [privateFavorites, setPrivateFavorites] = React.useState(
    profile?.favorites ?? profile?.private_favorites
  );

  async function onChangePushNotification(value: boolean) {
    try {
      if (!profile) {
        return;
      }

      await updatePrivacy({
        notify_push: value,
      });

      setNotifyPush(value);
      setProfile({
        ...profile,
        notify_push: value,
      });
    } catch (error) {
      show({
        message: 'Erro ao atualizar suas opções de privacidade, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  async function onChangePrivateAccount(value: boolean) {
    try {
      if (!profile) {
        return;
      }
      await updatePrivacy({
        private: value,
      });

      setPrivateProfile(value);
      setProfile({
        ...profile,
        private: value,
      });
    } catch (error) {
      show({
        message: 'Erro ao atualizar suas opções de privacidade, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  async function onChangePrivateCloset(value: boolean) {
    try {
      if (!profile) {
        return;
      }
      await updatePrivacy({
        closet: value,
      });

      setPrivateCloset(value);
      setProfile({
        ...profile,
        closet: value,
      });
    } catch (error) {
      show({
        message: 'Erro ao atualizar suas opções de privacidade, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  async function onChangePrivateFavorites(value: boolean) {
    try {
      if (!profile) {
        return;
      }
      await updatePrivacy({
        favorites: value,
      });

      setPrivateFavorites(value);
      setProfile({
        ...profile,
        favorites: value,
      });
    } catch (error) {
      show({
        message: 'Erro ao atualizar suas opções de privacidade, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  React.useEffect(() => {
    return () => {
      getProfileByUsername();
    };
  }, []);

  return (
    <S.ContainerDefault>
      <S.Container>
        <S.Text>Sua conta</S.Text>

        <S.PermissionsContainer>
          <S.Permission>
            <S.Header>
              <S.HeaderText>Notificações</S.HeaderText>
              <S.PermissionSwitch value={notifyPush} onValueChange={onChangePushNotification} />
            </S.Header>
            <S.PermissionDescription>
              Preferências de recebimento e exibição de notificações
            </S.PermissionDescription>
          </S.Permission>
          <S.Permission>
            <S.Header>
              <S.HeaderText>Conta privada</S.HeaderText>
              <S.PermissionSwitch value={privateProfile} onValueChange={onChangePrivateAccount} />
            </S.Header>

            <S.PermissionDescription>
              Opções de configuração para controlar a privacidade da sua conta e determinar quem
              pode ver seu perfil
            </S.PermissionDescription>
          </S.Permission>
          <S.Permission>
            <S.Header>
              <S.HeaderText>Closet privado</S.HeaderText>
              <S.PermissionSwitch value={privateCloset} onValueChange={onChangePrivateCloset} />
            </S.Header>

            <S.PermissionDescription>
              Opções de configuração para controlar a privacidade do seu closet
            </S.PermissionDescription>
          </S.Permission>

          <S.Permission>
            <S.Header>
              <S.HeaderText>Salvos privado</S.HeaderText>
              <S.PermissionSwitch
                value={privateFavorites}
                onValueChange={onChangePrivateFavorites}
              />
            </S.Header>

            <S.PermissionDescription>
              Opções de configuração para controlar a privacidade dos seus itens salvos
            </S.PermissionDescription>
          </S.Permission>
        </S.PermissionsContainer>

        <S.BlockedContainer>
          <S.Text>Bloqueio</S.Text>
          <S.BlockedButton onPress={() => navigation.navigate('BlockedAccounts')}>
            <S.Header>
              <S.HeaderText>Contas bloqueadas</S.HeaderText>
            </S.Header>
            <S.PermissionDescription>Veja as contas que você bloqueou</S.PermissionDescription>
          </S.BlockedButton>
        </S.BlockedContainer>
      </S.Container>
    </S.ContainerDefault>
  );
}
