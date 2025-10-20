import React from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { type HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';

type IButtonProps = Omit<HeaderBackButtonProps, 'canGoBack'> &
  TouchableOpacityProps & {
    onPress?: () => void;
    canGoBack?: boolean;
  };

function BackButton({ onPress, style, ...rest }: IButtonProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    if (onPress) {
      onPress();
      return;
    }

    navigation.goBack();
  }

  return (
    <TouchableOpacity style={[{ width: 24, height: 24 }, style]} {...rest} onPress={handleGoBack}>
      <FeatherIcon name="arrow-left" size={24} color="#000" />
    </TouchableOpacity>
  );
}

const MemoizedBackButton = React.memo(BackButton);

const BackButtonMemo = (props: IButtonProps) => <MemoizedBackButton {...props} />;

export { BackButtonMemo as BackButton };
