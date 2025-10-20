export type OrderType = {
  id: number,
  pagarme_order_id?: string,
  status: string,
  process_date: Date,
  amount: number,
  max_installments: number,
  installments: number,
  profile_id: number,
  charges?: Array<ChargeType>,
  profile?: {
    username: string
  },
  service_schedule: {
    id: number, 
    service: { 
      title: string,
      profile: {
        professional_profile: {
          avatar: string
        }, 
        username: string
      }
    },
  }[]
}

export type ChargeType = {
  id: number,
  amount: number,
  charge_date: string | Date,
  status: string,
  pagarme_charge_id?: string,
  pagarme_last_transaction_id?: string
}

export type PayOrderType = {
  profile_id: number,
  card_id: number,
  installments: number,
}