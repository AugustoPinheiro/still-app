import React, { useEffect } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { Tab } from '@/components/Tab';
import { useToast } from '@/contexts/Toast.contexts';
import { useAgenda } from '@/modules/Profile/screens/MyAgenda/contexts/agenda.context';
import { Clothings } from '@/modules/Profile/screens/MyAgenda/screens/MyLooks/screens/Clothings';
import { Looks } from '@/modules/Profile/screens/MyAgenda/screens/MyLooks/screens/Looks';
import { savePartToEvent } from '@/modules/Profile/services/agenda.services';
import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetLookType } from '@/types/ClosetLookType';

import * as S from './styles';

type SelectedItemType = {
  clothings: ClosetClothingType[];
  looks: ClosetLookType[];
};

type Params = {
  origin: {
    eventId?: number;
    isDetails?: boolean;
  };
};

export function MyLooksHome() {
  const navigation = useNavigation();
  const { currentDate, CURRENT_MONTH, CURRENT_YEAR } = useAgenda();
  const queryClient = useQueryClient();
  const { show } = useToast();
  const { params } = useRoute<RouteProp<Params, 'origin'>>();
  const eventId = params?.eventId;

  const [loading, setLoading] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<SelectedItemType>({
    clothings: [],
    looks: [],
  });
  const [isSelecting, setIsSelecting] = React.useState(false);

  const totalSelectedItems = React.useMemo(
    () => selectedItem.clothings.length + selectedItem.looks.length,
    [selectedItem]
  );

  async function handleAddToEvent() {
    if (loading || !totalSelectedItems) return;
    try {
      setLoading(true);
      const looksIds = selectedItem.looks.map((item) => item.id);
      const clothingsIds = selectedItem.clothings.map((item) => item.id);

      if (!looksIds.length && !clothingsIds?.length) return;

      await savePartToEvent(currentDate, looksIds, clothingsIds, eventId);

      show({
        message: 'Peças adicionadas com sucesso',
        type: 'success',
      });
    } catch (error) {
      show({
        message: 'Erro ao adicionar uma ou mais peças, tente novamente mais tarde',
        type: 'error',
      });
    } finally {
      await queryClient.invalidateQueries({ queryKey: ['schedules', CURRENT_MONTH, CURRENT_YEAR] });
      navigation.goBack();
      setLoading(false);
    }
  }

  const tabs = [
    {
      title: 'Peças',
      component: (
        <Clothings
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          setIsSelecting={setIsSelecting}
          isSelecting={isSelecting}
          totalSelectedItems={totalSelectedItems}
        />
      ),
      ref: React.createRef(),
    },
    {
      title: 'Combinações',
      component: (
        <Looks
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          setIsSelecting={setIsSelecting}
          isSelecting={isSelecting}
          totalSelectedItems={totalSelectedItems}
        />
      ),
      ref: React.createRef(),
    },
  ];

  useEffect(() => {
    if (totalSelectedItems) return;
    setIsSelecting(false);
  }, [totalSelectedItems]);

  return (
    <>
      {loading && <Loading />}
      <S.Container>
        <Tab tabs={tabs} offset={20} />
      </S.Container>
      <BottomSheet snapPoints={[56]} handleComponent={() => null} index={0}>
        <S.BottomSheetContainer isSelecting={isSelecting}>
          <S.BottomSheetButton disabled={!isSelecting} onPress={handleAddToEvent}>
            <MaterialCommunityIcons name="plus-box-multiple-outline" color="#fff" size={24} />
            <S.BottomSheetText>Selecionar itens</S.BottomSheetText>
          </S.BottomSheetButton>
        </S.BottomSheetContainer>
      </BottomSheet>
    </>
  );
}
