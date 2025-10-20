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
import { putTags } from '@/modules/Discovery/services/discovery.services';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';

export function RegisterCompanyPhoto({ navigation }: GenericPageProp) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formData, registerUser, setFormData } = useRegister();
  const { tagsStyles } = useDiscovery();
  const photoRef = React.useRef<PhotoRef>();
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;

  async function onPickImage(image: ImagePickerAsset) {
    setFormData((prevState) => ({ ...prevState, avatar: image }));
  }

  async function handleRegister() {
    try {
      // if (!formData?.avatar) {
      //   photoRef.current?.openOptions();
      //   return;
      // }

      setIsLoading(true);

      await registerUser(undefined, isCreateProfile);

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

          {formData?.avatar ? (
            <S.SubtitlePhotoSelected>Estamos satisfeitos em ter você aqui!</S.SubtitlePhotoSelected>
          ) : (
            <S.SubtitlePhoto>
              {formData?.avatar
                ? 'Estamos satisfeitos em ter você aqui!'
                : 'Precisamos somente de uma foto\ndo seu rosto para finalizar!'}
            </S.SubtitlePhoto>
          )}
        </S.ContainerPhoto>

        <S.ButtonContent>
          <Button title="Próximo" type="primary" onPress={handleRegister} />
        </S.ButtonContent>
      </S.Container>
    </Wrapper>
  );
}
