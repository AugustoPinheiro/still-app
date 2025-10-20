import styled from 'styled-components/native';

import CalendarIcon from '@/assets/images/calendarIcon.svg';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})<{ ref?: any }>`
  padding-top: 20px;
  flex: 1;
  margin-top: 2px;
`;

export const Header = styled.View`
  padding: 32px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTextContainer = styled.View``;

export const HeaderDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
`;

export const HeaderWeekDay = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const ScheduleContainer = styled.View<{ hasLook?: boolean }>`
  /* height: 100%; */
  min-height: 300px;
  width: 100%;
`;

export const Content = styled.View<{ width: number }>`
  width: ${({ width }) => width - 8}px;
  min-height: 387px;
  background-color: ${({ theme }) => theme.colors.gray06};
  align-items: center;
  gap: 28px;
  margin-left: 4px;
  margin-right: 4px;
  padding: 21px 20px;
`;

export const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 28px;
`;

export const PlannerText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
`;

export const Separator = styled.View`
  width: 8px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.primary_black};
  justify-content: center;
  align-items: center;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  elevation: 4;
`;

export const HeaderIconLeft = styled(CalendarIcon).attrs({
  width: 16,
  height: 16,
})``;

export const ModalContainer = styled.View`
  gap: 12px;
  padding: 24px;
`;

export const ModalCloseContainer = styled.View`
  min-width: 100%;
  align-items: flex-end;
`;

export const ModalCloseButton = styled.TouchableOpacity``;

export const ContentIconContainer = styled.TouchableOpacity`
  background-color: #d9d9d9;
  border: 4px solid #ccc9c9;
  border-radius: 50px;
  padding: 3px;
`;
