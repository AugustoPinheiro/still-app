import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { format } from 'date-fns';

import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { DeleteConfirmation } from '@/modules/Profile/components/DeleteConfirmation';
import { useAgenda } from '@/modules/Profile/screens/MyAgenda/contexts/agenda.context';
import { deletePartToEvent, deleteSchedule } from '@/modules/Profile/services/agenda.services';
import { EventClothingType } from '@/types/EventClothingType';
import { EventLookType } from '@/types/EventLookType';
import { GenericPageProp } from '@/types/GenericPageProp';
import { ScheduleType } from '@/types/ScheduleType';
import { dateWithTimezone } from '@/utils/dateWithTimezone';
import { getSnapPoint } from '@/utils/getSnapPoint';

import * as S from './styles';

type SelectedItemType = {
  clothings: EventClothingType[];
  looks: EventLookType[];
};

type DetailsScheduleProps = GenericPageProp & {
  route: {
    params: {
      item: ScheduleType;
    };
  };
};

export function DetailsSchedule({ navigation, route: { params } }: DetailsScheduleProps) {
  const { item: itemRoute } = params;
  const { schedules, refetch, toggleActiveSchedule } = useAgenda();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(true);
  const { close, setBottomSheetProps, expand } = useBottomSheet();
  const [selectedItem, setSelectedItem] = React.useState<SelectedItemType>({
    clothings: [],
    looks: [],
  });
  const [isSelecting, setIsSelecting] = React.useState(false);
  const totalSelectedItems = React.useMemo(
    () => selectedItem.clothings.length + selectedItem.looks.length,
    [selectedItem]
  );

  const item = React.useMemo(
    () => schedules?.find((item) => item?.id === itemRoute.id) ?? itemRoute,
    [itemRoute, schedules, isEditing]
  );

  if (!item) {
    navigation?.goBack();
    return <></>;
  }

  function isItemSelected(item: EventLookType | EventClothingType, isLook: boolean) {
    if (isLook) {
      return selectedItem.looks.some((selectedItem) => selectedItem.id === item?.id);
    }

    return selectedItem.clothings.some((selectedItem) => selectedItem.id === item?.id);
  }

  function handleSelect(item: any, isLook: boolean) {
    if (isSelecting) {
      if (isItemSelected(item, isLook)) {
        if (isLook) {
          setSelectedItem((prevState) => ({
            ...prevState,
            looks: prevState.looks.filter((selectedItem) => selectedItem.id !== item?.id),
          }));
          return;
        }

        setSelectedItem((prevState) => ({
          ...prevState,
          clothings: prevState.clothings.filter((selectedItem) => selectedItem.id !== item?.id),
        }));
        return;
      } else {
        if (isLook) {
          setSelectedItem((prevState) => ({ ...prevState, looks: [...prevState.looks, item] }));
        } else {
          setSelectedItem((prevState) => ({
            ...prevState,
            clothings: [...prevState.clothings, item],
          }));
        }
      }
      return;
    }

    setIsSelecting(true);

    if (isLook) {
      setSelectedItem((prevState) => ({ ...prevState, looks: [...prevState.looks, item] }));
    } else {
      setSelectedItem((prevState) => ({
        ...prevState,
        clothings: [...prevState.clothings, item],
      }));
    }
  }

  async function handleActive() {
    setIsEditing(true);
    await toggleActiveSchedule(item?.id);
    setIsEditing(false);
  }

  async function removeItem() {
    Alert.alert(`Remover peças`, `Tem certeza que deseja remover as peças  deste evento?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            setLoading(true);
            const looksIds = selectedItem.looks.map((item) => item?.look_id);
            const clothingsIds = selectedItem.clothings.map((item) => item?.clothing_id);

            setSelectedItem({ clothings: [], looks: [] });
            await deletePartToEvent(item?.id, looksIds, clothingsIds);
            await refetch();
            setSelectedItem({ clothings: [], looks: [] });
            show({
              message: 'Peças removidas com sucesso',
              type: 'success',
            });
          } catch (error) {
            show({
              message: 'Erro ao tentar remover peças, tente novamente mais tarde',
              type: 'error',
            });
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  }

  function handleDeleteEvent() {
    setBottomSheetProps({
      id: 'DeleteAccountDeleteConfirmation',
      content: (
        <DeleteConfirmation
          close={close}
          handleConfirm={async () => {
            try {
              setLoading(true);
              close();
              await deleteSchedule(item?.id);
              await refetch();
              show({
                message: 'Evento removido com sucesso',
                type: 'success',
              });
              navigation.goBack();
            } catch (error) {
              show({
                message: 'Erro ao tentar remover evento, tente novamente mais tarde',
                type: 'error',
              });
            } finally {
              setLoading(false);
            }
          }}
        />
      ),
      snapPoints: [getSnapPoint(310)],
    });
    expand();
  }

  function handleAddParts() {
    navigation.navigate('MyLooks', { eventId: item?.id });
  }

  React.useEffect(() => {
    if (totalSelectedItems) return;
    setIsSelecting(false);
  }, [totalSelectedItems]);

  return (
    <S.Wrapper>
      <S.Container>
        {loading && <Loading />}
        <S.ContainerHeader>
          <S.BackButtonContainer>
            <BackButton onPress={() => navigation.goBack()} />
          </S.BackButtonContainer>
          <S.Title>DETALHES</S.Title>
          <S.EditButtonContainer onPress={() => navigation.navigate('CreateEvent', { item })}>
            <S.Icon name="pencil" size={24} />
          </S.EditButtonContainer>
        </S.ContainerHeader>
        <S.Content>
          <S.Row>
            <S.Label>{item?.title}</S.Label>
            <TouchableOpacity onPress={() => setActiveAccordion(!activeAccordion)}>
              <S.Icon name={activeAccordion ? 'chevron-up' : 'chevron-down'} />
            </TouchableOpacity>
          </S.Row>
          {activeAccordion && (
            <S.MoreDetails>
              <S.Label>Local</S.Label>
              <S.Value>{item?.location}</S.Value>
              {/* <S.Label>Começo</S.Label>
              <S.Value>
                {format(dateWithTimezone(new Date(item.start_date)), 'dd/MM/yyyy - HH:mm')}
              </S.Value> */}
              {/* <S.Label>Fim</S.Label>
              <S.Value>
                {format(dateWithTimezone(new Date(item?.end_date)), 'dd/MM/yyyy - HH:mm')}
              </S.Value> */}
              {/* {item?.tags.length && (
                <>
                  <S.Label>Tags</S.Label>
                  <S.TagsContainer>
                    {item?.tags.map((item) => (
                      <S.TagItem key={item}>
                        <S.ValueTag>{item}</S.ValueTag>
                      </S.TagItem>
                    ))}
                  </S.TagsContainer>
                </>
              )} */}
            </S.MoreDetails>
          )}
          <S.RowDetails>
            <TouchableOpacity onPress={handleActive} disabled={isEditing}>
              <S.Circle active={item?.active} />
            </TouchableOpacity>
            <S.Label>{format(new Date(item?.start_date), "dd 'de' MMMM 'de' yyyy")}</S.Label>
          </S.RowDetails>

          {totalSelectedItems ? (
            <S.CountContainer>
              <S.CountText>
                {totalSelectedItems === 1
                  ? '1 peça selecionada'
                  : `${totalSelectedItems} peças selecionadas`}
              </S.CountText>
              <S.CountButtonContainer>
                <Button
                  title="Cancelar"
                  type="primary"
                  onPress={() => setSelectedItem({ clothings: [], looks: [] })}
                  marginBottom={0}
                  weight="flat"
                />
              </S.CountButtonContainer>
            </S.CountContainer>
          ) : (
            <></>
          )}

          <S.CardsContainer>
            <S.CardContainer>
              <S.AddLookButton onPress={handleAddParts}>
                <S.Icon name="plus" size={24} style={{ marginBottom: 8 }} />
                <S.Label>Peças/Looks</S.Label>
              </S.AddLookButton>
            </S.CardContainer>

            {item?.looks?.length ? (
              item?.looks.map((elem) => (
                <S.CardContainer key={elem.id}>
                  <S.Card
                    onPress={() => handleSelect(elem, true)}
                    onLongPress={() => handleSelect(elem, true)}
                  >
                    <S.CardImageContainer>
                      <S.CardImage
                        source={{ uri: elem?.look?.image }}
                        cachePolicy="disk"
                        contentFit="cover"
                      />
                      {isSelecting && isItemSelected(elem, true) && (
                        <S.ImageOverlayCheck>
                          <MaterialCommunityIcons name="check" size={48} color="#FFF" />
                        </S.ImageOverlayCheck>
                      )}
                    </S.CardImageContainer>
                  </S.Card>
                </S.CardContainer>
              ))
            ) : (
              <></>
            )}
            {item?.clothings?.length ? (
              item?.clothings.map((elem) => (
                <S.CardContainer key={elem.id}>
                  <S.Card
                    onPress={() => handleSelect(elem, false)}
                    onLongPress={() => handleSelect(elem, false)}
                  >
                    <S.CardImageContainer>
                      <S.CardImage
                        source={{ uri: elem?.clothing?.image }}
                        cachePolicy="disk"
                        contentFit="cover"
                      />
                      {isSelecting && isItemSelected(elem, false) && (
                        <S.ImageOverlayCheck>
                          <MaterialCommunityIcons name="check" size={48} color="#FFF" />
                        </S.ImageOverlayCheck>
                      )}
                    </S.CardImageContainer>
                  </S.Card>
                </S.CardContainer>
              ))
            ) : (
              <></>
            )}
          </S.CardsContainer>

          <S.ButtonSave title="Excluir evento" type="secondary" onPress={handleDeleteEvent} />
        </S.Content>
      </S.Container>
      {isSelecting && (
        <BottomSheet snapPoints={[78]} handleComponent={() => null} index={0}>
          <S.BottomSheetContainer
            disabled={!isSelecting}
            isSelecting={isSelecting}
            onPress={() => {
              removeItem();
            }}
          >
            <S.BottomSheetButton>
              <MaterialCommunityIcons name="trash-can-outline" color="#fff" size={24} />
              <S.BottomSheetText>Excluir</S.BottomSheetText>
            </S.BottomSheetButton>
          </S.BottomSheetContainer>
        </BottomSheet>
      )}
    </S.Wrapper>
  );
}
