import styled, { css } from 'styled-components/native';

export const Wrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})<{ full?: boolean }>`
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;

  ${({ full }) =>
    !full &&
    css`
      padding: 20px;
    `}

  z-index: 12;
`;

export const Outside = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(27, 29, 31, 0.4);

  z-index: 10;
`;

export const Modal = styled.View<{ full?: boolean }>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 16px;

  ${({ full }) =>
    !full &&
    css`
      padding: 48px 20px;
    `}
`;
