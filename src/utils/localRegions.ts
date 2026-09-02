export type LocalRegion = {
  region: string
  district: string
}

type RegionCenter = LocalRegion & {
  latitude: number
  longitude: number
}

const regionCenters: RegionCenter[] = [
  { region: '香港', district: '中西區', latitude: 22.282, longitude: 114.154 },
  { region: '香港', district: '灣仔區', latitude: 22.277, longitude: 114.183 },
  { region: '香港', district: '東區', latitude: 22.284, longitude: 114.225 },
  { region: '香港', district: '南區', latitude: 22.247, longitude: 114.158 },
  { region: '香港', district: '油尖旺區', latitude: 22.312, longitude: 114.17 },
  { region: '香港', district: '深水埗區', latitude: 22.331, longitude: 114.163 },
  { region: '香港', district: '九龍城區', latitude: 22.329, longitude: 114.191 },
  { region: '香港', district: '黃大仙區', latitude: 22.342, longitude: 114.195 },
  { region: '香港', district: '觀塘區', latitude: 22.313, longitude: 114.226 },
  { region: '香港', district: '葵青區', latitude: 22.354, longitude: 114.126 },
  { region: '香港', district: '荃灣區', latitude: 22.371, longitude: 114.114 },
  { region: '香港', district: '屯門區', latitude: 22.391, longitude: 113.973 },
  { region: '香港', district: '元朗區', latitude: 22.445, longitude: 114.022 },
  { region: '香港', district: '北區', latitude: 22.494, longitude: 114.139 },
  { region: '香港', district: '大埔區', latitude: 22.45, longitude: 114.169 },
  { region: '香港', district: '沙田區', latitude: 22.387, longitude: 114.195 },
  { region: '香港', district: '西貢區', latitude: 22.381, longitude: 114.27 },
  { region: '香港', district: '離島區', latitude: 22.262, longitude: 113.946 },
  { region: '澳門', district: '澳門半島', latitude: 22.199, longitude: 113.546 },
  { region: '澳門', district: '氹仔', latitude: 22.157, longitude: 113.557 },
  { region: '澳門', district: '路環', latitude: 22.119, longitude: 113.56 },
  { region: '中國內地', district: '深圳市南山區', latitude: 22.533, longitude: 113.93 },
  { region: '中國內地', district: '深圳市福田區', latitude: 22.541, longitude: 114.055 },
  { region: '中國內地', district: '深圳市羅湖區', latitude: 22.555, longitude: 114.131 },
  { region: '中國內地', district: '深圳市寶安區', latitude: 22.681, longitude: 113.883 },
  { region: '中國內地', district: '深圳市龍崗區', latitude: 22.72, longitude: 114.247 },
  { region: '中國內地', district: '深圳市龍華區', latitude: 22.656, longitude: 114.03 },
  { region: '中國內地', district: '深圳市鹽田區', latitude: 22.557, longitude: 114.236 },
  { region: '中國內地', district: '深圳市坪山區', latitude: 22.69, longitude: 114.35 },
  { region: '中國內地', district: '深圳市光明區', latitude: 22.748, longitude: 113.936 },
  { region: '中國內地', district: '珠海市香洲區', latitude: 22.266, longitude: 113.544 },
  { region: '中國內地', district: '珠海市斗門區', latitude: 22.209, longitude: 113.297 },
  { region: '中國內地', district: '珠海市金灣區', latitude: 22.047, longitude: 113.363 },
  { region: '中國內地', district: '廣州市中心城區', latitude: 23.129, longitude: 113.264 },
  { region: '中國內地', district: '佛山市中心城區', latitude: 23.021, longitude: 113.122 },
  { region: '中國內地', district: '東莞市', latitude: 23.02, longitude: 113.752 },
  { region: '中國內地', district: '惠州市', latitude: 23.112, longitude: 114.416 },
  { region: '中國內地', district: '中山市', latitude: 22.517, longitude: 113.392 },
  { region: '中國內地', district: '江門市', latitude: 22.579, longitude: 113.082 },
  { region: '中國內地', district: '肇慶市', latitude: 23.047, longitude: 112.465 },
]

const distanceSquared = (latitude: number, longitude: number, center: RegionCenter) => {
  const longitudeScale = Math.cos((latitude * Math.PI) / 180)
  return (latitude - center.latitude) ** 2 + ((longitude - center.longitude) * longitudeScale) ** 2
}

export const findLocalRegion = (latitude: number, longitude: number): LocalRegion | null => {
  const inHongKong = latitude >= 22.15 && latitude <= 22.58 && longitude >= 113.82 && longitude <= 114.46
  const inMacau = latitude >= 22.09 && latitude <= 22.23 && longitude >= 113.52 && longitude <= 113.61
  const inGreaterBayArea = latitude >= 21.7 && latitude <= 23.95 && longitude >= 112.25 && longitude <= 115.0
  if (!inHongKong && !inMacau && !inGreaterBayArea) return null

  const region = inMacau ? '澳門' : inHongKong ? '香港' : '中國內地'
  const candidates = regionCenters.filter((center) => center.region === region)
  const closest = candidates.reduce((best, center) =>
    distanceSquared(latitude, longitude, center) < distanceSquared(latitude, longitude, best) ? center : best,
  )
  return { region: closest.region, district: closest.district }
}
