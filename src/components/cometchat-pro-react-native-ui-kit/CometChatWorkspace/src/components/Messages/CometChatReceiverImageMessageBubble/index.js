import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Linking, Platform, Alert } from 'react-native';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { Image } from 'expo-image';

import theme from '../../../resources/theme';
import * as actions from '../../../utils/actions';
import * as enums from '../../../utils/enums';
import CometChatMessageReactions from '../../Messages/Extensions/CometChatMessageReactions';
import CometChatAvatar from '../../Shared/CometChatAvatar';
import CometChatReadReceipt from '../CometChatReadReceipt';
import CometChatThreadedMessageReplyCount from '../CometChatThreadedMessageReplyCount';
import style from './styles';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const CometChatReceiverImageMessageBubble = (props) => {
  const [message, setMessage] = useState({
    ...props.message,
    messageFrom: enums.MESSAGE_FROM_RECEIVER,
  });
  const prevMessage = usePrevious(message);
  const viewTheme = { ...theme, ...props.theme };
  let senderAvatar = null;
  if (message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
    senderAvatar = { uri: message.sender.avatar };
  }

  const open = () => {
    Linking.canOpenURL(message.data.url).then((supported) => {
      if (!supported) return;

      Linking.openURL(message.data.url);
    });
  };

  useEffect(() => {
    const previousMessageStr = JSON.stringify(prevMessage);
    const currentMessageStr = JSON.stringify(props.message);

    if (previousMessageStr !== currentMessageStr) {
      const newMessage = {
        ...props.message,
        messageFrom: enums.MESSAGE_FROM_RECEIVER,
      };
      setMessage(newMessage);
    }
  }, [props]);

  let thumbnailGenerationObject = null;
  if (Object.prototype.hasOwnProperty.call(message, 'metadata')) {
    const { metadata } = message;
    const injectedObject = metadata['@injected'];
    if (injectedObject && Object.prototype.hasOwnProperty.call(injectedObject, 'extensions')) {
      const extensionsObject = injectedObject.extensions;
      if (
        extensionsObject &&
        Object.prototype.hasOwnProperty.call(extensionsObject, 'thumbnail-generation')
      ) {
        thumbnailGenerationObject = extensionsObject['thumbnail-generation'];
      }
    }
  }

  return (
    <View style={style.container}>
      <View style={style.mainContainer}>
        {props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP ? (
          <View style={style.avatarStyle}>
            <CometChatAvatar
              cornerRadius={18}
              borderColor={viewTheme.color.secondary}
              borderWidth={0}
              image={senderAvatar}
              name={message.sender.name}
            />
          </View>
        ) : null}
        <View>
          {props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP ? (
            <View style={style.senderNameContainer}>
              <Text style={{ color: viewTheme.color.helpText }}>{message.sender.name}</Text>
            </View>
          ) : null}
          <View style={[style.messageWrapperStyle]}>
            <TouchableOpacity
              onPress={() => open()}
              style={style.messageImgWrapperStyle}
              // onLongPress={() => {
              //   props.actionGenerated(actions.OPEN_MESSAGE_ACTIONS, message);
              // }}
            >
              <Image
                defaultSource={{
                  uri: message?.localFile?.url,
                }}
                style={style.messageImg}
                source={{
                  uri: thumbnailGenerationObject
                    ? thumbnailGenerationObject.url_small
                    : message.data.url,
                }}
                contentFit="cover"
              />
            </TouchableOpacity>
          </View>
          <View style={style.messageInfoWrapperStyle}>
            <CometChatReadReceipt {...props} message={message} />

            <CometChatThreadedMessageReplyCount {...props} message={message} />
            <CometChatMessageReactions
              theme={props.theme}
              {...props}
              message={message}
              showMessage={props?.showMessage}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CometChatReceiverImageMessageBubble;
