export type CreditCard = {
  id: number,
  first_six_digits: string,
  last_four_digits: string,
  brand: 'Elo' | 'Mastercard' | 'Visa' | 'Amex' | 'Jcb' | 'Aura' | 'Hipercard' | 'Diners' | 'Unionpay' | 'Discover',
  holder_name: string,
  holder_document: string,
  exp_month: number,
  exp_year: number,
  status: 'active' | 'deleted' | 'expired',
  type: 'credit' | 'voucher',
  metadata?: Object
}

export type CreateCard = {
  phone_number: string,
  holder_name: string,
  holder_document: string,
  number: string,
  exp_month: number,
  exp_year: number,
  cvv: string,
  billing_address: {
    line_1: string,
    line_2: string,
    zip_code: string,
    city: string,
    state: string,
    country: string,
  },
}

export type ResponseCreateCard = {
  id: number;
  provider_payment_id: string;
  profile_id: number;
  main: boolean;
}