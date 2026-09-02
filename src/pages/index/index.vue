<template>
  <view class="page" :style="responsiveStyle">
    <view v-if="rideMode === 'cross-border'" class="page-content">
      <view class="canvas">
        <HomeMap />
        <HomeHeader />
        <HomeTravelModeSwitch v-model:mode="rideMode" />
        <HomeMapActions @location="useCurrentLocation" />
        <HomeRoutePanel
          v-model:mode="travelMode"
          @origin="chooseOrigin"
          @destination="chooseDestination"
          @departure-time="chooseDepartureTime"
          @flight="chooseFlight"
        />
        <view class="accessible-values">{{ origin }} · {{ destination }}</view>
      </view>
    </view>
    <template v-else>
      <HomeTravelModeSwitch v-model:mode="rideMode" layout="business" />
      <BusinessCharterPanel
        @origin="chooseOrigin"
        @destination="chooseDestination"
        @date-time="chooseDepartureTime"
        @duration="showComingSoon('用車時間選擇')"
        @book="showComingSoon('商務包車預約')"
        @promo="showComingSoon('優惠預約')"
      />
    </template>
    <view class="nav-layer">
      <HomeBottomNav @services="showComingSoon('快捷服務')" @trips="openTrips" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useTripStore } from '../../stores/trip'
import HomeHeader from '../../components/home/HomeHeader.vue'
import HomeMap from '../../components/home/HomeMap.vue'
import HomeTravelModeSwitch from '../../components/home/HomeTravelModeSwitch.vue'
import HomeMapActions from '../../components/home/HomeMapActions.vue'
import HomeRoutePanel from '../../components/home/HomeRoutePanel.vue'
import BusinessCharterPanel from '../../components/home/BusinessCharterPanel.vue'
import HomeBottomNav from '../../components/home/HomeBottomNav.vue'
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'

type RideMode = 'cross-border' | 'business'
type TravelMode = 'cross-border' | 'airport'

const tripStore = useTripStore()
const rideMode = ref<RideMode>('cross-border')
const travelMode = ref<TravelMode>('cross-border')
const origin = ref('香港 · 九龍站')
const destination = ref('廣東 · 深圳灣口岸')
let hasShown = false
const { responsiveStyle } = useResponsiveCanvas()

onShow(() => {
  if (hasShown) rideMode.value = 'cross-border'
  hasShown = true
})

const chooseOrigin = () => uni.showToast({ title: '地點選擇功能開發中', icon: 'none' })
const chooseDestination = () => uni.showToast({ title: '地點選擇功能開發中', icon: 'none' })
const chooseDepartureTime = () => uni.showToast({ title: '日期時間選擇功能開發中', icon: 'none' })
const chooseFlight = () => uni.showToast({ title: '航班選擇功能開發中', icon: 'none' })

const useCurrentLocation = () => {
  uni.getLocation({
    type: 'gcj02',
    success: ({ latitude, longitude }) => uni.showToast({ title: `定位成功 ${latitude.toFixed(4)},${longitude.toFixed(4)}`, icon: 'none' }),
    fail: () => uni.showToast({ title: '無法取得位置，請允許定位權限', icon: 'none' })
  })
}
const openTrips = () => {
  tripStore.setRoute(origin.value, destination.value)
  uni.redirectTo({ url: '/pages/trips/trips', animationType: 'none', animationDuration: 0 })
}
const showComingSoon = (name: string) => uni.showToast({ title: `${name}功能開發中`, icon: 'none' })
</script>

<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden;overscroll-behavior:none}:global(body){position:fixed;inset:0}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;min-height:0;margin:0;overflow:hidden;background:#fff;border-radius:35px;box-sizing:border-box;color:#38434a;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center center}.page-content{position:absolute;inset:0;width:430px;height:932px}.canvas{position:relative;width:430px;height:932px;min-height:932px}.nav-layer{position:absolute;inset:0;z-index:10;pointer-events:none}.nav-layer :deep(.bottom-nav){pointer-events:auto}.accessible-values{position:absolute;width:1px;height:1px;overflow:hidden;opacity:0}
@media (max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale,calc(100vw / 430)));transform-origin:top left}.page-content{bottom:102px;height:auto;overflow:hidden}.canvas{height:100%;min-height:0}.canvas :deep(.map-layer){bottom:205px;height:auto}.canvas :deep(.map-tool){top:auto;bottom:245px}.canvas :deep(.route-panel){top:auto;bottom:-87px;width:430px;height:331px}.canvas :deep(.panel-surface){top:0;bottom:auto;width:430px;height:331px}.business-scroll{height:auto;bottom:102px}.nav-layer :deep(.bottom-nav){bottom:0}}
</style>
