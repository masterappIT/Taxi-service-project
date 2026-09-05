import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { TripDraft, ServiceMode } from '../types/trip'
import type { Vehicle } from '../types/vehicle'

const createTripDraft = (serviceMode: ServiceMode): TripDraft => ({
  serviceMode,
  pricingType: serviceMode === 'cross-border' ? 'distance' : 'fixed-charter',
  tripType: serviceMode === 'cross-border' ? 'one-way' : undefined,
  route: { origin: '', destination: '', stops: [] },
  departureTime: '',
  extras: []
})

export const useTripStore = defineStore('trip', () => {
  const serviceMode = ref<ServiceMode>('cross-border')
  const drafts = ref<Record<ServiceMode, TripDraft>>({
    'cross-border': createTripDraft('cross-border'),
    'business-charter': createTripDraft('business-charter')
  })
  const chosenVehicle = ref<Vehicle | null>(null)

  const activeDraft = computed(() => drafts.value[serviceMode.value])
  const activeTrip = computed(() => {
    const { origin, destination } = activeDraft.value.route
    return origin || destination ? { origin, destination } : null
  })
  const departureTime = computed(() => activeDraft.value.departureTime)

  function setChosenVehicle(vehicle: Vehicle) {
    chosenVehicle.value = vehicle
    activeDraft.value.chosenVehicleId = vehicle.id
  }

  function setRoute(origin: string, destination: string) {
    activeDraft.value.route.origin = origin
    activeDraft.value.route.destination = destination
  }

  function setDepartureTime(value: string) {
    activeDraft.value.departureTime = value
  }

  function updateActiveDraft(values: Partial<TripDraft>) {
    const draft = activeDraft.value
    drafts.value[serviceMode.value] = {
      ...draft,
      ...values,
      serviceMode: draft.serviceMode,
      pricingType: draft.pricingType
    }
  }

  function resetDraft(mode: ServiceMode = serviceMode.value) {
    drafts.value[mode] = createTripDraft(mode)
    if (mode === serviceMode.value) chosenVehicle.value = null
  }

  function switchServiceMode(mode: ServiceMode) {
    if (mode === serviceMode.value) return
    resetDraft(serviceMode.value)
    chosenVehicle.value = null
    serviceMode.value = mode
  }

  return {
    serviceMode,
    drafts,
    activeDraft,
    activeTrip,
    departureTime,
    chosenVehicle,
    setRoute,
    setDepartureTime,
    setChosenVehicle,
    updateActiveDraft,
    resetDraft,
    switchServiceMode
  }
})
