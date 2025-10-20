import { styled } from 'styled-components/native';

export const QuestionnaireContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    marginTop: 16,
    flexGrow: 1,
  },
})``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};

  margin-top: 14px;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};

  margin-top: 12px;
`;

export const AnswerContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-top: 14px;
`;

export const ButtonContent = styled.View`
  width: 100%;

  justify-content: flex-end;
  padding: 20px 0 24px;

  background-color: ${({ theme }) => theme.colors.white};
`;
