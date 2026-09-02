<template>
  <view class="page">
    <view class="header">
      <image class="back" src="/static/messages/back.svg" mode="aspectFit" @tap="goBack" />
      <text class="header-title">個人帳戶</text>
      <view class="tabs">
        <text class="tab active">個人資料</text>
        <text class="tab" @tap="comingSoon('安全')">安全</text>
        <text class="tab" @tap="comingSoon('私隱和其他')">私隱和其他</text>
        <view class="active-line" />
      </view>
    </view>
    <view class="avatar-wrap" @tap="chooseAvatar"><image class="avatar" :src="avatarUrl || '/static/account/avatar.svg'" mode="aspectFill" /></view>
    <view class="form-card">
      <view class="field" @tap="editText('姓名', 'name')"><image src="/static/account/name.svg" mode="aspectFit" /><text>姓名</text><text class="value">{{ form.name }}</text></view>
      <view class="field" @tap="editText('顯示名稱', 'displayName')"><image src="/static/account/display-name.svg" mode="aspectFit" /><text>顯示名稱</text><text class="value">{{ form.displayName }}</text></view>
      <view class="field"><image src="/static/account/gender.svg" mode="aspectFit" /><text>性別</text><view class="gender"><text :class="{ selected: form.gender === '先生' }" @tap="form.gender = '先生'">先生</text><text :class="{ selected: form.gender === '女士' }" @tap="form.gender = '女士'">女士</text></view></view>
      <view class="field" @tap="chooseRegion"><image src="/static/account/region.svg" mode="aspectFit" /><text>地區</text><text class="value">{{ form.region }}</text></view>
      <picker mode="date" :value="form.birthday" @change="changeBirthday"><view class="field"><image src="/static/account/birthday.svg" mode="aspectFit" /><text>生日</text><text class="value">{{ form.birthday }}</text></view></picker>
    </view>
    <view class="save" @tap="save"><text>保存</text></view>
  </view>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const stored = uni.getStorageSync('account-profile') || {}
const avatarUrl = ref<string>(stored.avatarUrl || '')
const form = reactive({ name: stored.name || 'John', displayName: stored.displayName || 'John', gender: stored.gender || '先生', region: stored.region || '香港', birthday: stored.birthday || '1990-01-01' })
const editText = (title: string, key: 'name' | 'displayName') => uni.showModal({ title, editable: true, placeholderText: `請輸入${title}`, content: form[key], success: ({ confirm, content }) => { if (confirm && content?.trim()) form[key] = content.trim() } })
const chooseRegion = () => uni.showActionSheet({ itemList: ['香港', '澳門', '中國內地'], success: ({ tapIndex }) => { form.region = ['香港', '澳門', '中國內地'][tapIndex] } })
const changeBirthday = (event: { detail: { value: string } }) => { form.birthday = event.detail.value }
const chooseAvatar = () => uni.chooseImage({ count: 1, sizeType: ['compressed'], sourceType: ['album', 'camera'], success: ({ tempFilePaths }) => { avatarUrl.value = tempFilePaths[0] } })
const save = () => { uni.setStorageSync('account-profile', { ...form, avatarUrl: avatarUrl.value }); uni.showToast({ title: '已保存', icon: 'success' }) }
const comingSoon = (name: string) => uni.showToast({ title: `${name}功能開發中`, icon: 'none' })
const goBack = () => { if (getCurrentPages().length > 1) return uni.navigateBack({ delta: 1 }); uni.reLaunch({ url: '/pages/trips/trips' }) }
</script>
<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden;overscroll-behavior:none}:global(body){position:fixed;inset:0}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;border-radius:35px;background:#F0F2F5;color:#38434A;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100vh / 932px)));transform-origin:center}.header{position:absolute;top:0;left:0;width:430px;height:155px;overflow:hidden;border-radius:25px;background:#fff}.back{position:absolute;top:53px;left:26px;width:26px;height:39px;padding:7px;box-sizing:border-box}.header-title{position:absolute;top:56px;left:50%;transform:translateX(-50%);font-size:18px;font-weight:500}.tabs{position:absolute;bottom:0;left:37px;width:356px;height:33px;display:flex;justify-content:space-between}.tab{font-size:16px;font-weight:700}.tab.active{color:#285CFC}.active-line{position:absolute;bottom:0;left:0;width:64px;height:2px;background:#285CFC}.avatar-wrap{position:absolute;top:175px;left:175px;width:80px;height:80px;border-radius:50%;overflow:hidden}.avatar{width:80px;height:80px}.form-card{position:absolute;top:275px;left:15px;width:400px;height:250px;overflow:hidden;border-radius:10px;background:#fff}.field{display:flex;height:50px;align-items:center;border-bottom:1px solid #D9D9D9;box-sizing:border-box}.field:last-child{border-bottom:0}.field image{width:20px;height:20px;margin-left:30px;margin-right:10px}.field>text:not(.value){font-size:16px;font-weight:500}.value{margin-left:auto;margin-right:30px;color:#285CFC;font-size:14px!important;font-weight:600!important}.gender{display:flex;gap:20px;margin-left:auto;margin-right:30px;font-size:14px;font-weight:700}.gender .selected{color:#285CFC}.save{position:absolute;top:679px;left:36px;width:357px;height:50px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#285CFC;color:#fff;font-size:16px;font-weight:500}
</style>
