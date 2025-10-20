import React, { useState } from 'react';

import { Button } from '@/components/Button';
import { InputBigger } from '@/components/InputBigger';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';

import { postReport } from '../../services/social.services';
import * as S from './styles';
import { useToast } from '@/contexts/Toast.contexts';

interface IMenuReportInputProps {
  id: string;
  reason: {
    id: string;
    description: string;
    name: 'string';
  };
}

export function MenuReportInput({ id, reason }: IMenuReportInputProps) {
  const { close } = useBottomSheet();
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { show } = useToast();

  const handleSendReport = async () => {
    try {
      setIsSending(true);
      await postReport({
        reasonId: reason.id,
        reason: reason.description,
        details: text,
        isProfile: true,
        id,
      });

      show({ type: 'success', message: 'Denúncia enviada com sucesso' });
      close();
    } catch (error: any) {
      const message = error?.message || 'Ocorreu um erro ao enviar a denúncia';
      show({ type: 'error', message });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <S.Container>
      <S.Title>Denunciar perfil</S.Title>
      <S.ScrollContainer>
        <S.OptionText>Descreva em poucas palavras o que aconteceu</S.OptionText>
        <InputBigger
          label="Descrição"
          placeholder="Escreva o motivo da denúncia"
          marginBottom={24}
          onChangeText={(e) => setText(e)}
          value={text}
        />
        <Button title="Enviar" disabled={isSending} marginBottom={0} onPress={handleSendReport} />
      </S.ScrollContainer>
    </S.Container>
  );
}
