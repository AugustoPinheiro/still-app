import Actions from './actions';
import style from './styles';
import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';

// import BottomSheet from 'reanimated-bottom-sheet';

export default class CometChatMessageActions extends React.Component {
  sheetRef = React.createRef(null);

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.sheetRef.current.snapToIndex(0);
    }
  }

  renderContent = () => (
    <Actions {...this.props} message={this.props.message} />
  );

  renderHeader = () => <View style={style.header} />;
  render() {
    const { open, close } = this.props;
    return (
      <Modal transparent animationType="fade" visible={open}>
        <View style={style.bottomSheetContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.sheetRef.current.snapToIndex(1);
              this.props.close();
            }}>
            <View style={style.fullFlex}>
              <BottomSheet
                ref={this.sheetRef}
                snapPoints={[250, 1]}
                borderRadius={30}
                initialSnap={1}
                enabledInnerScrolling={false}
                renderHeader={this.renderHeader}
                enabledContentTapInteraction
                overdragResistanceFactor={10}
                enablePanDownToClose={true}>
                {this.renderContent}
              </BottomSheet>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}
