<template>
  <view class="page">
    <view class="profile-header">
      <text class="profile-title">Profile</text>
      <image class="notification" src="https://www.figma.com/api/mcp/asset/4d6a42f5-3a24-4d3c-a5dc-afb90380e49c.svg" mode="aspectFit" />
      <text class="greeting">Hi, Jonhn</text>
      <view class="bell"><image src="https://www.figma.com/api/mcp/asset/955b3209-5aba-48f4-8ae7-7e486164b3e8.svg" mode="aspectFit" /><text>2</text></view>
    </view>
    <view class="upgrade card"><image src="https://www.figma.com/api/mcp/asset/a55b3466-e482-4458-8d2b-ffbcae9ce019.svg" mode="aspectFit" /><text>升級會員</text></view>
    <view class="wallet card">
      <view class="stats"><view><text class="value">$ 1000.00</text><text>餘額</text></view><view><text class="value">0</text><text>里程</text></view><view><text class="value">0</text><text>優惠券</text></view></view>
      <view class="wallet-divider" /><view class="wallet-link"><image src="https://www.figma.com/api/mcp/asset/7126dd1b-1de3-47c9-8876-6473a80dbe05.svg" mode="aspectFit" /><text>我的錢包</text></view><view class="detail">詳細 <text>›</text></view>
    </view>
    <view class="orders card"><view class="order-item"><image src="https://www.figma.com/api/mcp/asset/341222b9-b4cd-420e-b0cb-e388414989da.svg" mode="aspectFit" /><text>全部訂單</text></view><view class="order-item"><image src="https://www.figma.com/api/mcp/asset/ed18a54d-b51d-4a02-9bb8-c976f36c77ac.svg" mode="aspectFit" /><text>待出行</text></view><view class="order-item"><image src="https://www.figma.com/api/mcp/asset/d9fc5d6b-60bf-4a79-97aa-fd8314c3c5ca.svg" mode="aspectFit" /><text>收藏</text></view></view>
    <view class="common card"><view v-for="item in commonItems" :key="item.label" class="common-item"><image :src="item.icon" mode="aspectFit" /><text>{{ item.label }}</text></view></view>
    <view class="bottom-bar">    <view class="nav-link" @tap="goHome"><image src="https://www.figma.com/api/mcp/asset/09c8680c-e336-4756-919d-f0bad41a007f.svg" mode="aspectFit" /></view><view class="nav-link active"><image src="https://www.figma.com/api/mcp/asset/32fe6490-7ed6-43a5-b30f-8b911455c536.svg" mode="aspectFit" /></view></view>
  </view>
</template>

<script setup lang="ts">
const commonItems = [
  { label: '常用資料', icon: 'https://www.figma.com/api/mcp/asset/5782785d-6840-4493-b8c1-09cbf3d4a37b.svg' },
  { label: '我的發布', icon: 'https://www.figma.com/api/mcp/asset/9fbf27ac-ff77-4296-8309-49ff10617b98.svg' },
  { label: '邀請好友', icon: 'https://www.figma.com/api/mcp/asset/c7e6c8d0-b886-4bfd-ad24-29c404d761e6.svg' },
  { label: '聯繫客服', icon: '/static/customer-service.svg' },
  { label: '我的銀行卡', icon: 'https://www.figma.com/api/mcp/asset/2fc6deeb-b529-47b5-8449-064485295923.svg' },
  { label: '我的投訴', icon: 'https://www.figma.com/api/mcp/asset/49ed6096-7a30-45d7-b0e2-4cc2d53c6099.svg' },
  { label: '意見反饋', icon: 'https://www.figma.com/api/mcp/asset/c314bc71-edfa-4471-84f6-fa31ecbc4ff8.svg' }
]
const goHome = () => uni.reLaunch({ url: '/pages/index/index' })
</script>

<style scoped>
.page { position: relative; width: 430px; height: 932px; min-height: 0; margin: 0 auto; overflow: hidden; background: #F0F2F5; border-radius: 35px; box-sizing: border-box; color: #38434A; font-family: 'Noto Sans TC', sans-serif; zoom: min(1, calc(100vw / 430px), calc(100vh / 932px)); }
.profile-header { position:absolute; top:0; left:0; width:430px; height:260px; background:#56657E; border-radius:35px; overflow:hidden; color:#fff; }.profile-title{position:absolute;top:60px;left:calc(50% - 33px);font-size:20px;font-weight:700}.greeting{position:absolute;top:168px;left:calc(50% - 43px);font-size:18px;font-weight:700}.notification{position:absolute;top:168px;left:376px;width:25px;height:26px}.bell{position:absolute;top:168px;left:30px;width:25px;height:25px}.bell image{width:25px;height:25px}.bell text{position:absolute;top:-2px;right:1px;color:#fff;font-size:10px;font-weight:900}.card{position:absolute;left:15px;width:400px;background:#fff;border-radius:25px;box-sizing:border-box}.upgrade{top:217px;height:65px;display:flex;align-items:center;padding-left:35px;gap:19px;box-shadow:0 4px 4px rgba(0,0,0,.25)}.upgrade image{width:34px;height:30px}.upgrade text{font-size:14px}.wallet{top:292px;height:125px;box-shadow:0 4px 4px rgba(0,0,0,.25)}.stats{position:absolute;top:19px;left:39px;width:322px;display:flex;justify-content:space-between;text-align:center;font-size:14px}.stats view{display:flex;flex-direction:column;gap:2px;min-width:58px}.value{font-size:12px;font-weight:700;color:#285CFC}.wallet-divider{position:absolute;top:66px;left:10px;width:380px;border-top:1px solid #BECCE3}.wallet-link{position:absolute;top:76px;left:35px;display:flex;align-items:center;gap:19px;font-size:14px}.wallet-link image{width:34px;height:30px}.detail{position:absolute;top:78px;right:46px;color:#285CFC;font-size:14px}.detail text{font-size:22px;vertical-align:-1px}.orders{top:calc(50% - 38.5px);height:109px;display:flex;align-items:center;gap:70px;padding:23px 60px}.order-item{height:63px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-size:14px;white-space:nowrap}.order-item image{width:38px;height:38px}.common{top:546px;height:265px}.common-item{position:absolute;width:60px;height:49px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-size:12px;white-space:nowrap}.common-item image{width:30px;height:30px}.common-item:nth-child(1){left:23px;top:23px}.common-item:nth-child(2){left:117px;top:23px}.common-item:nth-child(3){left:23px;top:92px}.common-item:nth-child(4){left:327px;top:23px}.common-item:nth-child(5){left:215px;top:23px}.common-item:nth-child(6){left:117px;top:92px}.common-item:nth-child(7){left:225px;top:92px}.bottom-bar{position:absolute;bottom:0;left:0;width:430px;height:102px;padding:10px;box-sizing:border-box;background:#fff;border-radius:0 0 22px 22px;display:flex;align-items:center;justify-content:center;gap:60px}.nav-link{width:28px;height:28px}.nav-link image{width:28px;height:28px}.active{opacity:1}
</style>
