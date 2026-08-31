<template>
  <view class="page">
    <image class="design-art" src="/static/figma-home.svg" mode="widthFix" />
    <image class="topbar-art" src="/static/topbar.svg" mode="widthFix" />
    <!-- #ifdef H5 -->
    <iframe class="google-map" src="https://maps.google.com/maps?q=Hong%20Kong%20West%20Kowloon%20Station&z=12&output=embed" title="Google Maps" loading="lazy" />
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
    <view class="map-fallback" aria-label="地圖預覽" />
    <!-- #endif -->
    <view class="hit hit-location" @click="useCurrentLocation" />
    <view class="hit hit-map" @click="openMap" />
    <view class="hit hit-current-location" @click="useCurrentLocation" />
    <view class="hit hit-origin" @click="chooseOrigin" />
    <view class="hit hit-destination" @click="chooseDestination" />
    <view class="hit hit-swap" @click="swapRoute" />
    <view class="hit hit-date" @click="chooseDate" />
    <view class="hit hit-submit" @click="searchTrips" />
    <view class="hit hit-services" @tap="showComingSoon('快捷服務')" />
    <view class="hit hit-trips" @tap="openTrips" />
    <view class="accessible-values">{{ origin }} · {{ destination }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTripStore } from '../../stores/trip'

const tripStore = useTripStore()
const origin = ref('香港 · 九龍站')
const destination = ref('廣東 · 深圳灣口岸')
const mapVisible = ref(true)

const handleMapLoaded = () => {
  mapVisible.value = true
}

const handleMapError = () => {
  mapVisible.value = false
  uni.showToast({ title: 'Google Maps 暫時無法載入', icon: 'none' })
}

const chooseOrigin = () => uni.showToast({ title: '地點選擇功能開發中', icon: 'none' })
const chooseDestination = () => uni.showToast({ title: '地點選擇功能開發中', icon: 'none' })
const chooseDate = () => uni.showToast({ title: '日期時間選擇功能開發中', icon: 'none' })
const useCurrentLocation = () => {
  uni.getLocation({
    type: 'gcj02',
    success: ({ latitude, longitude }) => uni.showToast({ title: `定位成功 ${latitude.toFixed(4)},${longitude.toFixed(4)}`, icon: 'none' }),
    fail: () => uni.showToast({ title: '無法取得位置，請允許定位權限', icon: 'none' })
  })
}
const openMap = () => {
  // #ifdef APP-PLUS
  plus.runtime.openURL('https://www.google.com/maps/search/?api=1&query=Hong%20Kong%20West%20Kowloon%20Station')
  // #endif
  // #ifdef H5
  window.open('https://www.google.com/maps/search/?api=1&query=Hong%20Kong%20West%20Kowloon%20Station', '_blank')
  // #endif
}
const locateMe = () => useCurrentLocation()
const zoomIn = () => uni.showToast({ title: '地圖功能開發中', icon: 'none' })
const openTrips = () => {
  tripStore.setRoute(origin.value, destination.value)
  uni.navigateTo({
    url: '/pages/trips/trips',
    fail: () => uni.reLaunch({ url: '/pages/trips/trips' })
  })
}
const showComingSoon = (name: string) => uni.showToast({ title: `${name}功能開發中`, icon: 'none' })

function swapRoute() {
  const current = origin.value
  origin.value = destination.value
  destination.value = current
}

function searchTrips() {
  tripStore.setRoute(origin.value, destination.value)
  uni.showToast({ title: '正在查詢車程', icon: 'loading' })
}
</script>

<style scoped>
.page { position: relative; width: 430px; height: 932px; margin: 0 auto; overflow: hidden; background: #fff; border-radius: 35px; box-sizing: border-box; zoom: min(1, calc(100vw / 430px), calc(100vh / 932px)); }
.design-art { position: relative; z-index: 1; display: block; width: 100%; height: auto; }
.google-map { position: absolute; z-index: 0; top: 11.37%; left: 0; width: 100%; height: 55.69%; border: 0; opacity: .98; }
.map-fallback { position: absolute; z-index: 0; top: 11.37%; left: 0; width: 100%; height: 55.69%; pointer-events: none; }
.topbar-art { position: absolute; z-index: 3; display: block; top: 0; left: 0; width: 100%; height: auto; pointer-events: none; }
.hit { position: absolute; z-index: 4; }
.hit-location { top: 0; right: 0; width: 32%; height: 13%; }
.hit-map { top: 11.3%; left: 0; width: 100%; height: 55%; }
.hit-current-location { top: 13%; right: 4%; width: 13%; height: 6%; }
.hit-origin { top: 64%; left: 5%; width: 90%; height: 8%; }
.hit-destination { top: 71%; left: 5%; width: 90%; height: 8%; }
.hit-swap { top: 64%; right: 3%; width: 18%; height: 16%; }
.hit-date { top: 78%; left: 3%; width: 94%; height: 10%; }
.hit-submit { top: 87%; left: 3%; width: 94%; height: 9%; }
.hit-services { top: 93%; left: 0; width: 48%; height: 7%; }
.hit-trips { top: 93%; right: 0; width: 48%; height: 7%; }
.accessible-values { position: absolute; width: 1px; height: 1px; overflow: hidden; opacity: 0; }
</style>
