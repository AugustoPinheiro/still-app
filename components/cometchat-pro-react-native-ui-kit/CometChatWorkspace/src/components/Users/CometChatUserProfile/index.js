import React from 'react';
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import { WebView } from 'react-native-webview';

import { get as _get } from 'lodash';
import BottomSheet from 'reanimated-bottom-sheet';

import theme from '../../../resources/theme';
import style from './styles';

const cross = require('./resources/clear.png');

class CometChatUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.sheetRef = React.createRef(null);
    this.isLoading = true;
  }

  render() {
    return (
      <Modal transparent animated animationType="fade" visible={this.props.open}>
        <View style={style.outerContainer}>
          <BottomSheet
            ref={this.sheetRef}
            snapPoints={[Dimensions.get('window').height - 80, 0]}
            borderRadius={30}
            initialSnap={0}
            enabledInnerScrolling={false}
            enabledContentTapInteraction={false}
            overdragResistanceFactor={10}
            renderContent={() => {
              return (
                <View style={style.bottomSheetContainer}>
                  <TouchableOpacity style={style.crossImgContainer} onPress={this.props.close}>
                    <Image source={cross} style={style.crossImg} contentFit="contain" />
                  </TouchableOpacity>
                  <View style={style.outerImageContainer}>
                    {this.isLoading ? (
                      <View style={style.loaderContainer}>
                        <ActivityIndicator size="large" color={theme.color.primary} />
                        <Text style={{ marginTop: 10 }}>Loading...</Text>
                      </View>
                    ) : null}
                    <View style={[style.mainContainer]}>
                      <WebView
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onError={(syntheticEvent) => {
                          const { nativeEvent } = syntheticEvent;
                          this.isLoading = false;
                          console.warn('WebView error: ', nativeEvent);
                        }}
                        onLoad={(syntheticEvent) => {
                          this.isLoading = false;
                        }}
                        onHttpError={(syntheticEvent) => {
                          const { nativeEvent } = syntheticEvent;
                          this.isLoading = false;
                          console.warn(
                            'WebView received error status code: ',
                            nativeEvent.statusCode
                          );
                        }}
                        startInLoadingState={true}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderWidth: 3,
                        }}
                        source={{ uri: this.props.url }}
                        renderError={(errorName) => <Text>errorName</Text>}
                      />
                    </View>
                  </View>
                </View>
              );
            }}
            onCloseEnd={() => {
              this.props.close();
            }}
          />
        </View>
      </Modal>
    );
  }
}
export default CometChatUserProfile;
