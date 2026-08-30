<template>
  <view class="page">
    <view class="topbar">
      <view>
        <text class="brand">TAXI</text>
        <text class="brand-sub">跨境出行</text>
      </view>
      <view class="location-pill" @click="useCurrentLocation">
        <text class="location-dot">●</text>
        <text>香港</text>
        <text class="chevron">⌄</text>
      </view>
    </view>

    <view class="welcome">
      <text class="greeting">早上好，Vincent</text>
      <text class="headline">下一程，從容出發</text>
    </view>

    <view class="map-card">
      <view class="map-grid"></view>
      <view class="map-river"></view>
      <view class="map-route route-one"></view>
      <view class="map-route route-two"></view>
      <view class="map-pin pin-start"><text>●</text></view>
      <view class="map-pin pin-end"><text>◆</text></view>
      <view class="map-label label-hk">香港</view>
      <view class="map-label label-shenzhen">深圳</view>
      <view class="map-credit">Google Maps</view>
      <view class="map-controls">
        <view class="control" @click="locateMe">⌾</view>
        <view class="control" @click="zoomIn">＋</view>
      </view>
    </view>

    <view class="booking-card">
      <view class="booking-header">
        <text class="section-title">預約跨境行程</text>
        <text class="swap" @click="swapRoute">⇅</text>
      </view>
      <view class="route-line">
        <view class="line-markers"><text class="marker start"></text><view class="connector"></view><text class="marker end"></text></view>
        <view class="route-fields">
          <view class="field" @click="chooseOrigin">
            <text class="field-label">出發地</text>
            <text class="field-value">{{ origin }}</text>
          </view>
          <view class="field destination" @click="chooseDestination">
            <text class="field-label">目的地</text>
            <text class="field-value">{{ destination }}</text>
          </view>
        </view>
      </view>
      <view class="date-row">
        <view class="date-item"><text class="date-icon">▣</text><view><text class="date-label">出發日期</text><text class="date-value">今天，08月31日</text></view></view>
        <view class="date-item"><text class="date-icon">◷</text><view><text class="date-label">出發時間</text><text class="date-value">立即出發</text></view></view>
      </view>
      <button class="primary" @click="searchTrips">搜尋可用車程 <text>→</text></button>
    </view>

    <view class="services-title"><text>快捷服務</text><text class="view-all">查看全部 ›</text></view>
    <view class="services">
      <view class="service" @click="showComingSoon('行程記錄')"><view class="service-icon history">◷</view><text>行程記錄</text></view>
      <view class="service" @click="showComingSoon('優惠券')"><view class="service-icon coupon">◇</view><text>優惠券</text></view>
      <view class="service" @click="showComingSoon('客服中心')"><view class="service-icon support">◌</view><text>客服中心</text></view>
      <view class="service" @click="showComingSoon('更多服務')"><view class="service-icon more">•••</view><text>更多服務</text></view>
    </view>
    <view class="safe-note"><text class="shield">♢</text><text>全程安全保障 · 專業跨境車隊</text></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTripStore } from '../../stores/trip'

const tripStore = useTripStore()
const origin = ref('香港 · 九龍站')
const destination = ref('廣東 · 深圳灣口岸')

