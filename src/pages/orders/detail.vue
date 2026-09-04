<template>
  <view class="page" :style="responsiveStyle">
    <view class="header">
      <view class="back" @tap="goBack"><image src="/static/orders/detail-back.svg" mode="aspectFit" /></view>
      <text class="number">訂單編號：282678634</text>
    </view>
    <view class="assist"><image src="/static/orders/help.svg" mode="aspectFit" /><text>訂單協助</text></view>
    <view class="status"><image src="/static/orders/status-pending.svg" mode="aspectFit" /><text>待確認</text></view>
    <view class="card">
      <view class="locations"><view><image src="/static/orders/origin.svg" mode="aspectFit" /><text>{{ originLabel }}</text></view><view><image src="/static/orders/destination.svg" mode="aspectFit" /><text>{{ destinationLabel }}</text></view></view>
      <view class="times"><text>上車時間 ：{{ bookingTime }}</text><text>到達時間 ：{{ bookingTime }}</text></view>
      <view class="passenger-title">乘客及聯絡資料：</view><view class="passenger"><view><image src="/static/orders/passenger.svg" mode="aspectFit" /><text>李XX（先生）</text></view><view><image src="/static/orders/phone.svg" mode="aspectFit" /><text>852 - 53**8469</text></view></view>
      <view class="payment"><text>交易時間剩餘：05:00</text><text class="amount">RMB¥{{ selectedVehicle.price.toFixed(2) }}</text><view class="pay-tag">待付款</view></view>
      <view class="detail"><text class="detail-title">訂單詳細</text><text class="detail-date">2024/03/15</text><view class="line"/><view class="row"><text>{{ selectedVehicle.title }}（{{ selectedVehicle.seats }}座）</text><text>¥ {{ selectedVehicle.price }}</text></view><view class="row"><text>加急附加費</text><text>¥ 100</text></view><view class="row"><text>優惠券抵扣</text><text>-¥ 100</text></view><view class="total">Total： ¥ {{ selectedVehicle.price }}</view><button class="cancel" @tap="cancelOrder">取消</button></view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'
import { useTripStore } from '../../stores/trip'
import { closeCachedPage } from '../../utils/navigation'
const tripStore = useTripStore()
const { responsiveStyle } = useResponsiveCanvas()
const selectedVehicle = computed(() => tripStore.selectedVehicle || { id: '', title: '高級跨境商務車', seats: 7, price: 800 })
const cityLabel = (value: string | undefined, fallback: string) => value?.split('·')[0]?.trim() || fallback
const originLabel = computed(() => cityLabel(tripStore.activeTrip?.origin, '香港國際機場'))
const destinationLabel = computed(() => cityLabel(tripStore.activeTrip?.destination, '深圳灣口岸'))
const bookingTime = computed(() => tripStore.departureTime || '2024年3月15日 14:00')
const goBack = () => closeCachedPage('/pages/orders/orders')
const cancelOrder = () => uni.showToast({ title: '訂單取消功能開發中', icon: 'none' })
</script>
<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;background:#f0f2f5;color:#38434a;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center}.header{position:absolute;top:0;left:0;width:430px;height:110px;border-radius:25px;background:#fff}.back{position:absolute;top:60px;left:33px;width:16px;height:29px}.back image{width:16px;height:29px}.number{position:absolute;top:58px;left:122px;font-size:18px;font-weight:500}.assist{position:absolute;top:130px;right:33px;display:flex;align-items:center;gap:10px;color:#285cfc;font-size:16px}.assist image{width:25px;height:25px}.status{position:absolute;top:130px;left:33px;display:flex;align-items:center;gap:5px;font-size:16px;font-weight:700}.status image{width:25px;height:25px}.card{position:absolute;top:175px;left:0;width:430px;height:700px;border-radius:25px;background:#fff}.locations{position:absolute;top:20px;left:33px;font-size:14px}.locations view,.passenger view{display:flex;align-items:center;height:30px;gap:20px}.locations image{width:18px;height:18px}.times{position:absolute;top:80px;left:33px;display:flex;flex-direction:column;gap:5px;font-size:14px;font-weight:300}.passenger-title{position:absolute;top:135px;left:33px;font-size:14px}.passenger{position:absolute;top:165px;left:33px;font-size:14px}.passenger view{gap:10px}.passenger image{width:20px;height:20px}.passenger view:last-child image{width:15px;height:15px;margin-left:2px}.payment{position:absolute;top:20px;left:206px;width:194px;height:105px;font-size:14px;font-weight:300}.payment>text:first-child{position:absolute;top:0;right:0;line-height:20px;white-space:nowrap}.amount{position:absolute;top:70px;right:0;color:#285cfc;font-weight:700;white-space:nowrap}.pay-tag{position:absolute;top:30px;right:0;padding:5px 10px;border:1px solid #f95c5c;border-radius:10px;white-space:nowrap}.detail{position:absolute;top:225px;left:0;width:430px;height:325px;padding:0 25px;box-sizing:border-box}.detail-title{font-size:18px;font-weight:500}.detail-date{float:right;margin-top:3px;font-size:14px}.line{height:1px;margin-top:25px;background:#d9d9d9}.row{display:flex;justify-content:space-between;margin-top:20px;font-size:18px;font-weight:300}.total{margin-top:48px;text-align:right;font-size:16px;font-weight:500}.cancel{float:right;margin-top:35px;padding:5px 10px;border:1px solid #38434a;border-radius:10px;background:#fff;color:#38434a;font-size:18px;font-weight:300;line-height:25px}@media (max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale,1));transform-origin:top left}}
</style>
