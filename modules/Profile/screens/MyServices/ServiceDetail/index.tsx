import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { ProgressBar } from '@/components/ProgressBar';
import { useToast } from '@/contexts/Toast.contexts';
import { ProfileStackParamList } from '@/modules/Profile/routes/profile.types';

import * as S from './styles';
import { FlatList } from 'react-native';
import { ScheduledServiceStepType } from '@/types/ScheduleServiceType';
import { addHours, format } from 'date-fns';

export function ServiceDetail() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ProfileStackParamList, 'ServiceDetail'>>();
  const { show } = useToast();
  const service = route.params;
  const finishedStepsLength = service.steps.filter((step) => step.status == 4).length;

  function getProgress() {
    return finishedStepsLength / service.steps.length * 100;
  }

  function handleNavigateServiceStepDetail(service: ScheduledServiceStepType) {
    navigation.navigate('ServiceStepDetail', service);
  }

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.ContainerProgressBar>
            <ProgressBar progress={getProgress()} />
            <S.ProgressBarText>
              {`${finishedStepsLength}/${service.steps.length} etapas concluídas`}
            </S.ProgressBarText>
          </S.ContainerProgressBar>
          <S.Row>
            <S.TextGray>
              Valor&nbsp;&nbsp;
              <S.TextGrayBold>
              {service?.final_price
                ? Number(service?.final_price / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                : 'R$ 0,00'}
              </S.TextGrayBold>
            </S.TextGray>
          </S.Row>
          <S.Title>{service.service.title}</S.Title>
          {service.service.description ? 
            (
              <S.Text>{service.service.description}</S.Text>
            ) : (<></>)
          }
          <FlatList
          data={service.steps}
          extraData={service.steps}
          keyExtractor={(item: ScheduledServiceStepType) => String(item.id)}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item, index }) => (
            <S.Card key={item.id} onPress={async () => handleNavigateServiceStepDetail(item)}>
              <S.CardTop>
                <S.Row>
                  <S.TextGrayBold>Etapa {index + 1} - {item.service_step.title}</S.TextGrayBold>
                  {item.status == 2 ? (
                    <S.Icon name={'clock'} />
                  ) : (<></>)}
                  {item.status == 4 ? (
                    <S.Icon name={'check-circle'} />
                  ) : (<></>)}
                </S.Row>
                {item.service_step.description ? (
                  <S.TextGray>Descrição: {item.service_step.description}</S.TextGray>
                ) : (<></>)}
                {item.start ? (
                  <S.TextGray>Data: {format(addHours(item.start, 3), 'dd/MM')} {format(addHours(item.start, 3), 'HH:mm')} - {format(addHours(item.end, 3), 'HH:mm')}</S.TextGray>
                ) : (<></>)}
                <S.TextGray>Duração: {item.service_step.duration}h</S.TextGray>
                <S.TextGray>
                  {item.service_step.online ? 'Online' : 'Presencial'}
                </S.TextGray>
              </S.CardTop>
            </S.Card>
          )}
          onEndReached={() => {
            return;
          }}
          showsVerticalScrollIndicator={true}
        />
        </S.Container>
      </S.Wrapper>
    </>
  );
}
