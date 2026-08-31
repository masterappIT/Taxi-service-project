<template>
  <view class="app-shell">
    <slot />
    <view v-if="showSplash" class="splash-screen" aria-label="Taxi Cross Border 啟動畫面">
      <image class="splash-circle splash-circle-left" src="/static/splash/ellipse-left.svg" mode="aspectFit" />
      <image class="splash-circle splash-circle-right" src="/static/splash/ellipse-right.svg" mode="aspectFit" />
      <image class="splash-wave" src="/static/splash/wave.svg" mode="scaleToFill" />
      <image class="splash-wave-bottom" src="/static/splash/wave-bottom.svg" mode="scaleToFill" />
      <image class="splash-logo" src="/static/splash/launch.png" mode="widthFix" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return { showSplash: true }
  },
  onLaunch() {
    console.log('App Launch')
    setTimeout(() => {
      this.showSplash = false
    }, 1600)
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
}
</script>

<style>
.app-shell,
.splash-screen {
  width: 100%;
  min-height: 100vh;
}
.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
  background: #56657e;
}
.splash-circle,
.splash-wave,
.splash-wave-bottom,
.splash-logo {
  position: absolute;
  display: block;
}
.splash-circle {
  width: 211px;
  height: 211px;
}
.splash-circle-left {
  left: -76px;
  top: 255px;
}
.splash-circle-right {
  right: -67px;
  top: 466px;
}
.splash-wave {
  left: 50%;
  bottom: 0;
  width: 430px;
  height: 204px;
  transform: translateX(-50%);
}
.splash-wave-bottom {
  left: 50%;
  bottom: 0;
  width: 430px;
  height: 74px;
  transform: translateX(-50%);
}
.splash-logo {
  left: 50%;
  top: 50%;
  width: 250px;
  height: auto;
  transform: translate(-50%, -50%);
}
</style>
