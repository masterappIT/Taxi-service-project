<template>
  <view class="map-layer" aria-label="地圖區域">
    <!-- #ifdef H5 -->
    <view class="map-fallback" aria-label="地圖區域">
      <text>香港 · 九龍站</text>
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
    <map class="native-map" :latitude="22.3048" :longitude="114.1615" :scale="12" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
</script>

<style scoped>
.map-layer{position:absolute;left:0;top:106px;width:430px;height:519px;z-index:0;overflow:hidden;background:#edf0f2;pointer-events:none}.native-map{position:absolute;inset:0;width:100%;height:100%;border:0}.map-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#e6edf0,#cbd8dc);color:#53636b;font-size:18px;font-weight:600}
</style>
