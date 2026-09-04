export interface Vehicle {
  id: string
  brand?: string
  model?: string
  series?: string
  seats: number
  price: number
  image: string
  imageClass?: string
  doubleImage?: boolean
  selectable?: boolean
  modelChoice?: boolean
}
