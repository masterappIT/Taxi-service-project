<template>
  <view class="booking-mask" @tap.self="close">
    <view class="booking-sheet">
      <view class="sheet-head"><text class="sheet-title">預約時間</text><text class="sheet-close" @tap="close">×</text></view>
      <view class="picker-columns">
        <picker class="picker-column" mode="selector" :range="dateOptions" :value="dateIndex" @change="dateIndex = Number($event.detail.value)">
          <view class="picker-value"><text>{{ dateOptions[dateIndex] }}</text><text class="picker-chevron">⌄</text></view>
        </picker>
        <picker class="picker-column" mode="selector" :range="timeOptions" :value="timeIndex" @change="timeIndex = Number($event.detail.value)">
          <view class="picker-value"><text>{{ timeOptions[timeIndex] }}</text><text class="picker-chevron">⌄</text></view>
        </picker>
      </view>
      <text class="booking-hint">可預約未來 30 天行程，最早提前 1 小時</text>
      <button class="confirm-button" @tap="confirm">確認預約時間</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const emit = defineEmits<{ close: []; confirm: [value: string] }>()
const now = new Date()
const earliest = new Date(now.getTime() + 60 * 60 * 1000)
earliest.setMinutes(Math.ceil(earliest.getMinutes() / 30) * 30, 0, 0)
const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
const dates = Array.from({ length: 30 }, (_, index) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + index))
const dateOptions = dates.map((date, index) => `${index === 0 ? '今天' : index === 1 ? '明天' : ''}${index < 2 ? ' · ' : ''}${date.getMonth() + 1}月${date.getDate()}日`)
const initialDateIndex = Math.min(29, Math.max(0, Math.floor((new Date(earliest.getFullYear(), earliest.getMonth(), earliest.getDate()).getTime() - startOfToday.getTime()) / 86400000)))
const dateIndex = ref(initialDateIndex)
const timeIndex = ref(0)
const timeOptions = computed(() => {
  const selected = dates[dateIndex.value]
  const isEarliestDay = selected.getFullYear() === earliest.getFullYear() && selected.getMonth() === earliest.getMonth() && selected.getDate() === earliest.getDate()
  const firstMinutes = isEarliestDay ? earliest.getHours() * 60 + earliest.getMinutes() : 0
  return Array.from({ length: Math.floor((24 * 60 - firstMinutes) / 30) }, (_, index) => {
    const minutes = firstMinutes + index * 30
    return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
  })
})
watch(dateIndex, () => { timeIndex.value = 0 })
const close = () => emit('close')
const confirm = () => {
  const date = dates[dateIndex.value]
  emit('confirm', `${date.getMonth() + 1}月${date.getDate()}日 ${timeOptions.value[timeIndex.value]}`)
}
</script>

<style scoped>
.booking-mask{position:absolute;inset:0;z-index:40;background:rgba(20,28,42,.42);display:flex;align-items:flex-end}.booking-sheet{width:430px;min-height:265px;padding:22px 20px 28px;box-sizing:border-box;border-radius:25px 25px 0 0;background:#fff;color:#38434a;box-shadow:0 -8px 24px rgba(40,53,76,.18)}.sheet-head{display:flex;align-items:center;justify-content:space-between}.sheet-title{font-size:20px;font-weight:600}.sheet-close{font-size:28px;line-height:20px;color:#8995a8}.picker-columns{display:flex;gap:12px;margin-top:22px}.picker-column{flex:1}.picker-value{height:48px;padding:0 14px;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;border:1px solid #d9dfe8;border-radius:12px;background:#f7f8fa;font-size:16px}.picker-chevron{color:#8995a8;font-size:18px}.booking-hint{display:block;margin-top:12px;color:#8995a8;font-size:12px}.confirm-button{height:48px;margin-top:20px;border:0;border-radius:12px;background:#285cfc;color:#fff;font-size:16px;line-height:48px}.confirm-button::after{border:0}
</style>
