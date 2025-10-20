import styled from 'styled-components/native';

export const ChatIconButton = styled.TouchableOpacity``;

export const ChatIconFlag = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary_red};
  border: 1.5px solid ${({ theme }) => theme.colors.white};

  position: absolute;
  z-index: 10;
  right: 1px;
  top: 1px;
`;