const chooseOrigin = () => uni.showToast({ title: '地點選擇功能開發中', icon: 'none' })
const chooseDestination = () => uni.showToast({ title: '地點選擇功能開發中', icon: 'none' })
const useCurrentLocation = () => uni.showToast({ title: '已定位至香港', icon: 'none' })
const locateMe = () => uni.showToast({ title: '正在定位', icon: 'none' })
const zoomIn = () => uni.showToast({ title: '地圖功能開發中', icon: 'none' })
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
.page { min-height: 100vh; padding: 42rpx 36rpx 48rpx; box-sizing: border-box; background: #f7f9fb; color: #152b3b; }
.topbar, .booking-header, .services-title, .date-item { display: flex; align-items: center; justify-content: space-between; }
.brand { font-size: 38rpx; line-height: 1; font-weight: 800; letter-spacing: 7rpx; color: #163b4b; }
.brand-sub { display: block; margin-top: 8rpx; font-size: 20rpx; letter-spacing: 4rpx; color: #7b919a; }
.location-pill { display: flex; align-items: center; gap: 10rpx; padding: 14rpx 20rpx; border: 1rpx solid #dfe9eb; border-radius: 40rpx; background: #fff; color: #365663; font-size: 24rpx; }
.location-dot { color: #25a58e; font-size: 18rpx; }.chevron { margin-left: 4rpx; color: #91a6ad; font-size: 28rpx; }
.welcome { padding: 54rpx 4rpx 30rpx; }.greeting { display: block; color: #8b9ba2; font-size: 24rpx; }.headline { display: block; margin-top: 12rpx; color: #163b4b; font-size: 48rpx; font-weight: 700; }
.map-card { position: relative; overflow: hidden; height: 270rpx; border-radius: 28rpx; background: #dfece9; box-shadow: 0 14rpx 32rpx rgba(34, 75, 77, .1); }
.map-grid { position: absolute; inset: 0; opacity: .45; background-image: linear-gradient(28deg, transparent 47%, #fff 48%, #fff 50%, transparent 51%), linear-gradient(150deg, transparent 47%, #fff 48%, #fff 50%, transparent 51%); background-size: 76rpx 76rpx, 92rpx 92rpx; }
.map-river { position: absolute; width: 210%; height: 120rpx; left: -40%; top: 70rpx; transform: rotate(-13deg); background: #b9dce0; opacity: .85; border-top: 5rpx solid #a3cdd1; border-bottom: 5rpx solid #a3cdd1; }
.map-route { position: absolute; height: 8rpx; border-radius: 8rpx; transform-origin: left center; background: #ef9b56; box-shadow: 0 0 0 4rpx rgba(255,255,255,.75); }.route-one { width: 360rpx; top: 154rpx; left: 140rpx; transform: rotate(-18deg); }.route-two { width: 180rpx; top: 124rpx; left: 230rpx; transform: rotate(27deg); background: #f3b06f; }
.map-pin { position: absolute; z-index: 2; display: flex; align-items: center; justify-content: center; width: 42rpx; height: 42rpx; border: 6rpx solid #fff; border-radius: 50%; color: #fff; font-size: 17rpx; box-shadow: 0 5rpx 12rpx rgba(32, 70, 74, .2); }.pin-start { top: 137rpx; left: 116rpx; background: #22a58f; }.pin-end { top: 111rpx; right: 92rpx; background: #ee8e4f; }.map-label { position: absolute; color: #50747c; font-size: 21rpx; font-weight: 600; }.label-hk { left: 88rpx; bottom: 38rpx; }.label-shenzhen { right: 54rpx; top: 52rpx; }.map-credit { position: absolute; left: 18rpx; bottom: 14rpx; color: #779397; font-size: 16rpx; }.map-controls { position: absolute; right: 18rpx; bottom: 18rpx; display: flex; gap: 10rpx; }.control { width: 52rpx; height: 52rpx; line-height: 52rpx; text-align: center; border-radius: 14rpx; background: rgba(255,255,255,.92); color: #52747a; font-size: 30rpx; }
.booking-card { margin-top: -34rpx; position: relative; padding: 34rpx 30rpx 30rpx; border-radius: 28rpx; background: #fff; box-shadow: 0 14rpx 35rpx rgba(31, 57, 67, .1); }.section-title { color: #193d4c; font-size: 32rpx; font-weight: 700; }.swap { color: #1d9c88; font-size: 38rpx; }.route-line { display: flex; margin-top: 22rpx; }.line-markers { width: 42rpx; padding-top: 17rpx; display: flex; flex-direction: column; align-items: center; }.marker { width: 15rpx; height: 15rpx; border: 4rpx solid #fff; border-radius: 50%; box-shadow: 0 0 0 3rpx #24a28d; background: #24a28d; }.marker.end { border-radius: 3rpx; background: #ed9254; box-shadow: 0 0 0 3rpx #ed9254; transform: rotate(45deg); }.connector { height: 54rpx; border-left: 2rpx dashed #bdd1d2; }.route-fields { flex: 1; }.field { padding: 8rpx 0 20rpx; border-bottom: 1rpx solid #eef2f3; }.field.destination { padding-top: 18rpx; border-bottom: 0; }.field-label, .date-label { display: block; color: #9aabb0; font-size: 21rpx; }.field-value { display: block; margin-top: 6rpx; color: #31515d; font-size: 27rpx; }.date-row { display: flex; gap: 20rpx; padding: 16rpx 0 24rpx; border-top: 1rpx solid #eef2f3; }.date-item { flex: 1; justify-content: flex-start; gap: 12rpx; }.date-icon { color: #24a28d; font-size: 28rpx; }.date-value { display: block; margin-top: 5rpx; color: #35545f; font-size: 23rpx; }.primary { height: 86rpx; line-height: 86rpx; border-radius: 16rpx; color: #fff; background: #1d9c88; font-size: 28rpx; font-weight: 600; }.primary text { margin-left: 14rpx; font-size: 34rpx; }
.services-title { margin: 44rpx 4rpx 22rpx; color: #244653; font-size: 29rpx; font-weight: 650; }.view-all { color: #8a9da2; font-size: 22rpx; font-weight: 400; }.services { display: flex; justify-content: space-between; padding: 0 8rpx; }.service { display: flex; align-items: center; flex-direction: column; gap: 13rpx; color: #5b727a; font-size: 22rpx; }.service-icon { width: 76rpx; height: 76rpx; line-height: 76rpx; text-align: center; border-radius: 24rpx; font-size: 36rpx; }.history { color: #238e85; background: #e5f5f1; }.coupon { color: #d8894e; background: #fff0e4; }.support { color: #6d86bd; background: #eaf0ff; }.more { color: #8a9298; background: #edf0f2; font-size: 27rpx; }.safe-note { display: flex; align-items: center; justify-content: center; gap: 8rpx; margin-top: 48rpx; color: #9aa9ad; font-size: 20rpx; }.shield { color: #35a492; font-size: 25rpx; }
</style>
