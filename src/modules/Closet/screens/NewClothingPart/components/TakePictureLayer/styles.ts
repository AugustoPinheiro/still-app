import styled from 'styled-components/native';

import AddPhotoIcon from '@/assets/images/addPhotoIcon.svg';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_black};
  flex: 1;

  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Icon = styled(AddPhotoIcon)`
  font-size: ${({ theme }) => theme.fontSizes.XL}px;
  color: ${({ theme }) => theme.colors.white};
`;
