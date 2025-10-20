import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
})<{ ref?: any }>`
  padding-top: 40px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Form = styled.View`
  padding: 0 20px;
  gap: 16px;
`;

export const SwitchContainer = styled.View`
  margin: 16px 0;
`;

export const SwitchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SwitchDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
`;

export const SwitchText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  line-height: ${({ theme }) => theme.fontSizes.XL}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const FormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

export const FormRowItem = styled.View`
  flex-basis: 48%;
`;

export const ButtonContainer = styled.View`
  margin-top: 32px;
  padding: 0 20px;
`;
