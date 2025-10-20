import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px 20px 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22px;
  text-transform: uppercase;
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray04};
  margin-top: 12px;
`;

export const Form = styled.View`
  flex: 1;
  margin-top: 52px;
  align-items: center;
`;

export const FormRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonContent = styled.View`
  width: 100%;
  justify-content: flex-end;
  padding: 0 20px;
  margin-top: 52px;
`;

export const SuccessWrapper = styled.View`
  align-items: center;
`;

export const TitleSuccess = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22px;
  text-transform: uppercase;
  text-align: center;

  margin-top: 145px;
  margin-bottom: 65px;
`;

export const SubtitleSuccess = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};

  margin-top: 25px;
`;

export const ContainerPhoto = styled.View`
  flex: 1;
`;

export const TitlePhoto = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22px;
  text-transform: uppercase;
  text-align: center;

  margin-top: 25px;
  margin-bottom: 65px;
`;

export const PhotoName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;

  margin-top: 21px;
`;

export const SubtitlePhoto = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;

  margin-top: 65px;
`;
