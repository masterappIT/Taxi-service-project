import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Vehicle } from '../types/vehicle'

export const useTripStore = defineStore('trip', () => {
  const activeTrip = ref<{ origin: string; destination: string } | null>(null)
  const departureTime = ref('')
  const chosenVehicle = ref<Vehicle | null>(null)

  function setChosenVehicle(vehicle: Vehicle) {
    chosenVehicle.value = vehicle
  }

  function setRoute(origin: string, destination: string) {
    activeTrip.value = { origin, destination }
  }

  function setDepartureTime(value: string) {
    departureTime.value = value
  }

  return { activeTrip, departureTime, chosenVehicle, setRoute, setDepartureTime, setChosenVehicle }
})
