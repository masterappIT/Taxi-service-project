<template>
  <view class="page" :style="responsiveStyle">
    <view class="header">
      <image class="back" src="/static/bank-card/back.svg" mode="aspectFit" @tap="goBack" />
      <text class="title">我的銀行卡</text>
    </view>
    <view class="add-button" @tap="addCard"><text>新增銀行卡</text></view>
    <view class="bottom-nav">
      <image class="nav-icon" src="/static/bank-card/nav-trips.svg" mode="aspectFit" />
      <image class="nav-icon" src="/static/bank-card/nav-service.svg" mode="aspectFit" />
      <image class="nav-icon" src="/static/bank-card/nav-home.svg" mode="aspectFit" />
      <image class="nav-icon" src="/static/bank-card/nav-profile.svg" mode="aspectFit" />
      <image class="nav-icon" src="/static/bank-card/nav-help.svg" mode="aspectFit" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'
import { closeCachedPage } from '../../utils/navigation'

const { responsiveStyle } = useResponsiveCanvas()
const goBack = () => closeCachedPage('/pages/trips/trips')
const addCard = () => uni.showToast({ title: '新增銀行卡功能即將推出', icon: 'none' })
</script>

<style scoped>
:global(html),:global(body),:global(#app){width:100%;min-width:0;height:100%;margin:0;overflow:hidden;overscroll-behavior:none}
.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;border-radius:35px;background:#F0F2F5;color:#38434A;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center}
.header{position:absolute;top:0;left:0;width:430px;height:110px;overflow:hidden;border-radius:25px;background:#fff}.back{position:absolute;top:53px;left:26px;width:26px;height:39px;padding:7px;box-sizing:border-box}.title{position:absolute;top:59px;left:50%;transform:translateX(-50%);font-size:18px;font-weight:500;line-height:normal;white-space:nowrap}
.add-button{position:absolute;top:130px;left:36px;width:357px;height:50px;border-radius:10px;background:#285CFC;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:500}.bottom-nav{position:absolute;top:747px;left:70px;width:290px;height:50px;display:flex;gap:10px}.nav-icon{width:50px;height:50px;flex:none}
@media(max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale,1));transform-origin:top left}}
</style>
