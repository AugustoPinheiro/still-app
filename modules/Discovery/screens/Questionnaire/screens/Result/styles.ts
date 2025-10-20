import { styled } from 'styled-components/native';

export const ResultContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 20px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 0 35px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XL2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;

  text-transform: uppercase;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray03};
  text-align: center;

  line-height: 20px;

  margin-top: 37px;
`;

export const ButtonContent = styled.View`
  width: 100%;

  justify-content: flex-end;
  padding: 20px 20px 24px;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const BottomSheetContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;

  padding: 30px 20px 50px;
  gap: 20px;
`;

export const BottomSheetTextContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 20px;
  justify-content: center;
`;

export const ButtonText = styled.TouchableOpacity`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 20px;
  justify-content: center;
`;

export const BottomSheetText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: justify;
`;

export const BottomSheetTextBold = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
`;
