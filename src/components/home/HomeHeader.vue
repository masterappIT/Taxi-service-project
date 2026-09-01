<template>
  <view class="home-header" aria-label="首頁頂部資訊">
    <image class="topbar-art" src="/static/topbar.svg" mode="widthFix" />
    <view v-if="logoSrc || $slots.logo" class="logo-slot" aria-label="品牌 Logo">
      <slot name="logo">
        <image v-if="logoSrc" class="logo-image" :src="logoSrc" mode="contain" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  /** 可替換的品牌 Logo 資源；也可改用 logo slot。 */
  logoSrc?: string
}>()
</script>

<style scoped>
.home-header{position:absolute;inset:0;z-index:3;pointer-events:none}.topbar-art{position:absolute;top:0;left:0;width:100%;height:auto;display:block}.logo-slot{position:absolute;top:18px;left:50%;width:108px;height:52px;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;pointer-events:auto}.logo-image{width:100%;height:100%;display:block}
</style>
