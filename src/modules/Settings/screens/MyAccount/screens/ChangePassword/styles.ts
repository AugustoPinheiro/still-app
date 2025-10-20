import { Platform } from 'react-native';

import styled from 'styled-components/native';

export const DefaultContainer = styled.View`
  flex: 1;
  padding: 20px 20px 0;
  background-color: white;
`;

export const Form = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  padding-top: 40px;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  margin: 0 0 40px;
`;

export const InputContainer = styled.View`
  /* margin-top: 20px; */
`;

export const ButtonContent = styled.View`
  width: 100%;
  padding: 0 20px 20px;
  flex: 1;
  justify-content: flex-end;
`;
