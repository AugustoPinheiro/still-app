import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray06};
  align-items: 'center';
  justify-content: 'center';
`;

export const PictureImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;
