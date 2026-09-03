<template>
  <view class="booking-mask" @tap="close">
    <view class="booking-sheet" @tap.stop>
      <view class="sheet-head"><text class="sheet-title">預約時間</text><text class="sheet-close" @tap="close">×</text></view>
      <scroll-view class="date-options" scroll-x :show-scrollbar="false">
        <view class="date-options-row">
          <view
            v-for="(option, index) in dateOptions"
            :key="option"
            class="option-chip date-chip"
            :class="{ selected: index === dateIndex }"
            @tap.stop="selectDate(index)"
          >{{ option }}</view>
        </view>
      </scroll-view>
      <scroll-view class="time-options" scroll-y :show-scrollbar="false">
        <view class="time-options-grid">
          <view
            v-for="(option, index) in timeOptions"
            :key="option"
            class="option-chip time-chip"
            :class="{ selected: index === timeIndex }"
            @tap.stop="selectTime(index)"
          >{{ option }}</view>
        </view>
      </scroll-view>
      <text class="booking-hint">可預約未來 30 天行程，最早提前 1 小時</text>
      <button class="confirm-button" @tap="confirm">確認預約時間</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

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
const selectDate = (index: number) => {
  dateIndex.value = index
  timeIndex.value = 0
}
const selectTime = (index: number) => { timeIndex.value = index }
const close = () => emit('close')
const confirm = () => {
  const date = dates[dateIndex.value]
  emit('confirm', `${date.getMonth() + 1}月${date.getDate()}日 ${timeOptions.value[timeIndex.value]}`)
}
</script>

<style scoped>
.booking-mask{position:absolute;inset:0;z-index:40;background:rgba(20,28,42,.42);display:flex;align-items:flex-end}.booking-sheet{width:430px;height:360px;padding:22px 20px 28px;box-sizing:border-box;border-radius:25px 25px 0 0;background:#fff;color:#38434a;box-shadow:0 -8px 24px rgba(40,53,76,.18);display:flex;flex-direction:column}.sheet-head{display:flex;align-items:center;justify-content:space-between;flex:none}.sheet-title{font-size:20px;font-weight:600}.sheet-close{font-size:28px;line-height:20px;color:#8995a8}.date-options{margin-top:22px;white-space:nowrap;flex:none}.date-options-row{display:flex;gap:8px}.time-options{height:auto;min-height:0;flex:1;margin-top:12px}.time-options-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding-bottom:2px}.option-chip{box-sizing:border-box;border:1px solid #d9dfe8;border-radius:10px;background:#f7f8fa;color:#38434a;text-align:center}.date-chip{display:inline-flex;align-items:center;height:42px;padding:0 14px;font-size:14px}.time-chip{height:40px;line-height:38px;font-size:14px}.option-chip.selected{border-color:#285cfc;background:#285cfc;color:#fff}.booking-hint{display:block;margin-top:12px;color:#8995a8;font-size:12px;flex:none}.confirm-button{height:48px;margin-top:20px;border:0;border-radius:12px;background:#285cfc;color:#fff;font-size:16px;line-height:48px;flex:none}.confirm-button::after{border:0}
</style>
