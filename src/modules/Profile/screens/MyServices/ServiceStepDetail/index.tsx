import { Dimensions, FlatList, Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import Pdf from 'react-native-pdf';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { useToast } from '@/contexts/Toast.contexts';
import { ProfileStackParamList } from '@/modules/Profile/routes/profile.types';
import { AttachType } from '@/types/ScheduleServiceType';

import * as S from './styles';

export function ServiceStepDetail() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ProfileStackParamList, 'ServiceStepDetail'>>();
  const { show } = useToast();
  const step = route.params;

  async function downloadPdf(url: string) {
    try {
      const { dirs } = RNFetchBlob.fs;
      const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
      const fileName = `servico_${step.service_step.title.replaceAll(' ', '_').toLocaleLowerCase()}.pdf`;
      const configfb = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: fileName,
          path: `${dirs.DownloadDir}/${fileName}`,
        },
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${fileName}`,
        path: `${dirToSave}/${fileName}`,
      };
      const configOptions = Platform.select({
        ios: configfb,
        android: configfb,
      });

      RNFetchBlob.config(configOptions || {})
        .fetch('GET', url, {})
        .then((res) => {
          if (Platform.OS === 'ios') {
            RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
            RNFetchBlob.ios.previewDocument(configfb.path);
          }
          if (Platform.OS === 'android') {
            console.log('file downloaded');
          }
        })
        .catch((e) => {
          console.log('Error on downloading PDF', e);
        });
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.CardTopRow>
          <S.Title>{step.service_step.title}</S.Title>
          {step.status == 2 ? <S.Icon name={'clock'} /> : <></>}
          {step.status == 4 ? <S.Icon name={'check-circle'} /> : <></>}
        </S.CardTopRow>
        {step.service_step.description ? <S.Text>{step.service_step.description}</S.Text> : <></>}
        {step.start ? (
          <S.TextGray>
            Data: {format(step.start, 'dd/MM')} {format(step.start, 'hh:mm')} -{' '}
            {format(step.end, 'hh:mm')}
          </S.TextGray>
        ) : (
          <></>
        )}
        <S.TextGray>Duração: {step.service_step.duration}h</S.TextGray>
        <S.TextGray>{step.service_step.online ? 'Online' : 'Presencial'}</S.TextGray>
        <FlatList
          data={step.attachs}
          extraData={step.attachs}
          keyExtractor={(item: AttachType) => String(item.id)}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item, index }) => (
            <>
              {item.url.includes('.pdf') ? (
                <>
                  <Pdf
                    trustAllCerts={false}
                    source={{ uri: item.url, cache: true }}
                    style={{
                      flex: 1,
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height * 0.3,
                    }}
                    onError={(error) => {
                      console.error('Error on load pdf', error);
                    }}
                  />
                  <S.PdfButton
                    title={'Baixar PDF'}
                    onPress={async () => await downloadPdf(item.url)}
                  ></S.PdfButton>
                </>
              ) : (
                <S.CardImageContainer>
                  <S.CardImage
                    source={{ uri: item.url }}
                    recyclingKey={item.url}
                    contentFit="contain"
                    cachePolicy="disk"
                  ></S.CardImage>
                </S.CardImageContainer>
              )}
            </>
          )}
          onEndReached={() => {
            return;
          }}
          showsVerticalScrollIndicator={true}
        />
      </S.Container>
    </S.Wrapper>
  );
}
