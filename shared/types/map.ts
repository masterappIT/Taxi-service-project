export interface MapCoordinate {
  latitude: number
  longitude: number
}

export interface MapPlace {
  address: string
  location: MapCoordinate
  placeId?: string
}

export interface RouteSummary {
  distanceMeters: number
  durationSeconds: number
  polyline?: string
}
