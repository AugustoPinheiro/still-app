import React from 'react';
import { Alert } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { CardsImage } from '@/components/CardsImage';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { useAgenda } from '@/modules/Profile/screens/MyAgenda/contexts/agenda.context';
import {
  removeScheduleClothing,
  removeScheduleLook,
} from '@/modules/Profile/services/agenda.services';

import * as S from './styles';

export function Details() {
  const { params } = useRoute();
  const { show } = useToast();
  const { refetch } = useAgenda();
  const [data, setData] = React.useState<any>(() => params?.data);
  const [isLoading, setIsLoading] = React.useState(false);

  const scheduleId = params?.scheduleId ?? undefined;
  const textItem = (isLook?: boolean) => (isLook ? 'o look' : 'a peça');

  if (!data) {
    return <></>;
  }

  const parsedData = data.map((item: any) => ({
    ...item,
    image: item?.look?.image ?? item?.clothing?.image,
  }));

  async function removeItem(itemId: number, isLook?: boolean) {
    if (!itemId || !scheduleId) {
      return;
    }

    Alert.alert(
      `Remover ${textItem(isLook)}`,
      `Tem certeza que deseja remover ${textItem(isLook)}?`,
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              setIsLoading(true);
              if (isLook) {
                await removeScheduleLook(scheduleId, itemId);
              } else {
                await removeScheduleClothing(scheduleId, itemId);
              }

              await refetch();

              setData((oldData: any[]) => {
                const newData = oldData.filter((item: { id: number }) =>
                  isLook ? item?.look_id !== itemId : item?.clothing_id !== itemId
                );
                return newData;
              });

              setIsLoading(false);

              show({
                message: 'Removido com sucesso',
                type: 'success',
              });
            } catch (error) {
              show({
                message: 'Erro ao tentar remover, tente novamente mais tarde',
                type: 'error',
              });
            }
          },
        },
      ]
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      <S.Container>
        <CardsImage data={parsedData} removeItem={removeItem} />
      </S.Container>
    </>
  );
}
