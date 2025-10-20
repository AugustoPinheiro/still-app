import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const EditButton = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray06};

  position: absolute;
  bottom: -14px;
`;

export const PhotoContent = styled.TouchableOpacity`
  width: 189px;
  height: 189px;
  border-radius: ${189 / 2}px;
  align-items: center;
  justify-content: center;

  background-color: #d5cbcb;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary_black};
`;

export const Photo = styled(Image)`
  width: 186px;
  height: 186px;
  border-radius: ${186 / 2}px;
`;

export const PhotoEmptyContent = styled.TouchableOpacity`
  width: 186px;
  height: 186px;
  border-radius: 93px;
  align-items: center;
  justify-content: center;

  background-color: #d5cbcb;
`;

export const PhotoEmpty = styled.View`
  width: 179px;
  height: 179px;
  border-radius: 90px;

  background-color: #d5cbcb;
  border: 2px dashed ${({ theme }) => theme.colors.neutral};
`;
