import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Wrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    minHeight: '100%',
  },
})`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 30px 20px;
  align-items: center;
  gap: 21px;
`;

export const ProfileAvatar = styled(Image)`
  width: 74px;
  height: 74px;
  border-radius: 38px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const RatingContainer = styled.View`
  margin-top: 14px;
`;

export const RatingText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const Section = styled.View`
  margin-top: 50px;
  width: 100%;
`;

export const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  width: 100%;
`;
