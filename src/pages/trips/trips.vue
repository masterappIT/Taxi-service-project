<template>
  <view class="page">
    <ProfileHeader
      :avatar-url="avatarUrl"
      :display-name="displayName"
      :unread-count="unreadCount"
      @notifications="openMessages"
      @settings="comingSoon('設定')"
      @avatar="openAccount"
    />
    <view class="upgrade-position"><UpgradeCard @tap="openMembership" /></view>
    <view class="wallet-position"><WalletCard :balance="walletBalance" @select="handleWalletAction" /></view>
    <view class="orders-position" @tap="comingSoon('訂單')"><OrdersCard /></view>
    <view class="common-position"><CommonActions @select="handleCommonAction" /></view>
    <ProfileBottomNav @home="goHome" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import ProfileHeader from '../../components/profile/ProfileHeader.vue'
import UpgradeCard from '../../components/profile/UpgradeCard.vue'
import WalletCard from '../../components/profile/WalletCard.vue'
import OrdersCard from '../../components/profile/OrdersCard.vue'
import CommonActions from '../../components/profile/CommonActions.vue'
import ProfileBottomNav from '../../components/profile/ProfileBottomNav.vue'

const totalMessages = 4
const unreadCount = ref(totalMessages)
const avatarUrl = ref('')
const displayName = ref('John')
const walletBalance = ref(0)

onShow(() => {
  const profile = uni.getStorageSync('account-profile')
  avatarUrl.value = profile?.avatarUrl || ''
  displayName.value = profile?.displayName || 'John'
  const saved = uni.getStorageSync('read-message-types')
  const readCount = Array.isArray(saved) ? new Set(saved).size : 0
  unreadCount.value = Math.max(0, totalMessages - readCount)
  const wallet = uni.getStorageSync('wallet-state')
  walletBalance.value = Number(wallet?.withdrawable) || 0
})

const goHome = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }
  uni.reLaunch({ url: '/pages/index/index' })
}
const openMessages = () => uni.navigateTo({ url: '/pages/messages/messages' })
const openAccount = () => uni.navigateTo({ url: '/pages/account/account' })
const openMembership = () => uni.navigateTo({ url: '/pages/membership/membership' })
const handleWalletAction = (name: string) => {
  if (name === '里程') return uni.navigateTo({ url: '/pages/mileage/mileage' })
  if (name === '錢包' || name === '錢包詳細' || name === '餘額') return uni.navigateTo({ url: '/pages/wallet/wallet' })
  comingSoon(name)
}
const handleCommonAction = (name: string) => name === '邀請好友' ? uni.navigateTo({ url: '/pages/invite/invite' }) : comingSoon(name)
const comingSoon = (name: string) => uni.showToast({ title: `${name}功能開發中`, icon: 'none' })
</script>

<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden;overscroll-behavior:none;touch-action:none}
:global(body){position:fixed;inset:0}
.page{position:fixed;top:50%;left:50%;width:430px;height:932px;min-height:0;margin:0;overflow:hidden;background:#F0F2F5;border-radius:35px;box-sizing:border-box;color:#38434A;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100vh / 932px)));transform-origin:center center}.upgrade-position,.wallet-position,.orders-position,.common-position{position:absolute;left:15px;width:400px}.upgrade-position{top:217px}.wallet-position{top:292px}.orders-position{top:calc(50% - 38.5px)}.common-position{top:546px}
</style>
