import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const NotificationContainer = styled.TouchableOpacity`
  margin-right: 32px;
`;

export const IconFlag = styled.View`
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

export const Icon = styled(MaterialCommunityIcons)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.primary_black};
  font-size: 24px;
`;
