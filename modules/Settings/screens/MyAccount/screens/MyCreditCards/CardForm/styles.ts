import { css, styled } from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px 10px 10px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22px;
  text-transform: uppercase;
  text-align: center;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
  margin-bottom: 22px;
`;

export const Form = styled.View`
  flex: 1;
  margin-top: 25px;
`;

export const FormRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const FormRowItem = styled.View`
  flex-basis: 48%;
`;

export const ButtonContent = styled.View`
  width: 100%;
  justify-content: flex-end;
  padding: 0 20px;
  margin-top: 52px;
`;