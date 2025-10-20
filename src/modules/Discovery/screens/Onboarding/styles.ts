import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: space-evenly;
`;

export const ButtonContent = styled.View`
  width: 100%;
  padding: 0 20px;
`;
