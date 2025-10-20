import { api } from '@/config/api';

interface RecoverProps {
  email: string;
  code?: string
}

interface SetPassProps {
  password: string;
  token: string
  email: string;
}

export async function passwordReset({ email, code}: RecoverProps): Promise<any> {
   const {data} = await api.post('/users/password-reset', { email, code });
  return data
}

export async function passwordResetSave({ email, token, password}: SetPassProps): Promise<any> {
   const {data} = await api.post('/users/set-password', { email, token, password });
  return data
}

