import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Button } from '@/components/Button';
import { InputMask } from '@/components/InputMask';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { putOfferTransaction } from '@/modules/Settings/services/settings.services';

import * as S from './styles';

type Props = {
  offer: any;
  handleUpdateValue: (offerId: number, newValue: number) => void;
};

export function ModalEdit({ offer, handleUpdateValue }: Props) {
  const [value, setValue] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(false);
  const { close } = useBottomSheet();
  const { show } = useToast();

  const handleSubmit = React.useCallback(
    async (transactionId: number) => {
      try {
        if (!value) {
          return;
        }

        setLoading(true);

        await putOfferTransaction(transactionId, value);
        handleUpdateValue(offer?.id, value / 100);
        close();

        show({
          type: 'success',
          message: 'Valor da transação atualizado com sucesso',
        });
      } catch (error: any) {
        const message = error?.message ?? 'Erro ao atualizar valor da transação';

        show({
          type: 'error',
          message,
        });
      } finally {
        setLoading(false);
      }
    },
    [value]
  );

  return (
    <S.ModalContainer key={offer?.offer?.id}>
      <S.ModalHeader>
        <S.ModalTitle>Editar valor da venda</S.ModalTitle>
        <S.ModalSubtitle>Atualize o valor final da sua venda</S.ModalSubtitle>
      </S.ModalHeader>

      <S.ModalContent>
        <S.ModalImage
          source={{
            uri: offer?.offer?.image ?? '',
          }}
        />
      </S.ModalContent>

      <InputMask
        key={offer?.offer?.id}
        mask="currency"
        id="input-value"
        label="Valor"
        placeholder="Digite um valor"
        value={String(offer?.offer?.value * 100)}
        onChangeText={(_, value) => {
          setValue(value ? Number(value) : 0);
        }}
        keyboardType="numeric"
      />

      <S.ModalButtonsContainer>
        <Button
          title={loading ? <ActivityIndicator size="small" /> : 'Salvar'}
          marginBottom={0}
          disabled={loading || !value}
          onPress={async () => await handleSubmit(offer?.id)}
        />
        <Button title="Cancelar" type="secondary" marginBottom={0} onPress={close} />
      </S.ModalButtonsContainer>
    </S.ModalContainer>
  );
}
