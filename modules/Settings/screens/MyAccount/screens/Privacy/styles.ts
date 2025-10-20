import { Platform } from 'react-native';

import { styled } from 'styled-components/native';

export const ContainerDefault = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
`;

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};

  margin-bottom: 20px;
`;

export const PermissionsContainer = styled.View`
  justify-content: space-between;
`;

export const Permission = styled.View`
  margin-bottom: 32px;
`;

export const BlockedButton = styled.TouchableOpacity``;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  height: 21px;
`;

export const HeaderText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const PermissionDescription = styled.Text`
  max-width: 70%;
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const BlockedContainer = styled.View`
  margin-top: 22px;
`;

export const PermissionSwitch = styled.Switch.attrs(({ theme, value }) => ({
  ios_backgroundColor: value ? theme.colors.primary_black : theme.colors.gray05,
  trackColor: {
    false: Platform.OS === 'ios' ? theme.colors.white : theme.colors.gray05,
    true: theme.colors.primary_black,
  },
  thumbColor: theme.colors.white,
}))`
  ${Platform.OS === 'ios'
    ? ({ theme, value }) => `
    transform: scale(0.5) translateX(10px) translateY(-5px);
    background-color: ${value ? theme.colors.primary_black : theme.colors.gray05};
  `
    : ``}
`;
