<template>
  <view class="page" :style="responsiveStyle">
    <view class="map-background">
      <HomeMap :latitude="22.3193" :longitude="114.1694" full-screen />
    </view>
    <view class="back" @tap="goBack"><image src="/static/vehicles/back.svg" mode="aspectFit" /></view>
    <view class="summary-panel">
      <view class="route" @tap="editSheetOpen = true">
        <image class="route-dot" src="/static/vehicles/origin.svg" mode="aspectFit" /><text>{{ originLabel }}</text>
        <image class="route-arrow" src="/static/vehicles/route.svg" mode="aspectFit" />
        <image class="route-dot destination" src="/static/vehicles/destination.svg" mode="aspectFit" /><text>{{ destinationLabel }}</text>
        <text class="booking-time">預約時間 ： {{ bookingTime }}</text>
      </view>
      <view class="charge-row first"><text class="charge-label">{{ vehicleTitle }}</text><text class="charge-price">¥ {{ vehicle.price }}</text></view>
      <view class="charge-row"><text class="charge-label">加急附加費</text><text class="charge-price">¥ {{ priorityPrice }}</text></view>
      <view class="charge-row discount"><text class="charge-label">優惠券抵扣</text><text class="charge-price">-¥ {{ discount }}</text></view>
      <image class="divider first-divider" src="/static/orders/divider.svg" mode="scaleToFill" />
      <image class="divider second-divider" src="/static/orders/divider.svg" mode="scaleToFill" />
      <view class="payment-bar">
        <view class="available" @tap="openCoupons">可用優惠</view>
        <view class="total"><text class="price-label">優惠價</text><text class="amount">¥ {{ total }}</text></view>
        <view class="pay" @tap="payNow">立即出行</view>
      </view>
      <view class="notice"><image src="/static/vehicles/edit/chevron.svg" mode="aspectFit" /><text>訂單成功支付後，若取消或修改訂單規則。</text></view>
    </view>
    <view class="selected-card"><VehicleCard :vehicle="vehicle" :selected="true" selectable /></view>
    <view class="quick-links"><text class="edit-trip" @tap="editSheetOpen = true">修改行程</text><text>幫人叫車</text><text>聯繫客服</text></view>
    <TripEditSheet v-if="editSheetOpen" :origin="tripStore.activeTrip?.origin || '香港 · 九龍站'" :destination="tripStore.activeTrip?.destination || '廣東 · 深圳灣口岸'" :departure-time="tripStore.departureTime" @close="editSheetOpen = false" @confirm="saveTripChanges" />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'
import { useTripStore } from '../../stores/trip'
import { closeCachedPage, openCachedPage } from '../../utils/navigation'
import TripEditSheet from '../../components/home/TripEditSheet.vue'
import VehicleCard from '../../components/vehicles/VehicleCard.vue'
import HomeMap from '../../components/home/HomeMap.vue'
import type { Vehicle } from '../../types/vehicle'
const { responsiveStyle } = useResponsiveCanvas()
const tripStore = useTripStore()
const editSheetOpen = ref(false)
const vehicle = computed<Vehicle>(() => tripStore.chosenVehicle || { id: 'premium-vellfire', brand: 'Toyota', model: 'Vellfire', series: '20系', seats: 7, price: 800, image: '/static/vehicles/vellfire.png', selectable: true })
const originLabel = computed(() => cityName(tripStore.activeTrip?.origin, '香港'))
const destinationLabel = computed(() => cityName(tripStore.activeTrip?.destination, '深圳'))
const bookingTime = computed(() => tripStore.departureTime || 'March 15 2024 14:00')
const vehicleTitle = computed(() => `高級跨境商務車（${vehicle.value.seats}座）`)
const priorityPrice = 100
const discount = 100
const total = computed(() => vehicle.value.price + priorityPrice - discount)
const cityName = (value: string | undefined, fallback: string) => { const text = value?.trim() || ''; if (text.includes('香港')) return '香港'; if (text.includes('深圳') || text.includes('廣東')) return '深圳'; return text.split(/[·，,\s]/)[0] || fallback }
const saveTripChanges = (origin: string, destination: string, departureTime: string) => { tripStore.setRoute(origin, destination); tripStore.setDepartureTime(departureTime); editSheetOpen.value = false }
const goBack = () => closeCachedPage('/pages/vehicles/selected')
const openCoupons = () => openCachedPage('/pages/coupons/coupons')
const payNow = () => uni.showToast({ title: '即將進入付款流程', icon: 'none' })
</script>

