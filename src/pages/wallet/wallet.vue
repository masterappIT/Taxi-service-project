<template>
  <view class="page" :style="responsiveStyle">
    <view class="header">
      <image class="back" src="/static/wallet/back.svg" mode="aspectFit" @tap="goBack" />
      <text class="title">我的錢包</text>
    </view>

    <view class="balance-card">
      <text class="balance-label">可提餘額</text>
      <text class="balance">HKD${{ wallet.withdrawable.toFixed(2) }}</text>
      <text class="fare-balance">車費餘額：¥{{ wallet.fare.toFixed(2) }}</text>
    </view>

    <view class="actions">
      <view class="action withdraw" @tap="openAmountDialog('withdraw')"><text>兌現</text></view>
      <view class="action top-up" @tap="openAmountDialog('topUp')"><text>增值</text></view>
    </view>

    <view class="records-link" @tap="showRecords">
      <text>交易紀錄</text>
      <image src="/static/wallet/records.svg" mode="aspectFit" />
    </view>

    <view v-if="recordsVisible" class="records-panel">
      <view class="records-heading"><text>最近交易</text><text @tap="recordsVisible = false">收起</text></view>
      <view v-if="wallet.records.length === 0" class="empty-records">暫無交易紀錄</view>
      <view v-for="record in wallet.records" :key="record.id" class="record-row">
        <view><text class="record-type">{{ record.type }}</text><text class="record-time">{{ record.time }}</text></view>
        <text :class="record.amount > 0 ? 'positive' : 'negative'">{{ record.amount > 0 ? '+' : '-' }}HKD${{ Math.abs(record.amount).toFixed(2) }}</text>
      </view>
    </view>

    <view class="settings" @tap="openSettings">
      <image src="/static/wallet/settings.svg" mode="aspectFit" /><text>設定</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'

import { closeCachedPage } from '../../utils/navigation'

const { responsiveStyle } = useResponsiveCanvas()
import { reactive, ref } from 'vue'

type ActionType = 'withdraw' | 'topUp'
type WalletRecord = { id: number; type: string; amount: number; time: string }
type WalletState = { withdrawable: number; fare: number; records: WalletRecord[] }

const stored = uni.getStorageSync('wallet-state') as Partial<WalletState> | ''
const wallet = reactive<WalletState>({
  withdrawable: Number(stored?.withdrawable) || 0,
  fare: Number(stored?.fare) || 0,
  records: Array.isArray(stored?.records) ? stored.records : []
})
const recordsVisible = ref(false)

const persist = () => uni.setStorageSync('wallet-state', { ...wallet, records: [...wallet.records] })
const now = () => {
  const date = new Date()
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
const openAmountDialog = (type: ActionType) => {
  const isTopUp = type === 'topUp'
  uni.showModal({
    title: isTopUp ? '錢包增值' : '餘額兌現',
    editable: true,
    placeholderText: '請輸入金額',
    success: ({ confirm, content }) => {
      if (!confirm) return
      const amount = Number(content)
      if (!Number.isFinite(amount) || amount <= 0) {
        uni.showToast({ title: '請輸入有效金額', icon: 'none' })
        return
      }
      if (!isTopUp && amount > wallet.withdrawable) {
        uni.showToast({ title: '可提餘額不足', icon: 'none' })
        return
      }
      wallet.withdrawable += isTopUp ? amount : -amount
      wallet.records.unshift({ id: Date.now(), type: isTopUp ? '增值' : '兌現', amount: isTopUp ? amount : -amount, time: now() })
      persist()
      uni.showToast({ title: isTopUp ? '增值成功' : '兌現成功', icon: 'success' })
    }
  })
}
const showRecords = () => { recordsVisible.value = true }
const openSettings = () => uni.showActionSheet({ itemList: ['付款設定', '貨幣設定', '交易通知'], success: () => uni.showToast({ title: '設定已保存', icon: 'success' }) })
const goBack = () => closeCachedPage('/pages/trips/trips')
</script>

<style scoped>
:global(html),:global(body),:global(#app){width:100%;min-width:0;height:100%;margin:0;overflow:hidden;overscroll-behavior:none}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;border-radius:35px;background:#F0F2F5;color:#38434A;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100vh / 932px)));transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center}.header{position:absolute;top:0;left:0;width:430px;height:154px;overflow:hidden;border-radius:25px;background:#fff}.back{position:absolute;top:53px;left:26px;width:26px;height:39px;padding:7px;box-sizing:border-box}.title{position:absolute;top:56px;left:50%;transform:translateX(-50%);font-size:18px;font-weight:500}.balance-card{position:absolute;top:115px;left:15px;width:400px;height:120px;overflow:hidden;border-radius:25px;background:linear-gradient(180deg,#285CFC 113.33%,#758295 213.33%);box-shadow:0 4px 4px rgba(0,0,0,.25);color:#fff}.balance-label{position:absolute;top:14px;left:30px;color:#D9D9D9;font-size:14px;font-weight:350}.balance{position:absolute;top:31px;left:30px;font-size:40px;font-weight:700;line-height:normal}.fare-balance{position:absolute;top:93px;left:30px;font-size:14px;font-weight:500}.actions{position:absolute;top:255px;left:33px;width:364px;height:45px;display:flex;gap:10px}.action{width:177px;height:45px;display:flex;align-items:center;justify-content:center;border-radius:10px;font-size:16px;font-weight:500}.withdraw{background:#fff}.top-up{background:#285CFC;color:#fff}.records-link{position:absolute;top:325px;left:0;width:430px;height:50px;display:flex;align-items:center;background:#fff;box-sizing:border-box;padding-left:30px;font-size:16px;font-weight:350}.records-link image{position:absolute;right:17px;width:84px;height:26px}.records-panel{position:absolute;top:385px;left:15px;width:400px;max-height:260px;overflow:hidden;border-radius:10px;background:#fff}.records-heading,.record-row{height:50px;display:flex;align-items:center;justify-content:space-between;padding:0 15px;border-bottom:1px solid #E6E8EC;box-sizing:border-box}.records-heading{font-size:15px;font-weight:700}.records-heading text:last-child{color:#285CFC;font-size:13px}.empty-records{height:80px;display:flex;align-items:center;justify-content:center;color:#758295;font-size:14px}.record-row>view{display:flex;flex-direction:column}.record-type{font-size:14px;font-weight:500}.record-time{margin-top:2px;color:#758295;font-size:10px}.positive{color:#285CFC}.negative{color:#38434A}.settings{position:absolute;top:800px;left:187px;width:57px;height:23px;display:flex;align-items:center;gap:5px;font-size:16px;font-weight:700}.settings image{width:20px;height:20px;flex:none}

@media (max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale, 1));transform-origin:top left}.settings{top:auto;bottom:24px}}
</style>
