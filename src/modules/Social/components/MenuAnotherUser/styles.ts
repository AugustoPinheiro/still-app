import MaterialCIcon from '@expo/vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 32px 0;
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

export const Divider = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.gray05};
  width: 100%;
`;

export const OptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
  width: 100%;
  text-align: center;
`;
