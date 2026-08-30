export type Region = 'HK' | 'MACAU' | 'GUANGDONG'

export interface CrossBorderTrip {
  id: string
  origin: string
  destination: string
  region: Region
  scheduledAt: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}
