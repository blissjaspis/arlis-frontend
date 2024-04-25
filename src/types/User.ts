export interface Users {
  id: number
  name: string
  email: string
  address: string | null
  phone_number: string | null
  join: string
}

export interface FormUsers {
  name: string
  email: string
  password: string
  address: string
  phone_number: string
  dialog: boolean
}
