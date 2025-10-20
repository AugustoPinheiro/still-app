import React from 'react';

import { useRoute } from '@react-navigation/native';
import { ImagePickerAsset } from 'expo-image-picker';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Photo, PhotoRef } from '@/components/Photo';
import { Wrapper } from '@/components/Wrapper';
import { setHasRegister } from '@/config/mmkvStorage';
import { useDiscovery } from '@/modules/Discovery/contexts/discovery.contexts';
import { useRegister } from '@/modules/Discovery/screens/Register/contexts/register.contexts';
import { putQuestionnaireAnswers, putTags } from '@/modules/Discovery/services/discovery.services';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';

export function RegisterUserPhoto({ navigation }: GenericPageProp) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formData, registerUser, setFormData } = useRegister();
  const { answersQuestions, tagsStyles } = useDiscovery();
  const photoRef = React.useRef<PhotoRef>();
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;

  async function onPickImage(image: ImagePickerAsset) {
    setFormData((prevState) => ({ ...prevState, avatar: image }));
  }

  function getIdsAnswers() {
    return answersQuestions?.map((answer) => answer.answerId);
  }

  async function handleRegister() {
    try {
      setIsLoading(true);
      const answers = getIdsAnswers();

      await registerUser(undefined, isCreateProfile);

      if (answers?.length) {
        try {
          await putQuestionnaireAnswers(answers);
        } catch (error) {
          console.error('handleRegister putQuestionnaireAnswers -> error', error);
        }
      }

      if (tagsStyles?.length) {
        try {
          await putTags(tagsStyles);
        } catch (error) {
          console.error('handleRegister putTags -> error', error);
        }
      }

      setHasRegister(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'TabRoutes' }],
      });
    } catch (error) {
      console.error('handleRegister -> error', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <S.Container>
        <S.ContainerPhoto>
          <S.TitlePhoto>Uma foto sua!</S.TitlePhoto>

          <Photo ref={photoRef} onPickImage={onPickImage} photo={formData?.avatar} />

          <S.PhotoName>{formData?.name}</S.PhotoName>

          <S.SubtitlePhoto>
            {formData?.avatar
              ? 'Estamos satisfeitos em ter você aqui!'
              : 'Precisamos somente de uma foto\ndo seu rosto para finalizar!'}
          </S.SubtitlePhoto>
        </S.ContainerPhoto>

        <S.ButtonContent>
          <Button
            title="Próximo"
            type="primary"
            disabled={!formData?.avatar}
            onPress={handleRegister}
          />
        </S.ButtonContent>
      </S.Container>
    </Wrapper>
  );
}
