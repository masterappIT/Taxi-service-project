<template>
  <view class="page">
    <view class="header">
      <image class="back" src="/static/messages/back.svg" mode="aspectFit" @tap="goBack" />
      <text class="header-title">個人帳戶</text>
      <view class="tabs">
        <text class="tab" :class="{ active: activeTab === 'profile' }" @tap="activeTab = 'profile'">個人資料</text>
        <text class="tab" :class="{ active: activeTab === 'security' }" @tap="activeTab = 'security'">安全</text>
        <text class="tab" @tap="comingSoon('私隱和其他')">私隱和其他</text>
        <view class="active-line" :class="activeTab" />
      </view>
    </view>

    <template v-if="activeTab === 'profile'">
      <view class="avatar-wrap" @tap="chooseAvatar"><image class="avatar" :src="avatarUrl || '/static/account/avatar.svg'" mode="aspectFill" /></view>
      <view class="form-card">
        <view class="field" @tap="editText('姓名', 'name')"><image src="/static/account/name.svg" mode="aspectFit" /><text>姓名</text><text class="value">{{ form.name }}</text></view>
        <view class="field" @tap="editText('顯示名稱', 'displayName')"><image src="/static/account/display-name.svg" mode="aspectFit" /><text>顯示名稱</text><text class="value">{{ form.displayName }}</text></view>
        <view class="field"><image src="/static/account/gender.svg" mode="aspectFit" /><text>性別</text><view class="gender"><text :class="{ selected: form.gender === '先生' }" @tap="form.gender = '先生'">先生</text><text :class="{ selected: form.gender === '女士' }" @tap="form.gender = '女士'">女士</text></view></view>
        <view class="field" @tap="chooseRegion"><image src="/static/account/region.svg" mode="aspectFit" /><text>地區</text><text class="value">{{ form.region }}</text></view>
        <picker mode="date" :value="form.birthday" @change="changeBirthday"><view class="field"><image src="/static/account/birthday.svg" mode="aspectFit" /><text>生日</text><text class="value">{{ form.birthday }}</text></view></picker>
      </view>
      <view class="save" @tap="save"><text>保存</text></view>
    </template>

    <template v-else>
      <view class="security-card">
        <view class="security-row" @tap="editSecurity('已連接電話', 'phone')">
          <image class="security-icon phone" src="/static/security/phone.svg" mode="aspectFit" /><text class="security-label">已連接電話：</text><text class="security-value phone-value">{{ security.phone }}</text>
          <view class="verified"><image src="/static/security/verified.svg" mode="aspectFit" /><text>已獲驗證</text></view><image class="chevron" src="/static/security/chevron.svg" mode="aspectFit" />
        </view>
        <view class="security-row" @tap="editSecurity('密碼', 'password')">
          <image class="security-icon password" src="/static/security/password.svg" mode="aspectFit" /><text class="security-label">密碼：</text><text class="security-value password-value">****************</text><image class="chevron" src="/static/security/chevron.svg" mode="aspectFit" />
        </view>
        <view class="security-row" @tap="editSecurity('已連接 email', 'email')">
          <image class="security-icon email" src="/static/security/email.svg" mode="aspectFit" /><text class="security-label">已連接email：</text><text class="security-value">{{ security.email }}</text><image class="chevron" src="/static/security/chevron.svg" mode="aspectFit" />
        </view>
      </view>
      <view class="third-party-card">
        <text class="third-party-title">第三方登入帳戶</text>
        <view class="provider-row apple-row"><image class="provider-icon apple" src="/static/security/apple.svg" mode="aspectFit" /><text>Apple</text><view class="link-button linked" @tap="toggleProvider('apple')"><text>{{ security.appleLinked ? '解除連結' : '連結' }}</text></view></view>
        <view class="provider-row"><image class="provider-icon wechat" src="/static/security/wechat.svg" mode="aspectFit" /><text>Wechat</text><view class="link-button" :class="{ linked: security.wechatLinked }" @tap="toggleProvider('wechat')"><text>{{ security.wechatLinked ? '解除連結' : '連結' }}</text></view></view>
      </view>
    </template>
  </view>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
