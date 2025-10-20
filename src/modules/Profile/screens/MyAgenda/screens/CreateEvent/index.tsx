import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { format, isBefore, isSameDay } from 'date-fns';
// import { useTheme } from 'styled-components/native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { InputDate } from '@/components/InputDate';
import { Loading } from '@/components/Loading';
// import MultipleTagList from '@/components/MultipleTagList';
import { Switch } from '@/components/Switch';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { DeleteConfirmation } from '@/modules/Profile/components/DeleteConfirmation';
import { useAgenda } from '@/modules/Profile/screens/MyAgenda/contexts/agenda.context';
import {
  deleteSchedule,
  getAgendaTags,
  saveSchedule,
} from '@/modules/Profile/services/agenda.services';
import { ScheduleType } from '@/types/ScheduleType';
import { dateWithoutTimezone } from '@/utils/dateWithoutTimezone';
import { getSnapPoint } from '@/utils/getSnapPoint';

import * as S from './styles';

import * as amplitude from '@amplitude/analytics-react-native';

const schema = z.object({
  title: z.string().min(3, 'Mínimo de 3 carácteres').max(100),
  location: z.string().max(100).optional(),
  allDay: z.boolean().optional(),
  startDate: z.date(),
  endDate: z.date().optional(), // Tornar opcional já que será sempre igual a startDate
  startTime: z.date().optional(),
  endTime: z.date().optional(),
});

type TFormData = z.infer<typeof schema>;

type Params = {
  origin: {
    item: ScheduleType;
  };
};

