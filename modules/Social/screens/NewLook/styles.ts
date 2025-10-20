import FeatherIcon from '@expo/vector-icons/Feather';
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
  padding: 48px 20px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const Icon = styled(FeatherIcon)`
  width: 24px;
  height: 24px;
  font-size: 24px;
  margin-left: 16px;
`;

export const ArrowBackButtonContainer = styled.View`
  position: absolute;
  top: 48px;
  left: 0;
`;

export const ArrowBackButton = styled.TouchableOpacity``;
