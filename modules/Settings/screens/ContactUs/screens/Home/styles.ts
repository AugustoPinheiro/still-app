import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;
export const Container = styled.View`
  flex: 1;
`;

export const OutContent = styled.View`
  background-color: #f8f9fa;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  gap: 7px;
`;

export const OutText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  text-align: center;

  padding: 30px 50px;
`;

export const Form = styled.View`
  flex: 1;
  margin-top: 19px;
  padding: 0 20px;

  /* gap: 16px; */
`;

export const ButtonContainer = styled.View`
  flex: 1;
  padding: 0 20px;
  justify-content: flex-end;
`;
