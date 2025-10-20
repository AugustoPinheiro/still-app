import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 60,
  },
})`
  /* flex: 1; */
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const ModalContainer = styled.View`
  gap: 20px;
`;

export const TitleModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const TextModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
  padding: 0 36px;
`;

export const ButtonContainer = styled.View`
  margin-top: 20px;
  padding: 0 8px;
`;

export const ButtonBottomContainer = styled.View`
  padding: 16px 38px 0px;
  justify-content: center;
  align-items: center;
`;
