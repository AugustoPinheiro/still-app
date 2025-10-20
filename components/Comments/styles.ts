import { Dimensions } from 'react-native';
import { normalize } from 'react-native-elements';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const photoSize = 32;

export const Container = styled.View`
  flex: 1;
  gap: 20px;
`;

export const Content = styled.View`
  flex: 1;
  background-color: red;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const CommentInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  /* width: ${Dimensions.get('window').width - 40 - 40 - 8}px; */
  width: 100%;
  gap: 8px;

  padding: 16px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.white};
  shadow-color: ${({ theme }) => theme.colors.primary_black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const UserPhoto = styled(Image)`
  width: ${normalize(40)}px;
  height: ${normalize(40)}px;
  border-radius: ${normalize(20)}px;
  background-color: ${({ theme }) => theme.colors.gray04};
  margin-right: 8px;
`;

export const WrapperInput = styled.View`
  flex: 1;
`;

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const ProfilePhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;

export const OptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
`;

export const EmptyListText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;
