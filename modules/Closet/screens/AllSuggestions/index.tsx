import React, { useEffect } from "react";
import { FlatList } from "react-native";

import { useInfiniteQuery } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Loading } from "@/components/Loading";
import { useToast } from "@/contexts/Toast.contexts";
import { useCloset } from "@/modules/Closet/contexts/closet.contexts";
import { ClosetLookType } from "@/types/ClosetLookType";

import {
  deleteClosetLook,
  putClosetLook,
} from "../../services/closet.services";
import * as S from "./styles";

export function AllSuggestions() {
  const { show } = useToast();

  const { fetchClosetLooksSuggestions } = useCloset();

  const formatDistanceOptions = {
    locale: {
      ...ptBR,
      formatDistance: (unit: string, count: number) => {
        switch (true) {
          case unit === "xDays":
            return `${count} dia${count > 1 ? "s" : ""}`;

          case unit === "xHours":
            return `${count} hora${count > 1 ? "s" : ""}`;

          case unit === "xMinutes":
            return `${count} min`;

          case unit === "xMonths":
            return `${count} ${count > 1 ? "meses" : "mês"}`;

          case unit === "xSeconds":
            return `${count} s`;

          case unit === "xYears":
            return `${count} ano${count > 1 ? "s" : ""}`;
        }

        return "%d horas";
      },
    },
  };

  const [isLoading, setIsLoading] = React.useState(false);
  let [looksSuggestions, setLooksSuggestions] = React.useState<any[]>();

  const { data, isFetching, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["looksSuggestions"],
      queryFn: fetchClosetLooksSuggestions,
      getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    });

  looksSuggestions = React.useMemo(
    () => data?.pages?.flatMap((page: any) => page?.result ?? []) ?? [],
    [data]
  );

  useEffect(() => {
    refetch();
    setLooksSuggestions(looksSuggestions);
  }, []);

  const onAccept = async (item: ClosetLookType, index: number) => {
    try {
      setIsLoading(true);
      await putClosetLook(item.id, {
        approved: true,
        clothings: item.items.map((item) => item.clothing_id),
      });
      const filteredData = looksSuggestions?.splice(index, 1);
      setLooksSuggestions(filteredData);
      refetch();
    } catch (error) {
      show({ type: "error", message: "Erro ao salvar o look" });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDecline = async (item: ClosetLookType, index: number) => {
    try {
      setIsLoading(true);
      await deleteClosetLook([item.id]);
      const filteredData = looksSuggestions?.splice(index, 1);
      setLooksSuggestions(filteredData);
      refetch();
    } catch (error) {
      show({ type: "error", message: "Erro ao salvar o look" });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (!isLoading && !isFetching && !looksSuggestions?.length) {
    return (
      <S.ContainerEmpty>
        <S.EmptyTitle>
          Você ainda não recebeu nenhuma sugestão de look.
        </S.EmptyTitle>
      </S.ContainerEmpty>
    );
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>SUGERIDO POR</S.Title>
        <FlatList
          data={looksSuggestions}
          extraData={looksSuggestions}
          keyExtractor={(item: ClosetLookType) => String(item.id)}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item, index }) => (
            <S.Card key={item.id}>
              <S.CardTop>
                <S.CardTopRow>
                  <S.UserPhoto
                    source={{
                      uri:
                        item.made_by?.common_profile?.avatar ||
                        item.made_by?.professional_profile?.avatar,
                    }}
                  />
                  <S.CardTitle>@{item.made_by?.username}</S.CardTitle>
                  <S.CardTime>
                    Há{" "}
                    {formatDistanceToNowStrict(
                      new Date(item.created_at ? item.created_at : ""),
                      formatDistanceOptions
                    )}
                  </S.CardTime>
                </S.CardTopRow>
              </S.CardTop>
              <S.CardImageContainer>
                <S.CardImage
                  source={{ uri: item.image }}
                  recyclingKey={item.image}
                  contentFit="contain"
                  cachePolicy="disk"
                />
              </S.CardImageContainer>
              <S.floatIconContainer1
                onPress={async () => await onDecline(item, index)}
              >
                <S.FloatIcon1 name="close" />
              </S.floatIconContainer1>
              <S.floatIconContainer2
                onPress={async () => await onAccept(item, index)}
              >
                <S.FloatIcon2 name="check" />
              </S.floatIconContainer2>
            </S.Card>
          )}
          onEndReached={() => {
            if (isFetching || !hasNextPage) return;
            fetchNextPage();
          }}
          showsVerticalScrollIndicator={true}
        />
      </S.Container>
    </S.Wrapper>
  );
}
