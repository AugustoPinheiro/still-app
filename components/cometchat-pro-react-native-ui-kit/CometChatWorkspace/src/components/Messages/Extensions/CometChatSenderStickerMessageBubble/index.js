import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { Image } from 'expo-image';

import * as actions from '../../../../utils/actions';
import * as enums from '../../../../utils/enums';
import CometChatReadReceipt from '../../CometChatReadReceipt';
import CometChatThreadedMessageReplyCount from '../../CometChatThreadedMessageReplyCount';
import CometChatMessageReactions from '../CometChatMessageReactions';
import style from './styles';

const CometChatSenderStickerMessageBubble = (props) => {
  const message = {
    ...props.message,
    messageFrom: enums.MESSAGE_FROM_SENDER,
  };
  let stickerData = null;
  let stickerImg = null;
  if (
    Object.prototype.hasOwnProperty.call(message, 'data') &&
    Object.prototype.hasOwnProperty.call(message.data, 'customData')
  ) {
    stickerData = message.data.customData;

    if (Object.prototype.hasOwnProperty.call(stickerData, 'sticker_url')) {
      stickerImg = (
        <Image source={{ uri: stickerData.sticker_url }} style={style.messageImgWrapper} />
      );
    }
  }
  return (
    <View style={style.messageContainerStyle}>
      <TouchableWithoutFeedback
        onLongPress={() => props.actionGenerated(actions.OPEN_MESSAGE_ACTIONS, message)}
      >
        <View style={style.messageWrapperStyle}>{stickerImg}</View>
      </TouchableWithoutFeedback>
      <View style={style.messageInfoWrapperStyle}>
        <CometChatThreadedMessageReplyCount {...props} message={message} />
        <CometChatReadReceipt {...props} message={message} />
      </View>
      <View style={{ height: 40 }}>
        <CometChatMessageReactions
          theme={props.theme}
          {...props}
          message={message}
          showMessage={props?.showMessage}
        ></CometChatMessageReactions>
      </View>
    </View>
  );
};
export default CometChatSenderStickerMessageBubble;
