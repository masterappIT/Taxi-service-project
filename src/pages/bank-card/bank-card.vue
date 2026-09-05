<template>
  <view class="page" :style="responsiveStyle">
    <view class="header">
      <image class="back" src="/static/bank-card/add/back.svg" mode="aspectFit" @tap="goBack" />
      <text class="title">新增銀行卡</text>
    </view>

    <view class="card-form">
      <text class="label">輸入卡號新增</text>
      <view class="input-row">
        <input v-model="cardNumber" class="card-input" type="text" inputmode="numeric" maxlength="19" placeholder="0000 - 0000 - 0000 - 0000" @input="formatCardNumber" />
        <image class="visa" src="/static/bank-card/add/visa.svg" mode="aspectFit" />
      </view>
      <text class="error">{{ errorMessage }}</text>
    </view>

    <view class="card-types">
      <image v-for="asset in cardTypeAssets" :key="asset" :src="asset" mode="aspectFit" />
    </view>
    <view class="next-button" @tap="submitCard"><text>下一步</text></view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'
import { closeCachedPage, openCachedPage } from '../../utils/navigation'

const { responsiveStyle } = useResponsiveCanvas()
const cardNumber = ref('')
const submitted = ref(false)
const cardTypeAssets = [
  '/static/bank-card/add/card-type-3.svg',
  '/static/bank-card/add/card-type-2.svg',
  '/static/bank-card/add/card-type-1.svg',
  '/static/bank-card/add/card-type-4.svg',
  '/static/bank-card/add/card-type-5.svg'
]
const errorMessage = computed(() => submitted.value && !cardNumber.value ? '請輸入一張有效的信用卡卡號' : '')
const formatCardNumber = (event: Event & { detail?: { value?: string } }) => {
  const targetValue = (event.target as HTMLInputElement)?.value
  const value = (event.detail?.value ?? targetValue ?? '').replace(/\D/g, '').slice(0, 16)
  cardNumber.value = value.replace(/(\d{4})(?=\d)/g, '$1 - ')
}
const goBack = () => closeCachedPage('/pages/trips/trips')
const submitCard = () => {
  submitted.value = true
  if (!cardNumber.value) return
  openCachedPage('/pages/bank-card/bank-card')
}
</script>

<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden}
.page{position:fixed;top:0;left:0;width:430px;height:932px;overflow:hidden;border-radius:35px;background:#f0f2f5;color:#38434a;font-family:'Noto Sans TC',sans-serif;transform:scale(1);transform-origin:top left}
.header{position:absolute;top:0;left:0;width:430px;height:110px;overflow:hidden;border-radius:25px;background:#fff}.back{position:absolute;top:60px;left:33px;width:16px;height:29px}.title{position:absolute;top:59px;left:50%;transform:translateX(-50%);font-size:18px;font-weight:500;line-height:normal;white-space:nowrap}
.card-form{position:absolute;top:130px;left:15px;width:400px;height:132px;border-radius:25px;background:#fff}.label,.input-row,.error{position:relative}.label{display:block;width:375px;margin:20px auto 4px;color:#959595;font-size:12px;line-height:normal}.input-row{display:flex;align-items:center;width:375px;margin:0 auto;overflow:hidden;box-shadow:0 1px 0 #b3b3b3}.card-input{flex:1;min-width:0;height:32px;padding:4px 0;border:0;outline:0;box-shadow:none;background:#fff;color:#3c3c3c;font-size:16px;line-height:24px;appearance:none}.visa{flex:none;width:24px;height:16px}.error{display:block;width:375px;margin:4px auto 0;color:#eb6666;font-size:12px;line-height:normal}
.card-types{position:absolute;top:747px;left:70px;width:290px;height:50px;display:flex;gap:10px}.card-types image{width:50px;height:50px;flex:none}.next-button{position:absolute;top:679px;left:36.5px;width:357px;height:50px;border-radius:10px;background:#285cfc;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:500}.next-button text{position:relative;top:-1px}
@media(max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100vh);border-radius:0;transform:scale(var(--mobile-scale,1));transform-origin:top left}}
</style>
