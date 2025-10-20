import React from 'react';
import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Image } from 'expo-image';

import { useAgenda } from '@/modules/Profile/screens/MyAgenda/contexts/agenda.context';
import { EventClothingType } from '@/types/EventClothingType';
import { EventLookType } from '@/types/EventLookType';

import * as S from './styles';

interface Props {
  looks: EventLookType[];
  clothings: EventClothingType[];
}
function LooksCardComponent({ looks, clothings }: Props) {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { currentDate } = useAgenda();

  const data = [...looks, ...clothings];
  const total = data?.length;
  const isLooks = !!looks?.length;

  // Usar altura fixa igual ao card vazio
  const cardHeight = 346;

  // Estado para o índice ativo do carrossel
  const [activeIndex, setActiveIndex] = React.useState(0);

  function handleClickLook(scheduleId: number) {
    // @ts-expect-error
    navigation.navigate('MyLooksDetails', {
      title: format(new Date(currentDate + 'T12:00:00'), "dd 'DE' MMMM, yyyy"),
      data,
      isLooks,
      scheduleId,
    });
  }

  function renderItem({ item, index }: { item: EventLookType | EventClothingType; index: number }) {
    const scheduleId = isLooks
      ? (item as EventLookType).schedule_id
      : (item as EventClothingType).schedule_id;
    const image = (item as any)?.look?.image ?? (item as any)?.clothing?.image;

    return (
      <S.CardContainer onPress={() => handleClickLook(scheduleId)} style={{ height: cardHeight, width: '100%' }}>
        <Image
          key={`lookAgenda-${item.id}`}
          source={{ uri: image }}
          contentFit="contain"
          style={{ width: '100%', height: '100%' }}
          cachePolicy="disk"
        />
        <S.CountContainer>
          <S.CountText>{`${index + 1}/${total} ${isLooks ? 'looks' : 'peças'}`}</S.CountText>
        </S.CountContainer>
      </S.CardContainer>
    );
  }

  return (
    <S.Container style={{ height: cardHeight }} width={width - 24}>
      <Carousel
        data={data}
        loop={false}
        mode={data?.length > 1 ? 'vertical-stack' : undefined}
        snapEnabled={data?.length > 1}
        renderItem={renderItem}
        width={width - 74}
        height={cardHeight - 42}
        modeConfig={{
          snapDirection: 'left',
          showLength: 1,
        }}
        onSnapToItem={setActiveIndex}
      />
      {data.length > 1 && (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
          {data.map((_, idx) => (
            <View
              key={idx}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: idx === activeIndex ? '#222' : '#ccc',
              }}
            />
          ))}
        </View>
      )}
    </S.Container>
  );
}

const LooksCard = React.memo(LooksCardComponent);

export { LooksCard };
