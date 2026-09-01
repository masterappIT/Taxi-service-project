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
  },
  mounted() {
    setTimeout(() => {
      this.showSplash = false
    }, 2200)
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
.app-shell {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: 100dvh;
  background: #56657e;
  overflow: hidden;
  overscroll-behavior: none;
  touch-action: none;
}
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
  animation: splash-enter 300ms ease-out both;
}
.splash-screen::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.04);
  animation: splash-shimmer 1.8s ease-in-out infinite alternate;
}
.splash-circle {
  animation: splash-float 2.4s ease-in-out infinite alternate;
}
.splash-wave {
  animation: splash-wave 2.8s ease-in-out infinite alternate;
}
.splash-wave-bottom {
  animation: splash-wave-bottom 2.2s ease-in-out infinite alternate;
}
.splash-logo {
  animation: splash-logo 900ms ease-out both;
}
@keyframes splash-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes splash-shimmer {
  from { opacity: 0.35; }
  to { opacity: 1; }
}
@keyframes splash-float {
  from { transform: translateY(0); }
  to { transform: translateY(-8px); }
}
@keyframes splash-wave {
  from { transform: translateX(-50%) translateY(0); }
  to { transform: translateX(-50%) translateY(-10px); }
}
@keyframes splash-wave-bottom {
  from { transform: translateX(-50%) translateY(0); }
  to { transform: translateX(-50%) translateY(-5px); }
}
@keyframes splash-logo {
  from { opacity: 0; transform: translate(-50%, -46%) scale(0.92); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
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
