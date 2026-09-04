import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { VehicleCardData } from '../components/vehicles/VehicleCard.vue'

const VEHICLE_STORAGE_KEY = 'taxi-selected-vehicle'
const readStoredVehicle = (): VehicleCardData | null => {
  const stored = uni.getStorageSync(VEHICLE_STORAGE_KEY)
  return stored && typeof stored === 'object' && typeof stored.id === 'string' ? stored as VehicleCardData : null
}

export const useTripStore = defineStore('trip', () => {
  const activeTrip = ref<{ origin: string; destination: string } | null>(null)
  const departureTime = ref('')
  const selectedVehicle = ref<VehicleCardData | null>(readStoredVehicle())

  function setRoute(origin: string, destination: string) {
    activeTrip.value = { origin, destination }
  }

  function setDepartureTime(value: string) {
    departureTime.value = value
  }

  function setSelectedVehicle(value: VehicleCardData) {
    selectedVehicle.value = value
    uni.setStorageSync(VEHICLE_STORAGE_KEY, value)
  }

  return { activeTrip, departureTime, selectedVehicle, setRoute, setDepartureTime, setSelectedVehicle }
})
