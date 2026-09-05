<template>
  <!-- #ifndef MP-WEIXIN -->
  <view class="page" :style="responsiveStyle">
    <view class="header"><image class="back" src="/static/wallet/back.svg" mode="aspectFit" @tap="goBack" /><text class="title">提現</text></view>
    <text class="method-title">到帳方式</text>
    <view class="payment-card"><image class="method-icon" src="/static/withdraw/alipay.svg" mode="aspectFit" /><text>支付寶支付</text><image class="check" src="/static/withdraw/check-selected.svg" mode="aspectFit" /></view>
    <view class="account-card"><view class="account-row name-row"><text>支付寶帳戶姓名</text><input v-model="accountName" class="field" placeholder="請輸入支付寶帳戶姓名" placeholder-class="placeholder" /></view><view class="account-row number-row"><text>支付寶帳號</text><input v-model="accountNumber" class="field" placeholder="請輸入支付寶帳號" placeholder-class="placeholder" /></view></view>
    <view class="amount-card"><text class="amount-title">提取金額</text><view class="divider" /><view class="amount-input"><text class="currency currency-rmb">RMB</text><text class="currency currency-yen">¥</text><input v-model="amount" type="digit" placeholder="請輸入兌現金額" placeholder-class="amount-placeholder" /></view><view class="amount-meta"><text>可用金額 ¥ 0.00</text><text>手續費 ¥ 1.00</text></view></view>
    <view class="submit" @tap="submit"><text>提交申請</text></view>
  </view>
  <!-- #endif -->
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'
import { closeCachedPage } from '../../utils/navigation'
const { responsiveStyle } = useResponsiveCanvas()
const accountName = ref('')
const accountNumber = ref('')
const amount = ref('')
const goBack = () => closeCachedPage('/pages/withdraw/withdraw')
const submit = () => {
  if (!accountName.value.trim() || !accountNumber.value.trim() || !amount.value.trim()) {
    uni.showToast({ title: '請填寫完整提現資料', icon: 'none' })
    return
  }
  uni.showToast({ title: '提現申請已提交', icon: 'success' })
}
</script>
<style scoped>
:global(html),:global(body),:global(#app){width:100%;min-width:0;height:100%;margin:0;overflow:hidden;overscroll-behavior:none}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;border-radius:35px;background:#F0F2F5;color:#38434A;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center}.header{position:absolute;top:0;left:0;width:430px;height:110px;border-radius:25px;background:#fff}.back{position:absolute;top:53px;left:26px;width:26px;height:39px;padding:7px;box-sizing:border-box}.title{position:absolute;top:58px;left:calc(50% - 18px);font-size:18px;font-weight:500}.method-title{position:absolute;top:130px;left:20px;font-size:16px;font-weight:350}.payment-card{position:absolute;top:168px;left:25px;width:380px;height:50px;padding:10px;box-sizing:border-box;border:1px solid #285CFC;border-radius:10px;background:#fff;box-shadow:0 4px 4px rgba(0,0,0,.25);display:flex;align-items:center;gap:16px;font-family:Inter,'Noto Sans TC',sans-serif;font-size:14px;color:#1D2939}.method-icon{width:25px;height:25px;flex:none}.check{width:24px;height:24px;margin-left:auto}.account-card,.amount-card{position:absolute;left:15px;width:400px;border-radius:10px;background:#fff;overflow:hidden}.account-card{top:238px;height:100px;font-size:14px}.account-row{position:absolute;left:20px;width:360px;height:50px;box-sizing:border-box}.account-row text{position:absolute;left:0;top:15px;line-height:20px}.account-row .field{position:absolute;left:150px;top:10px;width:210px;height:30px;padding:0;border:0;font-size:14px;line-height:30px;color:#38434A}.name-row{top:0}.number-row{top:50px;border-top:1px solid #D9D9D9}.placeholder{color:#999}.amount-card{top:358px;height:127px;padding:10px 20px;box-sizing:border-box}.amount-title{font-size:16px;font-weight:350}.divider{position:absolute;top:87px;left:20px;width:360px;border-top:1px solid #D9D9D9}.amount-input{position:absolute;top:50px;left:20px;width:360px;height:38px}.currency{position:absolute;top:0;line-height:20px;white-space:nowrap}.currency-rmb{left:0;top:5px;font-size:14px;font-weight:500}.currency-yen{left:36px;top:0;font-size:26px;line-height:30px}.amount-input input{position:absolute;left:67px;top:0;width:293px;height:38px;padding:0;border:0;font-size:14px;line-height:38px}.amount-placeholder{color:#999}.amount-meta{position:absolute;left:20px;right:20px;bottom:10px;display:flex;justify-content:space-between;font-size:12px;color:#38434A}.submit{position:absolute;top:679px;left:36px;width:357px;height:50px;border-radius:10px;background:#285CFC;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:500}@media(max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale,1));transform-origin:top left}}
</style>
