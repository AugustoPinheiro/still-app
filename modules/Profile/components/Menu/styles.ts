import MaterialCIcon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 32px;
  justify-content: space-between;
`;

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const OptionIcon = styled(MaterialCIcon)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray04};
`;

export const OptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
`;

export const Icon = styled(MaterialCommunityIcons)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme?.colors.gray04};
  font-size: 24px;
`;
