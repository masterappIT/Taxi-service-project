import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTripStore = defineStore('trip', () => {
  const activeTrip = ref<{ origin: string; destination: string } | null>(null)

  function setRoute(origin: string, destination: string) {
    activeTrip.value = { origin, destination }
  }

  return { activeTrip, setRoute }
})
