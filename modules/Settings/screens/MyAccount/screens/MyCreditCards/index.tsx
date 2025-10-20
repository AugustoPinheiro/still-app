import React, { useEffect } from 'react';

import { Button } from '@/components/Button';

import * as S from './styles';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';
import { Loading } from '@/components/Loading';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { FormCard } from '../../components/FormCardModal';
import { getSnapPoint } from '@/utils/getSnapPoint';
import { CreditCard } from '@/types/CreditCardType';
import { Alert, FlatList } from 'react-native';
import CreditCardIcon from '@/assets/images/creditCardIcon.svg';
import { deleteProfileCard } from '@/modules/Profile/services/profile.services';
import { useToast } from '@/contexts/Toast.contexts';
import { useNavigation } from '@react-navigation/native';

export function MyCreditCards() {
  const { close, setBottomSheetProps, expand } = useBottomSheet();
  const { show } = useToast();
  const {
    cards,
    refetchCards,
    isLoadingCards,
  } = useProfile();
  const navigation = useNavigation<any>();

  useEffect(() => {
    refetchCards();
  }, [cards]);

  function handleFormCard() {
    setBottomSheetProps({
      id: 'FormCreateCard',
      content: <FormCard close={close} refetch={refetchCards} />,
      snapPoints: [getSnapPoint(700)],
    });

    expand();
  }

  const handleDeleteCard = React.useCallback(async (card_id: number) => {
    try {
      Alert.alert('Excluir cartão', 'Deseja realmente excluir este cartão?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProfileCard(card_id);
              await refetchCards();
            } catch (error) {
              show({
                type: 'error',
                message: 'Não foi possível deletar o comentário',
              });
            }
          },
        },
      ]);
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível deletar o comentário',
      });
    }
  }, []);

  function handleNavigateCardForm() {
    navigation.navigate('CardForm');
  }

  return (
    <>
    {isLoadingCards ? (
        <Loading hasBackground={true} />
      ) : (
        (<S.ContainerDefault>
          <S.Container>
          {cards?.length ? 
            (<FlatList
              data={cards}
              extraData={cards}
              keyExtractor={(item: CreditCard) => `${item.id}`}
              contentContainerStyle={{ gap: 16 }}
              renderItem={({ item, index }) => (
                <S.Card key={item.id}>
                  <S.CardHeader>
                    <S.CardTextsContainer>
                      <S.CardTitle>Final {item.last_four_digits} - {item.brand}</S.CardTitle>
                      <S.CardExpirationDate>Expira em {item.exp_month}/{item.exp_year}</S.CardExpirationDate>
                    </S.CardTextsContainer>
                    <CreditCardIcon width={50} height={50} />
                  </S.CardHeader>
                  <S.CardButtons>
                    <S.CardButton title="Excluir" onPress={async () => await handleDeleteCard(item.id)} />
                  </S.CardButtons>
                </S.Card>
              )}
              showsVerticalScrollIndicator={true}
            />)
            : (
              <S.ContainerEmpty>
                <S.EmptyTitle>Nenhum cartão cadastrado.</S.EmptyTitle>
              </S.ContainerEmpty>
            )}
            <S.ButtonContainer>
              <Button title="Adicionar novo cartão" onPress={handleNavigateCardForm} />
              {/* <Button title="Adicionar apple pay" type="secondary" /> */}
            </S.ButtonContainer>
          </S.Container>
        </S.ContainerDefault>)
      )}
    </>
  );
}
