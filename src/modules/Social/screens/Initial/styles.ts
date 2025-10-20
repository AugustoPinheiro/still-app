import { Platform } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styled } from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ContentLook = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px 20px;
`;

export const Header = styled.View`
  background-color: transparent;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  padding-top: ${Platform.OS === 'android' ? 50 : 10}px;
  z-index: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  elevation: 5;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.05);
`;

export const LogoContainer = styled.View`
  width: 100px;
  height: 24px;
  align-items: flex-start;
`;

export const NameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22.5px;
  text-align: center;

  margin-top: 66px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 24px;
  text-align: left;
`;

export const IconsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const NotificationContainer = styled.TouchableOpacity`
  margin-right: 32px;
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

export const Icon = styled(MaterialCommunityIcons)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.primary_black};
  font-size: 24px;
`;

export const HomologText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
`;
