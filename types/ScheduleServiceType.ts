export type ScheduledServiceType = {
  id: number,
  service_id: number,
  combo_id: number,
  profile_id: number,
  status: number,
  final_price: number,
  approved_by_client: boolean,
  order_id: number,
  created_at: string,
  updated_at: string,
  deleted_at: string,
  service: {
    title: string,
    description: string,
    profile: {
      username: string,
      professional_profile: {
        avatar: string
      }
    }
  },
  steps: Array<ScheduledServiceStepType>
}

export type ScheduledServiceStepType = {
  service_step: {
    title: string,
    description: string,
    duration: number,
    online: boolean
  },
  attachs: Array<AttachType>,
  id: number,
  start: string,
  end: string,
  status: number
}

export type AttachType = {
  id: number,
  service_schedule_step_id: number,
  url: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}