import { ImagePickerAsset } from 'expo-image-picker';

export type RegisterType = {
  username: string;
  name: string;
  email: string;
  password: string;
  cpf?: string;
  cnpj?: string;
  phone_number?: string;
  avatar?: ImagePickerAsset;
};
