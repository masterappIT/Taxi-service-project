<template>
  <view class="page">
    <HomeMap />
    <HomeHeader />
    <HomeMapActions @location="useCurrentLocation" @map="openMap" />
    <HomeRoutePanel
      @origin="chooseOrigin"
      @destination="chooseDestination"
      @swap="swapRoute"
      @date="chooseDate"
      @submit="searchTrips"
    />
    <HomeBottomNav @services="showComingSoon('快捷服務')" @trips="openTrips" />
    <view class="accessible-values">{{ origin }} · {{ destination }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTripStore } from '../../stores/trip'
import HomeMap from '../../components/home/HomeMap.vue'
import HomeHeader from '../../components/home/HomeHeader.vue'
import HomeMapActions from '../../components/home/HomeMapActions.vue'
import HomeRoutePanel from '../../components/home/HomeRoutePanel.vue'
import HomeBottomNav from '../../components/home/HomeBottomNav.vue'

const tripStore = useTripStore()
const origin = ref('香港 · 九龍站')
const destination = ref('廣東 · 深圳灣口岸')

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
const openTrips = () => {
  tripStore.setRoute(origin.value, destination.value)
  uni.navigateTo({ url: '/pages/trips/trips', fail: () => uni.reLaunch({ url: '/pages/trips/trips' }) })
}
const showComingSoon = (name: string) => uni.showToast({ title: `${name}功能開發中`, icon: 'none' })
const searchTrips = () => {
  tripStore.setRoute(origin.value, destination.value)
  uni.showToast({ title: '正在查詢車程', icon: 'loading' })
}
</script>

<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden;overscroll-behavior:none;touch-action:none}:global(body){position:fixed;inset:0}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;min-height:0;margin:0;overflow:hidden;background:#fff;border-radius:35px;box-sizing:border-box;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center center}.accessible-values{position:absolute;width:1px;height:1px;overflow:hidden;opacity:0}
</style>
