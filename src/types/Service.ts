export interface Information {
  id: number
  food_recomendation: string
}

export interface FormInformation {
  food_recomendation: string
}

export interface Order {
  id: number
  order_code: string
  user_name: string
  user_id: string
  service_name: string
  service_id: string
  total_price: string
  total_price_raw: number
}

export interface Member {
  id: number
  expired_at: string
  expired_at_result: string
  user_name: string
  user_id: string
  service_name: string
  service_id: string
}

export interface FormOrder {
  order_code: string
  user_id: string
  service_id: string
  users: {
    id: number
    name: string
  }[]
  services: {
    id: number
    name: string
  }[]
}

export interface FormMember {
  expired_at: string
  user_id: string
  service_id: string
  users: {
    id: number
    name: string
  }[]
  services: {
    id: number
    name: string
  }[]
}

export interface Service {
  id: number
  name: string
  price: string
  price_raw: string
  type: string
  duration_months: string
  duration_months_raw: string
}

export interface FormService {
  name: string
  price: string
  type: string
  duration_months: string
  dialog: boolean
}
