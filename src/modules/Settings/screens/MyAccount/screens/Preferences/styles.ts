import FeatherIcon from '@expo/vector-icons/Feather';
import styled from 'styled-components/native';

import { Button } from '@/components/Button';

export const ContainerDefault = styled.View`
  flex: 1;
  padding: 20px 20px 0;
  background-color: white;
`;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  showsVerticalScrollIndicator: false,
})``;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const HeaderDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};

  margin-top: 6px;
`;

export const TagsContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  showsVerticalScrollIndicator: false,
})`
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 400px;

  margin-top: 26px;
`;

export const ButtonSave = styled(Button)`
  margin-top: 44px;
`;

export const StyleTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};

  margin-top: 44px;
`;

export const StyleValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.gray02};

  margin-top: 6px;
`;

export const QuestionnaireButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 28px;
  margin-bottom: 28px;
`;

export const QuestionnaireButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const QuestionnaireButtonIcon = styled(FeatherIcon).attrs(({ theme }) => ({
  name: 'arrow-right',
  size: 20,
  color: theme.colors.primary_black,
}))``;
