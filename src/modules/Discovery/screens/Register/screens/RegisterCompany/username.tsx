import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { type GenericPageProp } from 'src/types/GenericPageProp';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { useDebounce } from '@/hooks/useDebounce';
import { useRegister } from '@/modules/Discovery/screens/Register/contexts/register.contexts';
import { checkUsernameAvailability } from '@/modules/Discovery/screens/Register/services/register.services';

import * as S from './styles';

export function RegisterCompanyUsername({ navigation }: GenericPageProp) {
  const { setFormData, formData } = useRegister();
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;

  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [username, setUsername] = React.useState(formData?.username || '');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const debounceValue = useDebounce<string>(username, 1000);

  function handleChangeText(text: string) {
    const textParsed = text.replace(/\W/, '');

    textParsed.length > 3 ? setIsFetching(true) : setIsFetching(false);
    setUsername(text.replace(/\W/, ''));
  }

  async function isUsernameAvailable() {
    try {
      const isUsernameAvailable = await checkUsernameAvailability(username);

      if (isUsernameAvailable === undefined) {
        setError('Não foi possível verificar a disponibilidade do username');
        setSuccess('');
        return;
      }

      if (!isUsernameAvailable) {
        setSuccess('');
        setError('Este usuário já existe');
        return;
      }

      setError('');
      setSuccess('Username disponível');

      return true;
    } catch (error) {
      console.error('isUsernameAvailable -> error', error);
    } finally {
      setIsFetching(false);
    }
  }

  async function handleNextStep() {
    try {
      setIsLoading(true);

      setFormData((prevState) => ({ ...prevState, username }));

      navigation.navigate('RegisterCompany', { isCreateProfile });
    } catch (error) {
      console.error('handleNextStep -> error', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (username.length > 3) {
      isUsernameAvailable();
    }
  }, [debounceValue]);

  return (
    <S.Container>
      {isLoading && <Loading />}

      <S.Title>Username</S.Title>
      <S.Subtitle>Por favor digite um username para ser utilizado no seu cadastro</S.Subtitle>
      <S.Subtitle>Não é possível utilizar caracteres especiais.</S.Subtitle>
      <KeyboardAvoidingContainer>
        <S.Form>
          <Input
            label="Username *"
            placeholder="escolha seu username"
            value={username}
            onChangeText={handleChangeText}
            autoCapitalize="none"
            maxLength={15}
            autoCorrect={false}
            error={error}
            success={!error ? success : ''}
            onBlur={isUsernameAvailable}
            rightIcon={{ name: 'lock' }}
          />
          {isFetching && <ActivityIndicator />}
        </S.Form>

        <S.ButtonContent>
          <Button
            title="Próximo"
            onPress={handleNextStep}
            disabled={isFetching || isLoading || !success}
          />
        </S.ButtonContent>
      </KeyboardAvoidingContainer>
    </S.Container>
  );
}
