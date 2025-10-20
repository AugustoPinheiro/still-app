import React from 'react';
import { Text } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import PlusIcon from '@/assets/images/plusIcon.svg';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { CardFolder } from '@/modules/Closet/components/CardFolder';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import { ClosetFolderType } from '@/types/ClosetFolderType';

import * as S from './styles';

type AddPartProps = {
  onClose: () => void;
  addNewFolder?: () => void;
};

export function AddPart({ onClose, addNewFolder }: AddPartProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { allFolders, addToFolder } = useCloset();
  const { show } = useToast();

  async function handleAddToFolder(folder: ClosetFolderType) {
    try {
      setIsLoading(true);
      if (!folder?.id) {
        show({
          type: 'error',
          message: 'Ops! Não foi possível adicionar a peça na pasta.',
        });

        return;
      }

      await addToFolder(folder.id);

      show({
        message: `Adicionado com sucesso a pasta ${folder.title}!`,
        type: 'success',
      });
    } catch (error: any) {
      const message = error?.message;
      if (message.includes('already')) {
        show({
          message: `Esta peça já foi adicionada na pasta ${folder.title}!`,
          type: 'warning',
        });

        return;
      }

      show({
        message: `Erro ao adicionar na pasta ${folder.title}!`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

  return (
    <S.Container>
      {isLoading && <Loading />}
      <S.Header>
        <S.CloseButton onPress={onClose}>
          <MaterialCommunityIcons name="close" color="#8A8A99" size={24} />
        </S.CloseButton>
        <S.Title>ADICIONAR À</S.Title>
      </S.Header>

      <S.Content>
        <Button
          onPress={addNewFolder}
          title={
            (
              <Text>
                <PlusIcon />
                {'  '}Criar nova pasta
              </Text>
            ) as string & React.ReactNode
          }
          type="secondary"
        />

        <S.TitleText>Suas pastas</S.TitleText>

        <BottomSheetFlatList
          data={allFolders}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={{ gap: 20, paddingBottom: 24 }}
          contentContainerStyle={{ paddingBottom: 200 }}
          renderItem={({ item }) => (
            <CardFolder
              item={item}
              onCardPress={() => {
                handleAddToFolder(item);
              }}
              flexBasis="45%"
              hasOptions={false}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </S.Content>
    </S.Container>
  );
}
