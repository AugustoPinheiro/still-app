import React from "react";
import { Linking } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/Button";

import { NotificationType } from "../NotificationsListByDate";
import * as S from "./styles";
import { useDeepLink } from "@/hooks/useDeepLink";

interface INotificationsProps {
  notification: NotificationType;
}

export function NotificationsRow({ notification }: INotificationsProps) {
  const navigation = useNavigation();
  const { deepLink } = useDeepLink();

  const formatDistanceOptions = {
    locale: {
      ...ptBR,
      formatDistance: (unit: string, count: number) => {
        switch (true) {
          case unit === "xDays":
            return `${count}d`;

          case unit === "xHours":
            return `${count}h`;

          case unit === "xMinutes":
            return `${count}min`;

          case unit === "xMonths":
            return `${count}M`;

          case unit === "xSeconds":
            return `${count}s`;

          case unit === "xYears":
            return `${count}y`;
        }

        return "%d hours";
      },
    },
  };

  function handlePressNotification() {
    console.log(notification?.type, "Notification Type");

    switch (notification?.type) {
      case "like":
      case "comment":
      case "tagged":
      case "tagged_in_comment":
        // @ts-expect-error
        navigation.navigate("Feed", {
          screen: "SocialPostDetails",
          params: {
            postId: notification?.object_id,
          },
        });
        break;
      case "suggestion":
        // @ts-expect-error

        console.log(notification?.object_id, "Suggestion");
        navigation.navigate("Suggestions", {
          screen: "AllSuggestions",
        });
        break;
      default:
        break;
    }
  }

  const firstProfile = notification?.people[0];

  function handlePressProfile(profile) {
    // @ts-expect-error
    navigation.navigate("Feed", {
      screen: "AnotherUserProfile",
      params: {
        username: profile,
        from: "Feed",
      },
    });
  }

  return (
    <S.Container>
      <S.Content>
        <S.InfoAndActionsContainer>
          <S.UserDataContainer>
            <S.Clickable
              key={`${notification?.id}_${firstProfile?.username}`}
              onPress={() => handlePressProfile(firstProfile?.username)}
            >
              <S.UserPhoto
                source={{ uri: notification?.people[0]?.avatar }}
                cachePolicy="disk"
              />
            </S.Clickable>
            <S.TextContainer>
              {notification?.related_profiles?.map((profile, index) => (
                <S.Clickable
                  key={`${notification?.id}_${profile}`}
                  onPress={() => {
                    handlePressProfile(profile);
                  }}
                >
                  <S.AtNameText>
                    {index < notification?.related_profiles?.length - 1
                      ? `${profile},`
                      : profile}
                  </S.AtNameText>
                </S.Clickable>
              ))}

              <S.Description>{notification?.text}</S.Description>
              {notification?.created_at ? (
                <S.TimeText>
                  {formatDistanceToNowStrict(
                    new Date(notification?.created_at),
                    formatDistanceOptions
                  )}
                </S.TimeText>
              ) : (
                <></>
              )}
            </S.TextContainer>
            {notification?.image ? (
              <S.Clickable onPress={handlePressNotification}>
                <S.NotificationPhoto
                  source={{ uri: notification?.image }}
                  cachePolicy="disk"
                />
              </S.Clickable>
            ) : (
              <></>
            )}
          </S.UserDataContainer>
        </S.InfoAndActionsContainer>
        <S.ContainerButtons>
          {notification?.cta?.length ? (
            notification?.cta?.map((notif) => (
              <S.ButtonContainer
                key={notif?.url}
                isOnlyOne={notification?.cta?.length === 1}
              >
                <Button
                  title={notif?.text}
                  type={notif?.primary ? "primary" : "secondary"}
                  weight="flat"
                  marginBottom={0}
                  onPress={() => deepLink(notif?.url)}
                />
              </S.ButtonContainer>
            ))
          ) : (
            <></>
          )}
        </S.ContainerButtons>
      </S.Content>
    </S.Container>
  );
}
