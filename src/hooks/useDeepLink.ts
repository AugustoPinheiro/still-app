import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../routes/app.types";
import { AppTabParamList } from "../../routes/tab.types";

// Tipo combinado para navegação
type NavigationProps = NativeStackNavigationProp<
  AppStackParamList & {
    AllSuggestions: {
      screen: string;
    };
    Orders: {
      screen: string;
    };
    MyServices: {
      screen: string;
    };
  }
>;

export const useDeepLink = () => {
  const navigation = useNavigation<NavigationProps>();

  const deepLink = (url: string) => {
    if (!url) return;

    // Tratar URLs do tipo br.com.stillapp://
    if (url.startsWith("br.com.stillapp://")) {
      const path = url.replace("br.com.stillapp://", "");
      const segments = path.split("/");

      const [folder, segment, screen] = segments;

      if (folder === "home") {
        if (segment === "profile") {
          if (screen === "my-services") {
            navigation.navigate("MyServices", {
              screen: "MyServices",
            });
            return;
          }

          if (screen === "orders") {
            navigation.navigate("Orders", {
              screen: "Orders",
            });
            return;
          }
        }

        if (segment === "closet") {
          if (screen === "my-suggestions") {
            return navigation.navigate("AllSuggestions", {
              screen: "AllSuggestions",
            });
          }
        }
      }
    }

    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir URL:", err)
    );
  };

  return { deepLink };
};
