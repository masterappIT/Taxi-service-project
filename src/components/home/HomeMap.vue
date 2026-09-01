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
    <map class="native-map" :latitude="22.3048" :longitude="114.1615" :scale="12" />
    <!-- #endif -->
  </view>
</template>

<style scoped>
.map-layer{position:absolute;left:0;top:106px;width:430px;height:519px;z-index:0;overflow:hidden;background:#edf0f2;pointer-events:none}.google-map,.native-map{position:absolute;inset:0;width:100%;height:100%;border:0}
</style>
