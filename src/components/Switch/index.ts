import { Platform } from 'react-native';

import { styled } from 'styled-components/native';

export const Switch = styled.Switch.attrs(({ theme }) => ({
  ios_backgroundColor: theme.colors.gray05,
}))`
  ${Platform.OS === 'ios' ? `transform: scale(0.5) translateX(10px) translateY(-5px);` : ``}
`;
