<template>
  <view class="map-actions" aria-label="地圖操作">
    <view class="hit hit-location" @tap="$emit('location')" />
    <view class="hit hit-map" @tap="$emit('map')" />
    <view class="hit hit-current-location" @tap="$emit('location')" />
  </view>
</template>
<script setup lang="ts">
defineEmits<{ location: []; map: [] }>()
</script>
<style scoped>
.map-actions{position:absolute;inset:0;z-index:4}.hit{position:absolute}.hit-location{top:0;right:0;width:32%;height:13%}.hit-map{top:11.3%;left:0;width:100%;height:55%}.hit-current-location{top:13%;right:4%;width:13%;height:6%}
</style>
