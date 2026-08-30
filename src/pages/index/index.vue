<template>
  <view class="home">
    <view class="hero">
      <text class="eyebrow">TAXI · CROSS-BORDER MOBILITY</text>
      <text class="title">粵港澳，出行更簡單</text>
      <text class="subtitle">連接香港、澳門與大灣區的跨境出行服務</text>
    </view>
    <view class="route-card">
      <text class="card-title">預約跨境行程</text>
      <view class="field" @click="chooseOrigin"><text class="label">出發地</text><text class="value">{{ origin }}</text></view>
      <view class="field" @click="chooseDestination"><text class="label">目的地</text><text class="value">{{ destination }}</text></view>
      <button class="primary" @click="searchTrips">查詢車程</button>
    </view>
    <view class="quick-links">
      <view class="quick-item"><text class="icon">◷</text><text>行程記錄</text></view>
      <view class="quick-item"><text class="icon">◎</text><text>優惠券</text></view>
      <view class="quick-item"><text class="icon">▣</text><text>客服中心</text></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTripStore } from '../../stores/trip'

const tripStore = useTripStore()
const origin = ref('香港 · 九龍')
const destination = ref('廣東 · 深圳')
const chooseOrigin = () => uni.showToast({ title: '地點選擇功能開發中', icon: 'none' })
const chooseDestination = () => uni.showToast({ title: '地點選擇功能開發中', icon: 'none' })
function searchTrips() {
  tripStore.setRoute(origin.value, destination.value)
  uni.showToast({ title: '正在查詢車程', icon: 'loading' })
}
</script>

<style scoped>
.home { min-height: 100vh; padding: 48rpx 36rpx; background: #f5f7fa; box-sizing: border-box; }
.hero { padding: 34rpx 8rpx 48rpx; }
.eyebrow { display: block; color: #1b8a7a; font-size: 22rpx; letter-spacing: 3rpx; margin-bottom: 24rpx; }
.title { display: block; color: #102a43; font-size: 52rpx; font-weight: 700; line-height: 1.3; }
.subtitle { display: block; color: #627d98; font-size: 28rpx; margin-top: 18rpx; }
.route-card { padding: 34rpx; background: #fff; border-radius: 24rpx; box-shadow: 0 12rpx 36rpx rgba(16, 42, 67, .08); }
.card-title { display: block; color: #102a43; font-size: 34rpx; font-weight: 600; margin-bottom: 20rpx; }
.field { padding: 24rpx 0; border-bottom: 1rpx solid #e6edf3; }
.label { display: block; color: #829ab1; font-size: 24rpx; margin-bottom: 8rpx; }
.value { color: #243b53; font-size: 30rpx; }
.primary { margin-top: 32rpx; color: #fff; background: #1b8a7a; border-radius: 14rpx; font-size: 30rpx; }
.quick-links { display: flex; justify-content: space-around; padding: 54rpx 0; color: #486581; font-size: 24rpx; }
.quick-item { display: flex; flex-direction: column; align-items: center; gap: 12rpx; }
.icon { color: #1b8a7a; font-size: 40rpx; }
</style>
