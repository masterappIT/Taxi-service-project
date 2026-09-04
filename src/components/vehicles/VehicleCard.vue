<template>
  <view class="vehicle-card" @tap="selectCard">
    <view v-if="vehicle.brand" class="vehicle-name"><text class="brand">{{ vehicle.brand }}</text><text> {{ vehicle.model }}</text><text class="series">{{ vehicle.series }}</text></view>
    <image v-if="vehicle.selectable" class="radio" :src="selected ? '/static/vehicles/radio-selected.svg' : '/static/vehicles/radio.svg'" mode="aspectFit" />
    <view class="vehicle-image-box"><image class="vehicle-image" :class="vehicle.imageClass" :src="vehicle.image" mode="aspectFill" /></view>
    <view class="spec seat"><image src="/static/vehicles/seat.svg" mode="aspectFit" /><text>{{ vehicle.seats }}座</text></view>
    <view class="spec color">{{ vehicle.colorLabel || '不限颜色' }}</view>
    <view v-if="vehicle.modelChoice" class="spec model-choice">{{ vehicle.modelLabel || '不限車款' }}</view>
    <view class="price">RMB¥{{ vehicle.price }}</view><text class="discount">已減 ¥{{ vehicle.discount ?? 200 }}</text>
  </view>
</template>
<script setup lang="ts">
export interface VehicleCardData { id: string; brand?: string; model?: string; series?: string; seats: number; price: number; image: string; selectable?: boolean; modelChoice?: boolean; colorLabel?: string; modelLabel?: string; discount?: number }
const props = defineProps<{ vehicle: VehicleCardData; selected: boolean }>()
const emit = defineEmits<{ select: [id: string] }>()
const selectCard = () => emit('select', props.vehicle.id)
</script>
<style scoped>
.vehicle-card{position:relative;width:380px;height:180px;margin:0 auto 10px;overflow:hidden;border-radius:25px;background:#fff;color:#25292f}.vehicle-name{position:absolute;z-index:2;top:43px;left:27px;width:95px;font-size:8px;font-weight:900;line-height:12px}.vehicle-name .brand{font-weight:100}.vehicle-name .series{display:block;margin-left:7px;font-size:12px;line-height:17px}.radio{position:absolute;z-index:2;top:24px;left:43px;width:20px;height:20px}.vehicle-image-box{position:absolute;top:0;right:0;width:230px;height:153px;display:flex;align-items:center;justify-content:center;overflow:hidden}.vehicle-image{display:block;width:100%;height:100%;object-fit:cover}.vehicle-image.tesla-s{object-position:center center}.spec{position:absolute;z-index:2;top:141px;height:20px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;border-radius:25px;background:#d9d9d9;color:#000;font-size:10px;line-height:14px}.seat{left:27px;width:54px}.seat image{width:16px;height:16px;margin-right:6px}.color{left:85px;width:54px;font-weight:350}.model-choice{left:145px;width:54px;background:#fff;font-weight:700}.price{position:absolute;z-index:2;top:141px;left:255px;width:98px;height:20px;border-radius:25px;background:#1effaa;font-size:14px;font-weight:700;line-height:20px;text-align:center}.discount{position:absolute;z-index:2;top:161px;left:276px;color:#f95c5c;font-size:12px;line-height:17px}
</style>
