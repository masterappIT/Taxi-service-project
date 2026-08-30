import type { CrossBorderTrip } from '../../../shared/types/trip'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export async function getHealth(): Promise<{ status: string }> {
  const response = await uni.request({ url: `${API_BASE_URL}/health` })
  return response.data as { status: string }
}

export type { CrossBorderTrip }
