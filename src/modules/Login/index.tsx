import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { OneSignal } from 'react-native-onesignal';
import * as amplitude from '@amplitude/analytics-react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { zodResolver } from '@hookform/resolvers/zod';
import { StackActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { z } from 'zod';
import Logo from '@/assets/images/logo.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { InputPassword } from '@/components/InputPassword';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { COMETCHAT_AUTH_KEY } from '@/config/cometChat';
import { EXPO_PUBLIC_IS_DEV } from '@/config/env';
import { setAccessToken } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { login } from '@/modules/Login/services/login.services';
import { GenericPageProp } from '@/types/GenericPageProp';
import { ProfileType } from '@/types/ProfileType';
import * as S from './styles';

const IS_DEV = EXPO_PUBLIC_IS_DEV;

const schema = z.object({
  email: z.string().email().min(1, 'E-mail é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type SchemaFieldsType = z.infer<typeof schema>;

export function Login({ navigation }: GenericPageProp) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const { show } = useToast();

  function getMockUser(username: string) {
    switch (username) {
      case 'teste5': return 21;
      case 'teste6': return 25;
      case 'mylycystore': return 13;
      case 'mylycy': return 4;
      default: return 6;
    }
  }

  const { control, handleSubmit, watch, formState: { isValid } } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const email = watch('email');
  const password = watch('password');

  function navigateToHomeApp() {
    console.log('Navigating to Home App');
    navigation.dispatch(StackActions.popToTop());
    navigation.dispatch(StackActions.replace('TabRoutes'));
  }

  function loginAmplitude(uuid: string, user: ProfileType) {
    try {
      console.log(`Logging into Amplitude with UUID: ${uuid}, Profile Type: ${user?.profile_type}`);
      amplitude.setUserId(`${uuid}`);
      const identifyObj = new amplitude.Identify();
      identifyObj.set('profile_type', user?.profile_type || 'common');
      amplitude.identify(identifyObj);
      console.log('Amplitude login successful');
    } catch (error) {
      console.error('Amplitude login error:', error);
    }
  }

  function loginOneSignal(uuid: string) {
    console.log(`Logging into OneSignal with UUID: ${uuid}`);
    OneSignal.login(uuid);
    console.log('OneSignal login called');
  }

  async function loginCometchat(user: ProfileType) {
    console.log(`Logging into CometChat with user ID: ${IS_DEV ? getMockUser(user?.username) : user?.id}`);
    if (IS_DEV) {
      const mockUser = getMockUser(user?.username);
      await CometChat.login(mockUser, COMETCHAT_AUTH_KEY);
    } else {
      await CometChat.login(user?.id, COMETCHAT_AUTH_KEY);
    }
    console.log('CometChat login successful');
  }

  async function handleLogin(data: SchemaFieldsType) {
    console.log(`Starting login for email: ${data.email}`);
    try {
      setIsLoading(true);
      console.log('Calling login service');
      const user = await login(data);
      console.log('Login response:', JSON.stringify(user));
      const uuid = user?.uuid;

      if (!uuid) {
        console.error('UUID not found in user response');
        throw new Error('UUID missing from server response');
      }

      console.log('Attempting CometChat login');
      // await loginCometchat(user);

      console.log('Attempting OneSignal login');
      loginOneSignal(uuid);

      console.log('Attempting Amplitude login');
      loginAmplitude(uuid, user);

      console.log('Navigating to home');
      navigateToHomeApp();
    } catch (error: any) {
      console.error('Login error:', error);
      setIsLoading(false);
      setAccessToken('');
      const status = error?.status;

      if (status === 401) {
        setError('E-mail ou senha incorretos');
        console.log('401: Incorrect email or password');
        return;
      }

      if (status >= 400 && status < 500) {
        setError('E-mail ou senha incorretos');
        console.log('4xx: Client error');
        return;
      }

      const message = IS_DEV ? JSON.stringify(error) : 'Erro ao fazer login';
      console.log('Showing toast with message:', message);
      show({ message, type: 'error' });
    } finally {
      setIsLoading(false);
      console.log('Login process finished');
    }
  }

  const handleNavigateForgotPass = () => {
    console.log('Navigating to RecoverPass');
    navigation.navigate('RecoverPass');
  };

  useEffect(() => {
    if (error) {
      console.log('Clearing error due to input change');
      setError('');
    }
  }, [email, password]);

  return (
    <>
      <StatusBar style="auto" backgroundColor="#FCF6F1" />
      {isLoading && <Loading />}
      <KeyboardAvoidingContainer>
        <S.Wrapper hasHeader={false}>
          <S.Container>
            {/* <S.ImagesContainer>
            <Login1Img width={139} height={180} stroke="#4C4C56" strokeWidth={1} />
            <Login2Img width={139} height={180} stroke="#4C4C56" strokeWidth={1} />
          </S.ImagesContainer> */}

            <S.LogoContainer>
              <Logo />
              {IS_DEV ? <S.HomologText>Homologação</S.HomologText> : <></>}
            </S.LogoContainer>

            <S.InputContainer>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    hasError={!!error}
                    autoComplete="email"
                    keyboardType="email-address"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputPassword
                    label="Senha"
                    placeholder="Digite sua senha"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    hasError={!!error}
                    autoComplete="password"
                  />
                )}
              />

              {error && <S.ErrorText>{error}</S.ErrorText>}

              <S.ButtonContent>
                <Button
                  title="Login"
                  marginBottom={0}
                  onPress={handleSubmit(handleLogin)}
                  disabled={!isValid}
                />

                <TouchableOpacity onPress={handleNavigateForgotPass}>
                  <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
                </TouchableOpacity>
              </S.ButtonContent>
            </S.InputContainer>

            <S.CreateAccountContainer>
              <Button
                title="Criar nova conta"
                type="secondary"
                marginBottom={0}
                onPress={() => navigation.navigate('Discovery', { screen: 'ChooseProfile' })}
              />
            </S.CreateAccountContainer>
          </S.Container>
        </S.Wrapper>
      </KeyboardAvoidingContainer>
    </>
  );
}
