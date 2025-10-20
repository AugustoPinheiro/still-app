import { Animated } from 'react-native';

import { styled } from 'styled-components/native';

type ProgressBarProps = {
  progress?: number;
};

export const ProgressBarContainer = styled.View`
  width: 100%;
  height: 9px;
  background-color: ${({ theme }) => theme.colors.red04};
  border-radius: 4px;
`;

export const ProgressBar = styled(Animated.View)<ProgressBarProps>`
  /* width: ${({ progress }) => progress ?? 0}%; */
  height: 9px;
  background-color: ${({ theme }) => theme.colors.primary_red};
  border-radius: 4px;
`;
