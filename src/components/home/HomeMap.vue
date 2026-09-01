<template>
  <view class="map-layer" aria-label="地圖區域">
    <!-- #ifdef H5 -->
    <iframe
      class="google-map"
      src="https://maps.google.com/maps?q=Hong%20Kong%20West%20Kowloon%20Station&z=12&output=embed"
      title="Google Maps"
      loading="lazy"
    />
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
    <view class="map-fallback" aria-label="地圖預覽" />
    <!-- #endif -->
    <image class="design-art" src="/static/figma-home.svg" mode="widthFix" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mapVisible = ref(true)
const handleMapError = () => {
  mapVisible.value = false
  uni.showToast({ title: 'Google Maps 暫時無法載入', icon: 'none' })
}
</script>

<style scoped>
.map-layer{position:absolute;inset:0;z-index:0;pointer-events:none}.design-art{position:absolute;inset:0;z-index:1;display:block;width:100%;height:100%;pointer-events:none}.google-map,.map-fallback{position:absolute;z-index:0;top:11.37%;left:0;width:100%;height:55.69%;border:0;opacity:.98}.map-fallback{pointer-events:none}
</style>
