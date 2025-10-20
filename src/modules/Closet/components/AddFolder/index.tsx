import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';

import * as S from './styles';

type AddFolderProps = {
  onClose: () => void;
};

export function AddFolder({ onClose }: AddFolderProps) {
  const [foldeName, setFolderName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  const { show } = useToast();
  const { selectedClothingsItems, selectedLooksItems, selectedInspirationsItems, addNewFolder } =
    useCloset();

  const firstItem =
    selectedClothingsItems[0] ?? selectedLooksItems[0] ?? selectedInspirationsItems[0];

  function goToCloset() {
    const routes = {
      index: 0,
      routes: [{ name: 'Closet' }],
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  if (!firstItem) {
    onClose();
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);
      if (!foldeName) return;

      await addNewFolder(foldeName);

      show({
        message: 'Pasta criada com sucesso!',
        type: 'success',
      });

      goToCloset();
    } catch (error) {
      show({
        message: 'Erro ao criar pasta!',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <S.Container>
      {isLoading && <Loading />}
      <S.Header>
        <S.CloseButton onPress={onClose}>
          <MaterialCommunityIcons name="close" color="#8A8A99" size={24} />
        </S.CloseButton>
        <S.Title>NOVA PASTA</S.Title>
      </S.Header>

      <KeyboardAvoidingContainer>
        <S.Content>
          <S.ImageContainer
            source={{ uri: firstItem?.image }}
            contentFit="contain"
            cachePolicy="disk"
          />

          <Input
            label="Nome da pasta"
            placeholder="Digite o nome da pasta"
            value={foldeName}
            onChangeText={setFolderName}
            autoFocus
          />

          <S.ButtonContainer>
            <Button title="Criar pasta" onPress={handleSubmit} disabled={!foldeName} />
          </S.ButtonContainer>
        </S.Content>
      </KeyboardAvoidingContainer>
    </S.Container>
  );
}
