import React, { useState } from 'react';

import { Button } from '@/components/Button';
import { InputBigger } from '@/components/InputBigger';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { postReport } from '@/modules/Social/services/social.services';

import * as S from './styles';

interface IMenuReportInputProps {
  id: string;
  reason: {
    id: string;
    description: string;
    name: 'string';
  };
  isProfile?: boolean;
}

export function MenuReportInput({ id, reason, isProfile }: IMenuReportInputProps) {
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
        isProfile: isProfile ?? false,
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
      <S.Title>Denunciar postagem</S.Title>
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
