import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { OneSignal } from 'react-native-onesignal';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/Button';
import { InputPassword } from '@/components/InputPassword';
import { COMETCHAT_AUTH_KEY } from '@/config/cometChat';
import { EXPO_PUBLIC_IS_DEV } from '@/config/env';
import { getProfiles, getUserData } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { getProfile } from '@/modules/Login/services/login.services';
import { checkPassword, deleteProfile } from '@/modules/Settings/services/settings.services';
import { ProfileType } from '@/types/ProfileType';
import { getSnapPoint } from '@/utils/getSnapPoint';

import * as S from './styles';

const IS_DEV = EXPO_PUBLIC_IS_DEV;

function ConfirmationPassword({ close, profile }: { close: () => void; profile: ProfileType }) {
  const { show } = useToast();
  const queryClient = useQueryClient();
  const user = getUserData();
  const [password, setPassword] = useState('');
  const [hasAsk, setHasAsk] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  function handleChooseProfile(profile: ProfileType) {
    queryClient.invalidateQueries({ queryKey: ['profileData'] });
    queryClient.invalidateQueries({ queryKey: ['profileUserPosts'] });
    queryClient.invalidateQueries({ queryKey: ['profileUserArchivedPosts'] });
    queryClient.invalidateQueries({ queryKey: ['profilePostsSaved'] });
    queryClient.invalidateQueries({ queryKey: ['profileClosetClothing'] });
    queryClient.invalidateQueries({ queryKey: ['profileClosetLook'] });
    CometChat.logout();
    OneSignal.logout();

    if (IS_DEV) {
      const mockUser = getMockUser(profile?.username);
      CometChat.login(mockUser, COMETCHAT_AUTH_KEY);
    } else {
      CometChat.login(profile?.id, COMETCHAT_AUTH_KEY);
    }

    OneSignal.login(profile.uuid);
  }

  const handleDelete = async () => {
    try {
      if (!user?.id) {
        return;
      }

      setLoading(true);
      const isCheckedPassword = await checkPassword({ email: user?.user?.email, password });
      if (!isCheckedPassword) {
        setError('Senha Incorreta');
        return;
      }

      await deleteProfile(profile?.id);
      await getProfile(user.id);
      handleChooseProfile(profile);

      setHasAsk(true);
      show({
        message: 'Seu perfil foi excluído com sucesso',
        type: 'success',
      });
      close();
    } catch (error: any) {
      const message = error?.message || 'Ocorreu um erro ao excluir seu perfil';
      const status = error?.status;

      if (status === 401) {
        setError('Senha Incorreta');
        return;
      }

      show({
        message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      {hasAsk ? (
        <>
          <S.TitleConfirm>Sua solicitação de exclusão foi enviada com sucesso</S.TitleConfirm>
          {/* <S.Description>{`Entraremos em contato via e-mail`}</S.Description> */}
        </>
      ) : (
        <>
          <S.TitleConfirm>Confirme sua senha</S.TitleConfirm>

          <S.Description>Informe a sua senha, para realizar a exclusão do seu perfil</S.Description>
          <S.Option disabled>
            <S.ProfilePhoto source={{ uri: profile?.avatar }} cachePolicy="disk" />
            <S.OptionText>{[profile?.name, profile?.last_name].join(' ')}</S.OptionText>
          </S.Option>
          <InputPassword
            onChangeText={(e) => setPassword(e)}
            value={password}
            label="Senha"
            placeholder="Digite sua senha"
            error={error}
          />
          <S.ButtonContainer>
            <Button title="Cancelar" marginBottom={12} onPress={close} />
            <Button
              title="Confirmar"
              type="secondary"
              onPress={handleDelete}
              disabled={hasAsk || !password}
              loading={loading}
            />
          </S.ButtonContainer>
        </>
      )}
    </S.Container>
  );
}

export function DeleteProfileModal() {
  const { close, setBottomSheetProps, expand } = useBottomSheet();
  const profiles = getProfiles();

  function handleConfirmPassword(profile: ProfileType) {
    setBottomSheetProps({
      id: 'DeleteProfileConfirmationPassword',
      content: <ConfirmationPassword close={close} profile={profile} />,
      snapPoints: [getSnapPoint(500)],
    });

    expand();
  }

  return (
    <S.Container>
      <S.Title>Escolha o perfil que deseja excluir</S.Title>
      <S.Description>
        Você pode escolher um perfil para excluir. Essa operação não pode ser desfeita
      </S.Description>

      <S.ProfilesContainer>
        <FlatList
          data={profiles}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <S.Option onPress={() => handleConfirmPassword(item)}>
              <S.ProfilePhoto source={{ uri: item?.avatar }} cachePolicy="disk" />
              <S.OptionText>{[item?.name, item?.last_name].join(' ')}</S.OptionText>
            </S.Option>
          )}
        />
      </S.ProfilesContainer>
    </S.Container>
  );
}
