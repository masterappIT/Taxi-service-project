<template>
  <view class="page">
    <ProfileHeader
      :unread-count="2"
      @notifications="comingSoon('消息')"
      @settings="comingSoon('設定')"
      @avatar="comingSoon('頭像')"
    />
    <view class="upgrade-position"><UpgradeCard @tap="openMembership" /></view>
    <view class="wallet-position"><WalletCard @tap="handleWalletAction" /></view>
    <view class="orders-position" @tap="comingSoon('訂單')"><OrdersCard /></view>
    <view class="common-position" @tap="comingSoon('常用功能')"><CommonActions /></view>
    <ProfileBottomNav @home="goHome" />
  </view>
</template>

<script setup lang="ts">
import ProfileHeader from '../../components/profile/ProfileHeader.vue'
import UpgradeCard from '../../components/profile/UpgradeCard.vue'
import WalletCard from '../../components/profile/WalletCard.vue'
import OrdersCard from '../../components/profile/OrdersCard.vue'
import CommonActions from '../../components/profile/CommonActions.vue'
import ProfileBottomNav from '../../components/profile/ProfileBottomNav.vue'

const goHome = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }
  uni.reLaunch({ url: '/pages/index/index' })
}
const openMembership = () => uni.navigateTo({ url: '/pages/membership/membership' })
const handleWalletAction = (name: string) => name === '里程' ? uni.navigateTo({ url: '/pages/mileage/mileage' }) : comingSoon(name)
const comingSoon = (name: string) => uni.showToast({ title: `${name}功能開發中`, icon: 'none' })
</script>

<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden;overscroll-behavior:none;touch-action:none}
:global(body){position:fixed;inset:0}
.page{position:fixed;top:50%;left:50%;width:430px;height:932px;min-height:0;margin:0;overflow:hidden;background:#F0F2F5;border-radius:35px;box-sizing:border-box;color:#38434A;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100vh / 932px)));transform-origin:center center}.upgrade-position,.wallet-position,.orders-position,.common-position{position:absolute;left:15px;width:400px}.upgrade-position{top:217px}.wallet-position{top:292px}.orders-position{top:calc(50% - 38.5px)}.common-position{top:546px}
</style>
