import type { CrossBorderTrip } from '../../../shared/types/trip'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export async function getHealth(): Promise<{ status: string }> {
  const response = await uni.request({ url: `${API_BASE_URL}/health` })
  return response.data as { status: string }
}

export type AppSettings = { language: string; region: string; currency: string }

export async function getSettings(): Promise<AppSettings> {
  const response = await uni.request({ url: `${API_BASE_URL}/settings` })
  return response.data as AppSettings
}

export async function updateSettings(settings: AppSettings): Promise<AppSettings> {
  const response = await uni.request({ url: `${API_BASE_URL}/settings`, method: 'POST', data: settings })
  return response.data as AppSettings
}

export type LocationDetails = { city: string; address: string; district?: string }

export async function reverseGeocode(latitude: number, longitude: number): Promise<LocationDetails> {
  const response = await uni.request({ url: `${API_BASE_URL}/location/reverse-geocode`, data: { latitude, longitude } })
  return response.data as LocationDetails
}

export type { CrossBorderTrip }
