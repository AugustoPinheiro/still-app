import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  margin-top: 2px;
`;

export const ModalContainer = styled.View`
  gap: 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
  padding: 0 36px;
`;

export const ButtonContainer = styled.View``;

export const WrapperLoading = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 60,
    paddingTop: 24,
  },
})`
  /* flex: 1; */
  padding: 0 20px;
`;

export const ContainerEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  min-height: 350px;
`;

export const EmptyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
`;
