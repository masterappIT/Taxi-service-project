<template>
  <view class="route-layer" aria-label="路線查詢">
    <view class="hit hit-origin" @tap="$emit('origin')" />
    <view class="hit hit-destination" @tap="$emit('destination')" />
    <view class="hit hit-swap" @tap="$emit('swap')" />
    <view class="hit hit-date" @tap="$emit('date')" />
    <view class="hit hit-submit" @tap="$emit('submit')" />
  </view>
</template>

<script setup lang="ts">
defineEmits<{ origin: []; destination: []; swap: []; date: []; submit: [] }>()
</script>

<style scoped>
.route-layer{position:absolute;inset:0;z-index:4}.hit{position:absolute}.hit-origin{top:64%;left:5%;width:90%;height:8%}.hit-destination{top:71%;left:5%;width:90%;height:8%}.hit-swap{top:64%;right:3%;width:18%;height:16%}.hit-date{top:78%;left:3%;width:94%;height:10%}.hit-submit{top:87%;left:3%;width:94%;height:9%}
</style>
