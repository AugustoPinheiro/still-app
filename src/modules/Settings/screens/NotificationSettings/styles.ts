import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

export const Section = styled.View`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSize.LG};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSize.SM};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 16px;
  line-height: 20px;
`;

export const StatusCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StatusRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 8px;
`;

export const StatusLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSize.MD};
  color: ${({ theme }) => theme.colors.text};
`;

export const StatusValue = styled.Text<{ hasPermission: boolean }>`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSize.SM};
  color: ${({ hasPermission, theme }) => 
    hasPermission ? theme.colors.success : theme.colors.error};
`;

export const SwitchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const SwitchLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSize.MD};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  margin-right: 16px;
`;

export const LoadingText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSize.MD};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 50px;
`; 