<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden;background:#25292f}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;border-radius:35px;background:#25292f;color:#fff;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center}.map-background{position:absolute;top:0;left:0;width:430px;height:642px;overflow:hidden;border-radius:35px 35px 0 0;background:#edf0f2}.back{position:absolute;z-index:5;top:60px;left:33px;width:38px;height:38px}.back image{width:38px;height:38px}.summary-panel{position:absolute;z-index:3;top:552px;left:0;width:430px;height:380px;border-radius:25px 25px 0 0;background:#56657e}.route{position:absolute;top:128px;left:53px;width:324px;height:62px;font-size:14px;font-weight:700}.route-dot{position:absolute;top:12px;left:69px;width:8px;height:15px}.route text:nth-of-type(1){position:absolute;top:9px;left:94px}.route-arrow{position:absolute;top:4px;left:139px;width:30px;height:30px}.route-dot.destination{top:13px;left:186px;height:12px}.route text:nth-of-type(2){position:absolute;top:9px;left:214px}.booking-time{position:absolute!important;top:38px!important;left:62px!important;width:200px;text-align:center;font-size:14px;font-weight:100;white-space:nowrap}.quick-links{position:absolute;z-index:5;top:642px;left:25px;width:380px;height:40px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:90px;padding:0;color:#fff;font-family:'Inria Sans',sans-serif;font-size:12px;line-height:normal;white-space:nowrap}.quick-links text{display:block;flex:0 0 auto;width:auto;white-space:nowrap;line-height:normal}.charge-row{position:absolute;top:214px;left:0;width:430px;height:18px;display:block;font-size:12px;font-weight:100;line-height:normal;white-space:nowrap}.charge-row.first{top:196px}.charge-row.discount{top:232px;height:18px;font-size:14px;font-weight:500}.charge-label,.charge-price{position:absolute;top:0;display:block;width:max-content;line-height:normal;text-align:center;transform:translateX(-50%)}.charge-row.first .charge-label{left:156.5px}.charge-row:not(.first) .charge-label{left:123px}.charge-price{left:319.5px}.charge-row.discount .charge-label{left:128px}.charge-row.discount .charge-price{left:316.5px}.divider{position:absolute;left:94px;width:244px;height:1px}.first-divider{top:214px}.second-divider{top:232px}.payment-bar{position:absolute;top:272px;left:25px;width:380px;height:48px;border-radius:25px;background:#1effaa;color:#000;overflow:hidden}.available{position:absolute;left:0;top:0;width:95px;height:48px;border-radius:25px;background:#f95c5c;color:#fff;text-align:center;line-height:48px;font-family:'Inria Sans',sans-serif;font-size:12px}.total{position:absolute;left:95px;top:0;width:151px;height:48px}.total::before{content:'';position:absolute;left:-8px;top:10px;width:1px;height:27px;background:rgba(37,41,47,.35)}.price-label{position:absolute;top:22px;left:94px;font-size:10px;font-weight:300;white-space:nowrap}.amount{position:absolute;top:7px;left:35px;font-size:28px;font-weight:700;white-space:nowrap}.pay{position:absolute;right:0;top:0;width:134px;height:48px;border-radius:25px;background:#fecf62;color:#fff;text-align:center;line-height:48px;font-size:20px;font-weight:900}.notice{position:absolute;top:325px;left:37px;display:flex;align-items:center;gap:5px;color:#d9d9d9;font-family:'Inria Sans',sans-serif;font-size:14px;white-space:nowrap}.notice image{width:20px;height:20px}.selected-card{position:absolute;z-index:4;top:462px;left:25px;width:380px;height:180px}.selected-card :deep(.vehicle-card){margin:0}@media (max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale,1));transform-origin:top left}}
</style>
