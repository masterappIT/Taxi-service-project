import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTripStore = defineStore('trip', () => {
  const activeTrip = ref<{ origin: string; destination: string } | null>(null)
  const departureTime = ref('')

  function setRoute(origin: string, destination: string) {
    activeTrip.value = { origin, destination }
  }

  function setDepartureTime(value: string) {
    departureTime.value = value
  }

  return { activeTrip, departureTime, setRoute, setDepartureTime }
})
