<template>
  <view class="page" :style="responsiveStyle">
    <view class="header">
      <view class="back" @tap="closeCachedPage('/pages/index/index')">‹</view>
      <view><text class="title">在線客服</text><text class="status">{{ statusText }}</text></view>
    </view>
    <scroll-view class="messages" scroll-y :scroll-into-view="lastMessageId">
      <view v-if="loading" class="state">正在連接客服…</view>
      <view v-else-if="error" class="state error"><text>{{ error }}</text><button class="retry" @tap="connect">重新連接</button></view>
      <view v-else-if="!messages.length" class="welcome"><view class="avatar">客</view><text class="welcome-title">您好，有甚麼可以幫您？</text><text class="welcome-copy">請描述行程或訂單問題，客服人員會盡快回覆。</text></view>
      <view v-for="message in messages" :id="`message-${message.id}`" :key="message.id" class="row" :class="{ mine: message.direction === 'inbound' }"><view class="bubble"><text>{{ messageText(message) }}</text><text class="time">{{ messageTime(message.createdAt) }}</text></view></view>
      <view id="message-end" />
    </scroll-view>
    <view class="composer"><textarea v-model="draft" class="input" :disabled="loading || !!error" maxlength="2000" auto-height placeholder="輸入訊息…" confirm-type="send" @confirm="send" /><button class="send" :disabled="sending || !draft.trim()" @tap="send">{{ sending ? '…' : '發送' }}</button></view>
  </view>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'
import { closeCachedPage } from '../../utils/navigation'
import { listSupportMessages, sendSupportMessage, startSupportSession, type SupportMessage } from '../../services/api'

const { responsiveStyle } = useResponsiveCanvas()
const messages = ref<SupportMessage[]>([])
const draft = ref('')
const loading = ref(true)
const sending = ref(false)
const error = ref('')
const lastMessageId = ref('')
let pollTimer: ReturnType<typeof setInterval> | undefined
const statusText = computed(() => error.value ? '連接中斷' : loading.value ? '連接中' : '客服在線')
const rider = () => {
  const profile = uni.getStorageSync('account-profile') || {}
  let id = uni.getStorageSync('support-rider-id')
  if (!id) { id = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`; uni.setStorageSync('support-rider-id', id) }
  return { id, name: profile.displayName || '乘客' }
}
const messageText = (message: SupportMessage) => typeof message.content === 'string' ? message.content : message.content?.text || '不支援的訊息'
const messageTime = (value: string) => { const date = new Date(value); return Number.isNaN(date.getTime()) ? '' : date.toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' }) }
const scrollToEnd = () => nextTick(() => { lastMessageId.value = ''; nextTick(() => { lastMessageId.value = 'message-end' }) })
const refresh = async () => { try { messages.value = await listSupportMessages(); scrollToEnd() } catch (cause) { error.value = cause instanceof Error ? cause.message : '客服服務暫時無法使用'; if (pollTimer) clearInterval(pollTimer) } }
const connect = async () => {
  loading.value = true; error.value = ''; if (pollTimer) clearInterval(pollTimer)
  try { const currentRider = rider(); await startSupportSession(currentRider.id, currentRider.name); await refresh(); if (!error.value) pollTimer = setInterval(refresh, 3000) }
  catch (cause) { error.value = cause instanceof Error ? cause.message : '客服服務暫時無法使用' }
  finally { loading.value = false }
}
const send = async () => {
  const text = draft.value.trim(); if (!text || sending.value) return; sending.value = true
  try { const message = await sendSupportMessage(text); draft.value = ''; if (!messages.value.some(item => item.id === message.id)) messages.value.push(message); scrollToEnd() }
  catch (cause) { uni.showToast({ title: cause instanceof Error ? cause.message : '訊息發送失敗', icon: 'none' }) }
  finally { sending.value = false }
}
onShow(connect)
onBeforeUnmount(() => { if (pollTimer) clearInterval(pollTimer) })
</script>

<style scoped>
.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;background:#f3f5f7;border-radius:35px;box-sizing:border-box;color:#26343d;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%)}.header{height:118px;padding:50px 22px 16px;box-sizing:border-box;background:#fff;display:flex;align-items:center;gap:18px;border-bottom:1px solid #e7eaed}.back{width:36px;height:36px;font-size:38px;line-height:30px;text-align:center}.title,.status{display:block}.title{font-size:20px;font-weight:700}.status{margin-top:4px;color:#2eaf73;font-size:12px}.messages{height:calc(100% - 208px);padding:22px 18px;box-sizing:border-box}.state,.welcome{margin:80px 25px;text-align:center;color:#78848b}.state text,.welcome text{display:block}.state.error{color:#b84d4d}.retry{width:116px;margin-top:18px;border:0;border-radius:20px;background:#213f4b;color:#fff;font-size:13px}.welcome{display:flex;flex-direction:column;align-items:center}.avatar{width:58px;height:58px;border-radius:50%;background:#213f4b;color:#fff;font-size:22px;line-height:58px}.welcome-title{margin-top:16px;font-size:18px;font-weight:700;color:#35454d}.welcome-copy{margin-top:8px;font-size:13px;line-height:1.6}.row{display:flex;margin:12px 0;justify-content:flex-start}.row.mine{justify-content:flex-end}.bubble{max-width:72%;padding:12px 14px 8px;border-radius:6px 18px 18px 18px;background:#fff;box-shadow:0 2px 8px rgba(39,52,61,.06);font-size:15px;line-height:1.5}.mine .bubble{border-radius:18px 6px 18px 18px;background:#244653;color:#fff}.time{display:block;margin-top:5px;text-align:right;color:#9aa3a8;font-size:10px}.mine .time{color:#bed0d6}.composer{position:absolute;bottom:0;left:0;right:0;min-height:90px;padding:14px 16px calc(14px + env(safe-area-inset-bottom));box-sizing:border-box;background:#fff;display:flex;align-items:flex-end;gap:10px;border-top:1px solid #e7eaed}.input{flex:1;min-height:42px;max-height:100px;padding:10px 13px;box-sizing:border-box;border-radius:21px;background:#f1f3f5;font-size:15px}.send{width:70px;height:42px;margin:0;padding:0;border:0;border-radius:21px;background:#244653;color:#fff;font-size:14px}.send[disabled]{opacity:.45}@media(max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale,1));transform-origin:top left}}
</style>