type SecurityKey = 'phone' | 'password' | 'email'
type Provider = 'apple' | 'wechat'
const stored = uni.getStorageSync('account-profile') || {}
const storedSecurity = uni.getStorageSync('account-security') || {}
const activeTab = ref<'profile' | 'security'>('profile')
const avatarUrl = ref<string>(stored.avatarUrl || '')
const form = reactive({ name: stored.name || 'John', displayName: stored.displayName || 'John', gender: stored.gender || '先生', region: stored.region || '香港', birthday: stored.birthday || '1990-01-01' })
const security = reactive({ phone: storedSecurity.phone || '+852 60556543', password: storedSecurity.password || '', email: storedSecurity.email || 'info@mail.com', appleLinked: storedSecurity.appleLinked ?? false, wechatLinked: storedSecurity.wechatLinked ?? true })
const persistSecurity = () => uni.setStorageSync('account-security', { ...security })
const editText = (title: string, key: 'name' | 'displayName') => uni.showModal({ title, editable: true, placeholderText: `請輸入${title}`, content: form[key], success: ({ confirm, content }) => { if (confirm && content?.trim()) form[key] = content.trim() } })
const editSecurity = (title: string, key: SecurityKey) => uni.showModal({ title, editable: true, placeholderText: `請輸入${title}`, content: key === 'password' ? '' : security[key], success: ({ confirm, content }) => { if (confirm && content?.trim()) { security[key] = content.trim(); persistSecurity(); uni.showToast({ title: '已更新', icon: 'success' }) } } })
const toggleProvider = (provider: Provider) => { const key = `${provider}Linked` as 'appleLinked' | 'wechatLinked'; security[key] = !security[key]; persistSecurity(); uni.showToast({ title: security[key] ? '已連結' : '已解除連結', icon: 'none' }) }
const chooseRegion = () => uni.showActionSheet({ itemList: ['香港', '澳門', '中國內地'], success: ({ tapIndex }) => { form.region = ['香港', '澳門', '中國內地'][tapIndex] } })
const changeBirthday = (event: { detail: { value: string } }) => { form.birthday = event.detail.value }
const chooseAvatar = () => uni.chooseImage({ count: 1, sizeType: ['compressed'], sourceType: ['album', 'camera'], success: ({ tempFilePaths }) => { avatarUrl.value = tempFilePaths[0] } })
const save = () => { uni.setStorageSync('account-profile', { ...form, avatarUrl: avatarUrl.value }); uni.showToast({ title: '已保存', icon: 'success' }) }
const comingSoon = (name: string) => uni.showToast({ title: `${name}功能開發中`, icon: 'none' })
const goBack = () => { if (getCurrentPages().length > 1) return uni.navigateBack({ delta: 1 }); uni.reLaunch({ url: '/pages/trips/trips' }) }
</script>
<style scoped>
:global(html),:global(body),:global(#app){width:100%;height:100%;margin:0;overflow:hidden;overscroll-behavior:none}:global(body){position:fixed;inset:0}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;border-radius:35px;background:#F0F2F5;color:#38434A;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100vh / 932px)));transform-origin:center}.header{position:absolute;top:0;left:0;width:430px;height:155px;overflow:hidden;border-radius:25px;background:#fff}.back{position:absolute;top:53px;left:26px;width:26px;height:39px;padding:7px;box-sizing:border-box}.header-title{position:absolute;top:56px;left:50%;transform:translateX(-50%);font-size:18px;font-weight:500}.tabs{position:absolute;bottom:0;left:37px;width:356px;height:33px;display:flex;justify-content:space-between}.tab{font-size:16px;font-weight:700}.tab.active{color:#285CFC}.active-line{position:absolute;bottom:0;width:32px;height:2px;background:#285CFC;transition:left .2s}.active-line.profile{left:0;width:64px}.active-line.security{left:154px}.avatar-wrap{position:absolute;top:175px;left:175px;width:80px;height:80px;border-radius:50%;overflow:hidden}.avatar{width:80px;height:80px}.form-card{position:absolute;top:275px;left:15px;width:400px;height:250px;overflow:hidden;border-radius:10px;background:#fff}.field{display:flex;height:50px;align-items:center;border-bottom:1px solid #D9D9D9;box-sizing:border-box}.field:last-child{border-bottom:0}.field image{width:20px;height:20px;margin-left:30px;margin-right:10px}.field>text:not(.value){font-size:16px;font-weight:500}.value{margin-left:auto;margin-right:30px;color:#285CFC;font-size:14px!important;font-weight:600!important}.gender{display:flex;gap:20px;margin-left:auto;margin-right:30px;font-size:14px;font-weight:700}.gender .selected{color:#285CFC}.save{position:absolute;top:679px;left:36px;width:357px;height:50px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#285CFC;color:#fff;font-size:16px;font-weight:500}
.security-card,.third-party-card{position:absolute;left:15px;width:400px;overflow:hidden;border-radius:10px;background:#fff}.security-card{top:165px;height:150px}.security-row{position:relative;height:50px;display:flex;align-items:center;border-bottom:1px solid #d9d9d9;box-sizing:border-box;font-size:15px}.security-row:last-child{border-bottom:0}.security-icon{margin-left:13px;margin-right:10px;flex:none}.security-icon.phone{width:15px;height:15px}.security-icon.password{width:15px;height:18px}.security-icon.email{width:16px;height:13px}.security-label{font-weight:500;white-space:nowrap}.security-value{margin-left:28px;font-weight:400;white-space:nowrap}.phone-value{margin-left:29px}.password-value{margin-left:32px}.chevron{position:absolute;right:12px;width:20px;height:20px}.verified{position:absolute;left:277px;display:flex;align-items:center;gap:1px;color:#285CFC;font-size:8px;font-weight:500;white-space:nowrap}.verified image{width:15px;height:15px;flex:none}.third-party-card{top:335px;height:150px}.third-party-title{display:flex;height:50px;align-items:center;padding-left:10px;border-bottom:1px solid #d9d9d9;box-sizing:border-box;font-size:15px;font-weight:700}.provider-row{position:relative;height:50px;display:flex;align-items:center;border-bottom:1px solid #d9d9d9;box-sizing:border-box;color:#000;font-size:15px}.provider-row:last-child{border-bottom:0}.provider-icon{margin-left:11px;margin-right:10px;flex:none}.provider-icon.apple{width:30px;height:30px}.provider-icon.wechat{width:25px;height:25px;margin-left:15px;margin-right:10px}.link-button{position:absolute;right:40px;width:50px;height:20px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#285CFC;color:#fff;font-size:12px}.link-button.linked{width:80px;right:10px;border:1px solid #285CFC;box-sizing:border-box;background:#fff;color:#285CFC}
</style>
