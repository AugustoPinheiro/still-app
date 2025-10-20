import { type AppStackParamList } from '@/routes/app.types';
import { OrderType } from '@/types/OrderType';
import { ScheduledServiceStepType, ScheduledServiceType } from '@/types/ScheduleServiceType';

export type ProfileStackParamList = AppStackParamList & {
  User: undefined;
  Settings: undefined;
  MyAgenda: undefined;
  Follows: {
    username: string;
    activeTab: number;
  };
  Archive: undefined;
  AnotherUser: {
    username: string;
    id: string;
  };
  ProfileListClosetByCategoryAnotherUser: undefined;
  ProfileListClosetByCategory: undefined;
  ProfileClothingDetails: undefined;
  ProfileClothingDetailsStore: undefined;
  ProfilePostDetails: undefined;
  ProfileListSaves: undefined;
  Orders: undefined;
  PayOrder: OrderType;
  MyServices: undefined;
  ServiceDetail: ScheduledServiceType;
  ServiceStepDetail: ScheduledServiceStepType;
  CardForm: undefined;
};
