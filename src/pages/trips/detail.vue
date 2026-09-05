<template>
  <view class="page" :style="responsiveStyle">
    <view class="header">
      <OrdersBackButton icon-src="/static/orders/traveling-back.svg" @tap="goBack" />
      <text class="traveling-title">待出行</text>
    </view>

    <view class="empty-state">
      <text class="empty-title">目前沒有待出行行程</text>
      <text class="empty-description">完成預約後，行程會顯示在這裡</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'
import { closeCachedPage } from '../../utils/navigation'
import OrdersBackButton from '../../components/orders/OrdersBackButton.vue'

const { responsiveStyle } = useResponsiveCanvas()
const returnTarget = ref('/pages/trips/trips')

const goBack = () => closeCachedPage(returnTarget.value)

onLoad((options) => {
  const source = options?.from || options?.returnTo || ''
  if (source === 'booking-success') returnTarget.value = '/pages/index/index'
  else if (source === 'orders') returnTarget.value = '/pages/orders/orders'
})
</script>

<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden}
.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;background:#f0f2f5;color:#38434a;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center}.header{position:absolute;top:0;left:0;width:430px;height:110px;border-radius:25px;background:#fff}.traveling-title{position:absolute;top:58px;left:50%;transform:translateX(-50%);font-size:18px;font-weight:500;line-height:27px}.empty-state{position:absolute;top:110px;right:0;bottom:0;left:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding-bottom:110px;box-sizing:border-box}.empty-title{font-size:18px;font-weight:500;line-height:27px}.empty-description{margin-top:10px;color:#8b949e;font-size:14px;font-weight:300;line-height:21px}@media (max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale, 1));transform-origin:top left}.header{width:100%}}
</style>
