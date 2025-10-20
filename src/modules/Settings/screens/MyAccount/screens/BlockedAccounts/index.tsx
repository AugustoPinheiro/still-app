import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { Button } from '@/components/Button';
import { getProfile } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { unblockUserbyUsername } from '@/modules/Settings/services/settings.services';

import * as S from './styles';

export function BlockedAccounts() {
  const userData = getProfile();
  const { show } = useToast();
  const [loading, setLoading] = React.useState(false);

  const data = React.useMemo(() => {
    return userData?.blocked_profiles ?? [];
  }, [userData?.blocked_profiles]);

  async function handleUnblockUserbyUsername(username: string) {
    try {
      setLoading(true);
      await unblockUserbyUsername(username);
      show({
        type: 'success',
        message: `${username} desbloqueado com sucesso`,
      });
    } catch (error: any) {
      const message = error?.message || 'Erro ao desbloquear usuário';
      show({
        type: 'error',
        message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <S.Wrapper>
      <S.Container>
        <FlatList
          data={data}
          keyExtractor={(item) => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <S.Item>
              <S.ItemInfo>
                <S.ItemImage source={{ uri: item?.avatar }} cachePolicy="disk" />
                <S.ItemName>{item?.username}</S.ItemName>
              </S.ItemInfo>
              <S.ItemButtonContainer>
                <Button
                  weight="flat"
                  title={loading ? <ActivityIndicator size="small" /> : 'Desbloquear'}
                  marginBottom={0}
                  disabled={loading}
                  onPress={async () => {
                    await handleUnblockUserbyUsername(item?.username);
                  }}
                />
              </S.ItemButtonContainer>
            </S.Item>
          )}
        />
      </S.Container>
    </S.Wrapper>
  );
}
