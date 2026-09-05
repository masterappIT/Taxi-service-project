<template>
  <view class="orders-back-button" @tap="emit('tap')">
    <image :src="iconSrc" mode="aspectFit" />
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ iconSrc?: string }>(), {
  iconSrc: '/static/orders/header-decoration.svg'
})

const emit = defineEmits<{ tap: [] }>()
</script>

<style scoped>
.orders-back-button {
  position: absolute;
  top: 53px;
  left: 25px;
  width: 28px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orders-back-button image {
  width: 16px;
  height: 29px;
}
</style>
