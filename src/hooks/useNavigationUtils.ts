import { Platform } from 'react-native';

import { NavigationProp } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

export const useNavigationUtils = (navigation: NavigationProp<any>) => {
  const theme = useTheme();

  const showTabBar = () => {
    if (navigation?.getParent) {
      const isFocused = navigation?.getParent()?.isFocused();

      if (!isFocused) {
        return;
      }

      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          backgroundColor: theme?.colors?.white,
          minHeight: 64,
          paddingTop: Platform.OS === 'android' ? 0 : 12,
          justifyContent: 'space-between',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.58,
          shadowRadius: 10,
          elevation: 24,
        },
      });
    } else if (navigation?.setOptions) {
      const isFocused = navigation?.getParent()?.isFocused();

      if (!isFocused) {
        return;
      }

      navigation?.setOptions({
        tabBarStyle: {
          display: 'flex',
          backgroundColor: theme?.colors?.white,
          minHeight: 64,
          paddingTop: Platform.OS === 'android' ? 0 : 12,
          justifyContent: 'space-between',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.58,
          shadowRadius: 10,
          elevation: 24,
        },
      });
    }
  };

  const hideTabBar = () => {
    if (navigation?.getParent) {
      const isFocused = navigation?.getParent()?.isFocused();

      if (!isFocused) {
        console.warn(
          `Cannot set params for screen '${
            navigation.getState()?.routeNames[navigation.getState()?.index]
          }'. The screen is not focused.`
        );
        return;
      }

      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    } else if (navigation?.setOptions) {
      const isFocused = navigation?.isFocused();

      if (!isFocused) {
        console.warn(
          `Cannot set params for screen '${
            navigation.getState()?.routeNames[navigation.getState()?.index]
          }'. The screen is not focused.`
        );
        return;
      }

      navigation?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }
  };

  return { hideTabBar, showTabBar };
};
