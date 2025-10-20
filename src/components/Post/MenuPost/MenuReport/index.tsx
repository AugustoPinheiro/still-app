import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { reportReasonList } from '@/modules/Social/services/social.services';

import { MenuReportInput } from './MenuReportInput';
import * as S from './styles';

interface IMenuReportProps {
  post?: {
    id: string;
  };
  user?: string;
  type?: 'post' | 'profile';
}

export function MenuReport({ post, user, type }: IMenuReportProps) {
  const { expand, setBottomSheetProps } = useBottomSheet();

  function handleOpenMenuPost(
    id: string,
    reason: {
      id: string;
      description: string;
      name: 'string';
    }
  ) {
    setBottomSheetProps({
      id: 'MenuReportInput',
      content: <MenuReportInput id={post?.id} reason={reason} isProfile={!!user} />,
      snapPoints: ['60%'],
    });
    expand();
  }

  const { data, isLoading } = useQuery({
    queryKey: ['anotherClosetUserByUsernameReports'],
    queryFn: async () => await reportReasonList(),
  });

  const reports = data?.filter((item) => item?.type === type);

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      <S.Title>Denunciar postagem</S.Title>
      <S.ScrollContainer>
        {reports?.map((item) => (
          <S.Option
            onPress={() => {
              if (user) {
                handleOpenMenuPost(user, item);
                return;
              }
              handleOpenMenuPost(item.id, item);
            }}
            key={item.id}
          >
            <S.OptionText>{item.name}</S.OptionText>
            <S.OptionTextSmaller>{item.description}</S.OptionTextSmaller>
          </S.Option>
        ))}
      </S.ScrollContainer>
    </S.Container>
  );
}
