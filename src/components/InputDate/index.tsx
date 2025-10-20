import React, { useEffect } from 'react';
import { Platform, type TextInputProps } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { useBottomSheet } from '@/contexts/BottomSheet.contexts';

import * as S from './styles';

type TInputProps = TextInputProps & {
  mode?: 'date' | 'time';
  label?: string;
  marginBottom?: number;
  width?: string;
  error?: string;
  success?: string;
  hasError?: boolean;
  value?: Date;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  rightIcon?: {
    name: string;
    onPress?: () => void;
    color?: string;
  };
};

export function InputDate({
  marginBottom,
  label,
  error,
  success,
  rightIcon,
  hasError,
  mode = 'date',
  value,
  placeholder,
  onChangeText,
  disabled,
  minimumDate,
  maximumDate,
  ...props
}: TInputProps) {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const formatMask = mode === 'date' ? 'dd/MM/yyyy' : 'HH:mm';
  const isAndroid = Platform.OS === 'android';
  const { setBottomSheetProps, expand } = useBottomSheet();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    onChangeText?.(currentDate);

    if (event.type === 'dismissed' || isAndroid || mode === 'date') {
      setShowCalendar(false);
    }
  };

  function handleCalendar() {
    !value && onChangeText?.(new Date());

    setBottomSheetProps({
      id: 'Calendar-DateTimePicker',
      snapPoints: [270],
      content: (
        <DateTimePicker
          collapsable={false}
          testID="dateTimePicker"
          value={value ? new Date(value) : new Date()}
          mode={mode}
          display="spinner"
          minuteInterval={1}
          onChange={onChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          is24Hour
          locale="pt-BR"
          themeVariant="light"
          style={{
            width: '100%',
          }}
        />
      ),
    });

    expand();
  }

  useEffect(() => {
    if (mode === 'date' && disabled) {
      setShowCalendar(false);
    }
  }, [disabled]);

  return (
    <S.Container>
      <S.Label>{label}</S.Label>

      <S.InputContainer>
        <S.Input
          error={!!error || hasError}
          disabled={disabled}
          onPress={() => {
            if (!disabled) {
              Platform.OS === 'ios' ? handleCalendar() : setShowCalendar(true);
            }
          }}
        >
          {value ? (
            <S.InputText>{format(value, formatMask)}</S.InputText>
          ) : (
            <S.InputText>{placeholder}</S.InputText>
          )}
          <S.RightIcon name={mode === 'date' ? 'calendar' : 'clock'} color={rightIcon?.color} />
        </S.Input>
      </S.InputContainer>
      {showCalendar && (
        <S.DatePickerContainer>
          <DateTimePicker
            collapsable={false}
            testID="dateTimePicker"
            value={value ? new Date(value) : new Date()}
            mode={mode}
            onChange={onChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            is24Hour
            locale="pt-BR"
            themeVariant="light"
            style={{
              width: '100%',
            }}
          />
        </S.DatePickerContainer>
      )}
      {error && <S.ErrorText>{error}</S.ErrorText>}
      {success && <S.SuccessText>{success}</S.SuccessText>}
    </S.Container>
  );
}
