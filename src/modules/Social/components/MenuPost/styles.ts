import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Option = styled.TouchableOpacity<{noBorder?: boolean}>`
  flex-direction: row;
  align-items: center;
  border-bottom-width: ${({noBorder}) => noBorder ? 0 : 1}px;
  border-bottom-color:  ${({ theme }) => theme.colors.gray05};
`;

export const OptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 21px;
  text-transform: uppercase;
  text-align: center;
  padding: 16px 0;
  width: 100%;
`;
