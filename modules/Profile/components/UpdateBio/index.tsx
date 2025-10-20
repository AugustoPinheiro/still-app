import React, { useState } from 'react';

import { Button } from '@/components/Button';
import { InputBigger } from '@/components/InputBigger';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { updateBio } from '@/modules/Settings/services/settings.services';
import { ProfileType } from '@/types/ProfileType';

import * as S from './styles';

interface IUpdateBioProps {
  user: ProfileType | undefined;
  refetchUser: () => void;
}

export function UpdateBio({ user, refetchUser }: IUpdateBioProps) {
  const { show } = useToast();
  const { close } = useBottomSheet();
  const [text, setText] = useState(user?.bio ?? '');
  const [loading, setLoading] = useState(false);

  const handleSendReport = async () => {
    try {
      if (!user) return;
      setLoading(true);
      await updateBio(user?.id, text);
      refetchUser();
      setLoading(false);
      close();
    } catch (error) {
      show({ message: 'Erro ao atualizar bio', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>Sobre você</S.Title>
      <S.ScrollContainer>
        <S.OptionText>Descreva em poucas palavras um pouco sobre você</S.OptionText>
        <InputBigger
          label="Bio"
          placeholder="Nos conte de você, serviços que possuem e horário disponíveis de atendimento"
          marginBottom={24}
          onChangeText={(e) => setText(e)}
          value={text}
        />
        <Button
          title="Enviar"
          marginBottom={0}
          onPress={handleSendReport}
          loading={loading}
          disabled={loading}
        />
      </S.ScrollContainer>
    </S.Container>
  );
}
