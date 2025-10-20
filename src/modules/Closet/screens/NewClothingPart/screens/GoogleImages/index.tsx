import React from 'react';
import { View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { captureRef } from 'react-native-view-shot';
import WebView from 'react-native-webview';

import { useNavigation } from '@react-navigation/native';

import { Loading } from '@/components/Loading';

import * as S from './styles';

export function GoogleImages() {
  const navigation = useNavigation();
  const webViewRef = React.useRef<WebView>(null);
  const webViewContentRef = React.useRef<View>(null);
  const [isLoading, setLoading] = React.useState(true);

  function handleSelectImage(item: string) {
    // @ts-expect-error
    navigation?.navigate('AddNewClothingPart', { image: item });
  }

  webViewRef.current?.postMessage('Hello from react native');

  function handleWebViewGoBack() {
    webViewRef.current?.goBack();
  }

  function handleWebViewGoForward() {
    webViewRef.current?.goForward();
  }

  async function saveScreeshoot() {
    try {
      const localUri = await captureRef(webViewContentRef, { quality: 1 });

      const image = await ImageCropPicker.openCropper({
        mediaType: 'photo',
        path: localUri,
        width: 1000,
        height: 1000,
        hideBottomControls: true,
        compressImageQuality: 1,
        cropperToolbarTitle: 'Editar',
      });

      handleSelectImage(image.path);
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <S.Container>
      {isLoading && <Loading />}
      <S.WebviewContent ref={webViewContentRef} collapsable={false}>
        <WebView
          ref={webViewRef}
          source={{ uri: 'http://images.google.com/' }}
          renderLoading={() => <></>}
          onLoadEnd={() => setLoading(false)}
          startInLoadingState
          allowsBackForwardNavigationGestures
        />
      </S.WebviewContent>

      <S.BackFloatButton onPress={handleWebViewGoBack}>
        <S.ButtonIcon name="chevron-left" />
      </S.BackFloatButton>

      <S.ForwardFloatButton onPress={handleWebViewGoForward}>
        <S.ButtonIcon name="chevron-right" />
      </S.ForwardFloatButton>

      <S.ScreeShotFloatButton onPress={saveScreeshoot}>
        <S.ButtonIcon name="cellphone-screenshot" />
      </S.ScreeShotFloatButton>
    </S.Container>
  );
}
