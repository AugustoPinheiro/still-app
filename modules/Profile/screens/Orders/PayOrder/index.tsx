import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';

import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { z } from 'zod';

import PlusIcon from '@/assets/images/plusIcon.svg';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { getProfile } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';
import { ProfileStackParamList } from '@/modules/Profile/routes/profile.types';
import { postProfilePayOrder } from '@/modules/Profile/services/order.services';
import { FormCard } from '@/modules/Settings/screens/MyAccount/components/FormCardModal';
import { CreditCard } from '@/types/CreditCardType';
import { PayOrderType } from '@/types/OrderType';
import { getSnapPoint } from '@/utils/getSnapPoint';

import * as S from './styles';

const schema = z.object({
  card_id: z.string({ description: 'Selecione um cartão' }).min(1),
  installments: z.number({ description: 'Selecione as parcelas' }).min(1),
});

type FormType = z.infer<typeof schema>;

export function PayOrder() {
  const { close, setBottomSheetProps, expand } = useBottomSheet();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ProfileStackParamList, 'PayOrder'>>();
  const theme = useTheme();
  const { show } = useToast();
  const order = route.params;
  const user = getProfile();

  const [selectedCard, setSelectedCard] = React.useState<{ key: any; value: any }>();
  const [dataCard, setDataCard] = React.useState(Array<any>);

  const [selectedInstallment, setSelectedInstallment] = React.useState<{ key: any; value: any }>();
  const [dataInstallment, setDataInstallment] = React.useState(Array<any>);

  const { cards, refetchCards, isLoadingCards } = useProfile();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPaymentResponse, setShowPaymentResponse] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    refetchCards();

    let installmentsArr = [];
    for (let i = 1; i <= order.max_installments; i++) {
      installmentsArr.push({
        key: i,
        value: `${i}x R$ ${(order.amount / 100 / i).toFixed(2)}`.replace('.', ','),
      });
    }
    setDataInstallment(installmentsArr ?? []);
    setSelectedInstallment(installmentsArr[0]);
  }, []);

  useEffect(() => {
    let cardsArr: Array<{key: number, value: string}> = [];
    if (cards && cards.length) {
      cardsArr = cards?.map((card) => {
        return {
          key: card.id,
          value: `${card.brand} com final ${card.last_four_digits}`,
        };
      });
    } else {
      cardsArr = [];
    }
    setDataCard(cardsArr);
    if (cards && cards.length) {
      setSelectedCard({
        key: cards[0].id,
        value: `${cards[0].brand} com final ${cards[0].last_four_digits}`,
      });
    }
  }, [cards]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      card_id: cards && cards.length ? cards[0].id.toString() : '',
      installments: 1,
    },
  });

  function handleFormCard() {
    setBottomSheetProps({
      id: 'FormCreateCard',
      content: <FormCard close={close} refetch={refetchCards} />,
      snapPoints: [getSnapPoint(700)],
    });

    expand();
  }

  function handleNavigateCardForm() {
    navigation.navigate('CardForm');
  }

  useEffect(()=>{
    if (isFocused) {
      setShowPaymentResponse(false);
      setPaymentError('');

      refetchCards();

      let installmentsArr = [];
      for (let i = 1; i <= order.max_installments; i++) {
        installmentsArr.push({
          key: i,
          value: `${i}x R$ ${(order.amount / 100 / i).toFixed(2)}`.replace('.', ','),
        });
      }
      setDataInstallment(installmentsArr ?? []);
      setSelectedInstallment(installmentsArr[0]);
    }
   },[isFocused])

  const onSubmit = async (data: FormType) => {
    if (!user?.id) {
      throw new Error('Profile not found');
    }

    try {
      setIsLoading(true);
      const payload: PayOrderType = {
        card_id: Number(data.card_id),
        installments: data.installments,
        profile_id: user?.id,
      };

      await postProfilePayOrder(order.id, payload)
      .then((data) => {
        setPaymentError('');
        setShowPaymentResponse(true);
      })
      .catch((error) => {
        const message = error?.message ?? 'Ocorreu ao erro ao efetuar pagamento. Tente novamente.';
        setPaymentError(message);
        setShowPaymentResponse(true);
      });

    } catch (error: any) {
      const message = error?.message ?? 'Ocorreu ao erro ao efetuar pagamento. Tente novamente.';
      console.error(error);

      setPaymentError(message);
      setShowPaymentResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  function handleGoBack() {
    navigation.goBack();
  }

  function showResponse(type: 'success' | 'error') {
    return <>
      {type == 'success' ? (
        <S.Wrapper>
          <S.Container>
            <S.Center>
              <S.Icon name="check-circle-outline" />
              <S.TextMD textAlign='center'>Pagamento efetuado com sucesso</S.TextMD>
              <S.ButtonContent>
                <Button title="Voltar" type="primary" onPress={handleGoBack} />
              </S.ButtonContent>
            </S.Center>
          </S.Container>
        </S.Wrapper>
      ) : (
        <S.Wrapper>
          <S.Container>
            <S.Center>
              <S.Icon name="cancel" />
              <S.TextMD textAlign='center'>{paymentError}</S.TextMD>
              <S.ButtonContent>
                <Button title="Voltar" type="primary" onPress={() => { setShowPaymentResponse(false); setPaymentError(''); }} />
              </S.ButtonContent>
            </S.Center>
          </S.Container>
        </S.Wrapper>
      )}
    </>;
  }

  return (
    <>
      {isLoading || isLoadingCards ? (
        <Loading hasBackground={true} />
      ) : (
        showPaymentResponse ? (
          showResponse(paymentError.length ? 'error' : 'success')
        ) : (
          <S.Wrapper>
          <S.Container>
            <S.Title>Resumo</S.Title>
            <S.Row>
              <S.Text>Serviço</S.Text>
              <S.TextGray numberOfLines={1} textAlign={'right'}>
                {order.service_schedule[0].service.title}
              </S.TextGray>
            </S.Row>
            <S.Row>
              <S.Text>Valor</S.Text>
              <S.Title textAlign={'right'}>
                {order?.amount
                  ? Number(order.amount / 100).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 'R$ 0,00'}
              </S.Title>
            </S.Row>
            <S.Row>
              <S.Title>Pagamento</S.Title>
              <S.Text textAlign={'right'} onPress={handleNavigateCardForm}>
                Adicionar cartão{'  '}
                <PlusIcon />
              </S.Text>
            </S.Row>
            <Controller
              control={control}
              name="card_id"
              render={({ field: { onChange, value } }) => (
                <S.SelectContainer>
                  <S.Label>Cartões</S.Label>
                  <SelectList
                    boxStyles={{
                      borderRadius: 4,
                      borderColor: theme?.colors.gray06,
                      paddingLeft: 12,
                    }}
                    dropdownStyles={{
                      borderColor: theme?.colors.gray06,
                    }}
                    search={false}
                    dropdownTextStyles={{ color: theme?.colors.gray02 }}
                    data={dataCard as any}
                    placeholder="Selecione um cartão"
                    setSelected={(selected: any) => onChange(selected)}
                    defaultOption={selectedCard}
                  />
                </S.SelectContainer>
              )}
            />

            <Controller
              control={control}
              name="installments"
              render={({ field: { onChange, value } }) => (
                <S.SelectContainer>
                  <S.Label>Parcelas</S.Label>
                  <SelectList
                    boxStyles={{
                      borderRadius: 4,
                      borderColor: theme?.colors.gray06,
                      paddingLeft: 12,
                    }}
                    dropdownStyles={{
                      borderColor: theme?.colors.gray06,
                    }}
                    search={false}
                    dropdownTextStyles={{ color: theme?.colors.gray02 }}
                    data={dataInstallment as any}
                    placeholder="Selecione o número de parcelas"
                    setSelected={(selected: any) => onChange(selected)}
                    defaultOption={selectedInstallment}
                  />
                </S.SelectContainer>
              )}
            />
            <S.ButtonContent>
              <Button title="Pagar agora" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
              <Button title="Cancelar" type="secondary" onPress={handleGoBack} />
            </S.ButtonContent>
          </S.Container>
        </S.Wrapper>
        )
      )}
    </>
  );
}
