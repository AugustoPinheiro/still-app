import React, { useState } from 'react';

import { Button } from '@/components/Button';
import { InputPassword } from '@/components/InputPassword';
import { deleteAccount, getDeleteAccount } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { getSnapPoint } from '@/utils/getSnapPoint';

import * as S from './styles';

function ConfirmationPassword({ close, isDelete }: { close: () => void; isDelete?: boolean }) {
  const [password, setPassword] = useState('');
  const { show } = useToast();
  const [hasAsk, setHasAsk] = useState(!!getDeleteAccount());

  const handleDelete = () => {
    deleteAccount();
    setHasAsk(true);
    show({
      message:
        'Sua solicitação de exclusão foi enviada com sucesso, entraremos em contato via e-mail.',
      type: 'info',
    });
    close();
  };
  return (
    <S.Container>
      {hasAsk ? (
        <>
          <S.TitleConfirm>Sua solicitação de exclusão foi enviada com sucesso</S.TitleConfirm>
          <S.Description>{`Entraremos em contato via e-mail`}</S.Description>
        </>
      ) : (
        <>
          <S.TitleConfirm>Informe a sua senha para continuar</S.TitleConfirm>
          <S.Description>{`Para realizar a ${
            isDelete ? 'exclusão' : 'hibernação'
          } da sua conta informe a sua senha`}</S.Description>
          <InputPassword
            onChangeText={(e) => setPassword(e)}
            value={password}
            label="Senha"
            placeholder="Digite sua senha"
          />
          <S.ButtonContainer>
            <Button title="Cancelar" marginBottom={12} onPress={close} />
            <Button
              title="Confirmar"
              type="secondary"
              onPress={handleDelete}
              disabled={hasAsk || !password}
            />
          </S.ButtonContainer>
        </>
      )}
    </S.Container>
  );
}

function DeleteConfirmation({
  close,
  handleConfirm,
}: {
  close: () => void;
  handleConfirm: () => void;
}) {
  return (
    <S.Container>
      <S.Title>Você tem certeza que deseja excluir sua conta?</S.Title>
      <S.Description>
        Ao deletar sua conta você perderá todos os seus acessos e conteúdos postados
      </S.Description>
      <S.ButtonContainer>
        <Button title="Cancelar" marginBottom={12} onPress={close} />
        <Button title="Sim" type="secondary" onPress={handleConfirm} />
      </S.ButtonContainer>
    </S.Container>
  );
}

export function DeleteAccountModal() {
  const { close, setBottomSheetProps, expand } = useBottomSheet();

  function handleConfirmPassword(isDelete?: boolean) {
    setBottomSheetProps({
      id: 'DeleteAccountConfirmationPassword',
      content: <ConfirmationPassword close={close} isDelete={isDelete} />,
      snapPoints: [getSnapPoint(390)],
    });

    expand();
  }

  function handleConfirmDelete() {
    setBottomSheetProps({
      id: 'DeleteAccountDeleteConfirmation',
      content: (
        <DeleteConfirmation
          close={close}
          handleConfirm={() => {
            handleConfirmPassword(true);
          }}
        />
      ),
      snapPoints: [getSnapPoint(310)],
    });

    expand();
  }

  return (
    <S.Container>
      <S.Title>Você tem certeza que deseja excluir sua conta?</S.Title>
      <S.Description>
        Você pode excluir ou hibernar a sua conta por um determinado tempo
      </S.Description>
      <S.ButtonContainer>
        <Button
          title="Hibernar"
          onPress={() => {
            handleConfirmPassword();
          }}
          marginBottom={12}
        />
        <Button title="Excluir" type="secondary" onPress={handleConfirmDelete} />
      </S.ButtonContainer>
    </S.Container>
  );
}
