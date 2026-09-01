<template>
  <view class="bottom-nav" aria-label="首頁導覽">
    <image class="bottom-art" src="/static/figma-home.svg" mode="widthFix" />
    <view class="nav-hit nav-services" @tap="$emit('services')" />
    <view class="nav-hit nav-trips" @tap="$emit('trips')" />
  </view>
</template>

<script setup lang="ts">
defineEmits<{ services: []; trips: [] }>()
</script>

<style scoped>
.bottom-nav{position:absolute;left:0;right:0;bottom:0;height:102px;z-index:4;overflow:hidden}.bottom-art{position:absolute;left:0;bottom:0;width:100%;height:auto;display:block;pointer-events:none}.nav-hit{position:absolute;top:0;height:100%;pointer-events:auto}.nav-services{left:0;width:48%}.nav-trips{right:0;width:48%}
</style>