export function CreateEvent() {
  const [loading, setLoading] = React.useState(false);
  // const [tagsSelecteds, setTags] = React.useState<string[]>([]);
  const { refetch, setCurrentDate } = useAgenda();
  const navigation = useNavigation();
  const { close, setBottomSheetProps, expand } = useBottomSheet();
  // const theme = useTheme();
  const { show } = useToast();
  const { params } = useRoute<RouteProp<Params, 'origin'>>();
  const item = params?.item;

  const defaultValues = React.useMemo(() => {
    if (!item)
      return {
        title: '',
        location: '',
        allDay: false,
        startDate: new Date(),
        endDate: new Date(), // Sempre igual a startDate
        startTime: undefined as Date | undefined,
        endTime: undefined as Date | undefined,
      };

    // item?.tags?.length && setTags(item?.tags?.map((tag) => tag.id));

    return {
      title: item.title,
      location: item.location,
      allDay: Boolean(item.all_day),
      startDate: new Date(item.start_date),
      endDate: new Date(item.end_date),
      startTime: new Date(item.start_date),
      endTime: new Date(item.end_date),
    };
  }, [item]);

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { isLoading: isLoadingTags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => await getAgendaTags(),
  });

  async function onSubmit(data: TFormData) {
    try {
      setLoading(true);

      // Como removemos os campos de horário visualmente, vamos usar horários padrão
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.startDate); // Sempre igual a startDate

      // Definir horário padrão (meio-dia) se não houver horário específico
      if (!data.startTime) {
        startDate.setHours(12, 0, 0, 0);
      } else {
        startDate.setHours(data.startTime.getHours(), data.startTime.getMinutes(), 0, 0);
      }

      if (!data.endTime) {
        endDate.setHours(12, 0, 0, 0);
      } else {
        endDate.setHours(data.endTime.getHours(), data.endTime.getMinutes(), 0, 0);
      }

      const startDateWithoutTimezone = dateWithoutTimezone(startDate);
      const endDateWithoutTimezone = dateWithoutTimezone(endDate);

      const isMoreThanOneDay = !isSameDay(endDateWithoutTimezone, startDateWithoutTimezone);

      if (isBefore(endDateWithoutTimezone, startDateWithoutTimezone)) {
        if (isMoreThanOneDay) {
          setError('endDate', { message: 'Data final não pode ser anterior à data inicial' });
          return;
        }
        setError('endTime', { message: 'Horário final não pode ser anterior ao horário inicial' });
        return;
      }

      const payload = {
        title: data.title,
        location: data.location,
        all_day: true, // Sempre true já que não temos campos de horário
        start_date: startDateWithoutTimezone,
        end_date: endDateWithoutTimezone,
        // tags: tagsSelecteds ?? [],
        isMoreThanOneDay,
      };

      if (!item?.id) {
        amplitude.track('Create Event')
      }

      const event = await saveSchedule(payload, item?.id);
      setCurrentDate(format(startDateWithoutTimezone, 'yyyy-MM-dd'));
      await refetch();

      if (isMoreThanOneDay) {
        return navigation.goBack();
      }

      if (item?.id) {
        show({
          message: 'Evento atualizado com sucesso',
          type: 'success',
        });

        return navigation.goBack();
      }

      // @ts-expect-error
      navigation.navigate('SuccessEvent', { event });
    } catch (error) {
      if (item?.id) {
        show({
          message: 'Erro ao atualizar evento, tente novamente mais tarde',
          type: 'error',
        });
        return;
      }

      show({ type: 'error', message: 'Erro ao criar evento' });
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteEvent() {
    setBottomSheetProps({
      id: 'DeleteAccountDeleteConfirmation',
      content: (
        <DeleteConfirmation
          close={close}
          handleConfirm={async () => {
            try {
              await deleteSchedule(item.id);
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

  if (isLoadingTags) return <Loading hasBackground={false} />;

  return (
    <S.Container>
      {loading && <Loading />}
      <S.Form>
        <Controller
          name="title"
          control={control}
          render={({ field: { value, onBlur, onChange }, formState: { errors } }) => (
            <Input
              label="Título *"
              placeholder="Digite o nome desse evento"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors?.title?.message}
            />
          )}
        />

        <Controller
          name="location"
          control={control}
          render={({ field: { value, onBlur, onChange } }) => (
            <Input
              label="Local"
              placeholder="Informe a cidade ou país do evento"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />

        <S.FormRow>
          <S.FormRowItem>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <InputDate
                  label="Dia que começa *"
                  placeholder="Começo"
                  value={value as any}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    // Sempre definir endDate igual a startDate
                    setValue('endDate', new Date(value));
                    onChange(value);
                  }}
                />
              )}
            />
          </S.FormRowItem>
        </S.FormRow>

        {/* {tags?.length ? (
          <Controller
            name="tags"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MultipleTagList
                inputStyles={{
                  color: theme?.colors.gray02,
                  fontFamily: theme?.fonts.REGULAR,
                  fontSize: theme?.fontSizes.XS,
                }}
                boxStyles={{
                  borderRadius: 4,
                  borderColor: theme?.colors.gray06,
                  paddingLeft: 12,
                }}
                dropdownStyles={{ borderColor: theme?.colors.gray06 }}
                dropdownTextStyles={{ color: theme?.colors.gray02 }}
                data={tags}
                save="key"
                label="Tags"
                searchPlaceholder="Pesquisar tags"
                placeholder="Digite tags para esse evento"
                setSelected={setTags}
                maxHeight={250}
                notFoundText="Nenhuma teg encontrada"
              />
            )}
          />
        ) : (
          <></>
        )} */}

        {/* {!item?.id && (
          <S.SwitchContainer>
            <S.SwitchRow>
              <S.SwitchText>Criar listagem de peças?</S.SwitchText>

              <Switch value={createList} onValueChange={setCreateList} />
            </S.SwitchRow>
            <S.SwitchDescription>
              Visualize e revise as peças que você escolheu após criar o seu evento
            </S.SwitchDescription>
          </S.SwitchContainer>
        )} */}

        <S.ButtonContainer>
          {item?.id ? (
            <>
              <Button
                title="Salvar Alterações"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting || !isValid}
              />
              <Button
                title="Excluir evento"
                type="secondary"
                onPress={handleDeleteEvent}
                disabled={loading || !isValid}
              />
            </>
          ) : (
            <Button
              title="Criar evento"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || !isValid}
            />
          )}
        </S.ButtonContainer>
      </S.Form>
    </S.Container>
  );
}
