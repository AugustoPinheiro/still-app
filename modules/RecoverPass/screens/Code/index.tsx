import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { GenericPageProp } from '@/types/GenericPageProp';

import { passwordReset } from '../../services/recoverpass.services';
import * as S from './styles';

const schema = z.object({
  code: z.string().min(4).nonempty(),
});

type SchemaFieldsType = z.infer<typeof schema>;

export function Code({ navigation }: GenericPageProp) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const route = useRoute<any>();

  const theme = useTheme();

  const { show } = useToast();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    setValue,
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
    },
  });

  function addMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes);

    return date;
  }

  const code = watch('code');
  const ref = useBlurOnFulfill({ value: code ?? '', cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: (val) => setValue('code', val),
  });
  const [expiryDate] = React.useState(() => addMinutes(new Date(), 5));

  const [timeUnits, setTimeUnits] = React.useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeUnits = (timeDifference) => {
      const seconds = Math.floor(timeDifference / 1000);
      setTimeUnits({
        years: Math.floor(seconds / (365 * 24 * 60 * 60)),
        days: Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60)),
        hours: Math.floor((seconds % (24 * 60 * 60)) / (60 * 60)),
        minutes: Math.floor((seconds % (60 * 60)) / 60),
        seconds: seconds % 60,
      });
    };

    const updateCountdown = () => {
      const currentDate = new Date().getTime();
      const expiryTime = expiryDate.getTime();
      const timeDifference = expiryTime - currentDate;

      if (timeDifference <= 0) {
        // Countdown finished
        calculateTimeUnits(0);
      } else {
        calculateTimeUnits(timeDifference);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  function formatTimeUnits() {
    const { minutes, seconds } = timeUnits;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  function hasTimeUnits() {
    const { minutes, seconds } = timeUnits;
    return minutes > 0 || seconds > 0;
  }

  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [code]);

  async function handleLogin(data: SchemaFieldsType) {
    try {
      setIsLoading(true);
      const resp = await passwordReset({
        email: route?.params?.email ?? '',
        code: data.code,
      });
      navigation.navigate('NewPassword', {
        email: route?.params?.email ?? '',
        token: resp,
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);

      show({
        message: 'E-mail não encontrado em nossa base de dados.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function returnText(email: string): string {
    const emailRegex = /(?<=.).(?=.*@)/g;
    const maskedEmail = email.replace(emailRegex, '*');
    return `Insira o código de acesso que você recebeu no email ${maskedEmail}`;
  }

  async function handleSendAnotherCode() {
    setIsLoading(true);
    await passwordReset({
      email: route?.params?.email ?? '',
    });
    show({
      message: 'Enviamos outro código para seu email.',
      type: 'success',
    });
    setIsLoading(false);
  }

  return (
    <>
      <StatusBar style="auto" backgroundColor="#FCF6F1" />
      {isLoading && <Loading />}
      <KeyboardAvoidingContainer>
        <S.Wrapper hasHeader={false}>
          <S.Container>
            <S.InputContainer>
              <View>
                <S.Title>CÓDIGO DE ACESSO</S.Title>
                <S.Label>{returnText(route?.params?.email ?? '')}</S.Label>
              </View>
              <View style={{ marginTop: 40 }} />
              <S.InputContainerSmaller>
                <Controller
                  name="code"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CodeField
                      ref={ref}
                      {...props}
                      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                      value={value}
                      onChangeText={onChange}
                      cellCount={4}
                      // rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({ index, symbol, isFocused }) => (
                        <S.Value
                          key={index}
                          style={[
                            {
                              width: 46,
                              height: 42,
                              borderRadius: 4,
                              justifyContent: 'center',
                              alignItems: 'center',
                              lineHeight: 40,
                              fontSize: 24,
                              borderWidth: 1,
                              borderColor: theme.colors.gray05,
                              textAlign: 'center',
                            },
                          ]}
                          onLayout={getCellOnLayoutHandler(index)}
                        >
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </S.Value>
                      )}
                    />
                  )}
                />
              </S.InputContainerSmaller>
              {error && <S.ErrorText>{error}</S.ErrorText>}
            </S.InputContainer>
            <S.ButtonContent>
              <Button
                title="Próximo"
                marginBottom={0}
                onPress={handleSubmit(handleLogin)}
                disabled={!isValid || isLoading}
              />
              <View style={{ marginTop: 16 }} />
              <Button
                title={
                  hasTimeUnits()
                    ? `Não recebi o código de acesso ${formatTimeUnits()}`
                    : 'Não recebi o código de acesso'
                }
                marginBottom={0}
                type="secondary"
                onPress={handleSendAnotherCode}
                disabled={isLoading || hasTimeUnits()}
              />
            </S.ButtonContent>
          </S.Container>
        </S.Wrapper>
      </KeyboardAvoidingContainer>
    </>
  );
}
