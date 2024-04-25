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
