import styled from 'styled-components/native';

export const ContentLook = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px 20px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 24px;
  text-align: left;
`;

export const MyLookContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_off_white};
  padding: 16px;
  margin: 24px 0px;
  border-radius: 8px;
`;

export const MyLookRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleLook = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
  line-height: 15px;
  text-align: left;
`;

export const SubtitleLook = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
  text-align: left;
  margin-top: 8px;
  margin-bottom: 16px;
`;
