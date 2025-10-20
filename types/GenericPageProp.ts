import { NavigationProp, RouteProp } from '@react-navigation/native';

export type GenericPageProp<T = any, T2 = any> = {
  navigation: NavigationProp<T | any>;
  route: RouteProp<T2 | any>;
};
