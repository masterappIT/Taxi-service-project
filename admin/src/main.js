import { createApp, ref, computed, onMounted } from 'vue'
import './style.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const token = ref(localStorage.getItem('admin_token') || '')
const locale = ref(localStorage.getItem('admin_locale') || 'en')
const view = ref('dashboard')
const loading = ref(false)
const error = ref('')
const dashboard = ref(null)
const users = ref([])
const trips = ref([])
const username = ref('')
const password = ref('')

const messages = {
  en: {
    brand: '✦ Cross-border Admin',
    welcome: 'Welcome back',
    signInPrompt: 'Sign in to manage riders and trips.',
    adminUsername: 'Admin username', password: 'Password', signIn: 'Sign in', signOut: 'Sign out',
    dashboard: 'Dashboard', users: 'Users', trips: 'Trips', adminConsole: 'ADMIN CONSOLE',
    refresh: 'Refresh', totalUsers: 'Total users', totalTrips: 'Total trips', pendingTrips: 'Pending trips',
    completedTrips: 'Completed trips', name: 'Name', phone: 'Phone', joined: 'Joined', id: 'ID',
    route: 'Route', region: 'Region', scheduled: 'Scheduled', status: 'Status', loading: 'Loading…',
    requestFailed: 'Request failed', sessionExpired: 'Your session has expired. Please sign in again.',
    regions: { HK: 'Hong Kong', MACAU: 'Macau', GUANGDONG: 'Guangdong' },
    statuses: { PENDING: 'Pending', CONFIRMED: 'Confirmed', COMPLETED: 'Completed', CANCELLED: 'Cancelled' },
    language: '中文', languageLabel: 'Language'
  },
  zh: {
    brand: '✦ 跨境管理后台', welcome: '欢迎回来', signInPrompt: '登录以管理乘客和行程。',
    adminUsername: '管理员用户名', password: '密码', signIn: '登录', signOut: '退出登录',
    dashboard: '仪表盘', users: '用户', trips: '行程', adminConsole: '管理控制台', refresh: '刷新',
    totalUsers: '用户总数', totalTrips: '行程总数', pendingTrips: '待处理行程', completedTrips: '已完成行程',
    name: '姓名', phone: '电话', joined: '加入时间', id: '编号', route: '路线', region: '地区',
    scheduled: '计划时间', status: '状态', loading: '加载中…', requestFailed: '请求失败',
    sessionExpired: '登录已过期，请重新登录。', regions: { HK: '香港', MACAU: '澳门', GUANGDONG: '广东' },
    statuses: { PENDING: '待处理', CONFIRMED: '已确认', COMPLETED: '已完成', CANCELLED: '已取消' },
    language: 'English', languageLabel: '语言'
  }
}

const t = (key) => key.split('.').reduce((value, part) => value?.[part], messages[locale.value]) || key
const translateRegion = (value) => t(`regions.${value}`)
const translateStatus = (value) => t(`statuses.${value}`)
const formatDate = (value, withTime = false) => new Date(value).toLocaleString(locale.value === 'zh' ? 'zh-CN' : 'en-US', withTime ? {} : { dateStyle: 'medium' })
function toggleLocale() { locale.value = locale.value === 'en' ? 'zh' : 'en'; localStorage.setItem('admin_locale', locale.value) }
function displayError(message) { return message === 'Request failed' ? t('requestFailed') : message.includes('session') ? t('sessionExpired') : message }

async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token.value ? { Authorization: 'Bearer ' + token.value } : {}), ...(options.headers || {}) } })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Request failed')
  return res.json()
}
async function load() {
  loading.value = true; error.value = ''
  try { if (view.value === 'dashboard') dashboard.value = await api('/admin/dashboard'); if (view.value === 'users') users.value = (await api('/admin/users')).data; if (view.value === 'trips') trips.value = (await api('/admin/trips')).data }
  catch (e) { error.value = displayError(e.message); if (e.message.includes('session')) { token.value = ''; localStorage.removeItem('admin_token') } }
  finally { loading.value = false }
}
async function apiLogin() { try { error.value = ''; const result = await api('/admin/auth/login', { method: 'POST', body: JSON.stringify({ username: username.value, password: password.value }) }); token.value = result.token; localStorage.setItem('admin_token', token.value); load() } catch (e) { error.value = displayError(e.message) } }
function logout() { token.value = ''; localStorage.removeItem('admin_token'); view.value = 'dashboard' }
const title = computed(() => t(view.value))

const App = { setup() { onMounted(() => token.value && load()); return { token, locale, view, title, dashboard, users, trips, loading, error, username, password, apiLogin, logout, load, t, toggleLocale, translateRegion, translateStatus, formatDate } }, template: `<div v-if="!token" class="login"><div class="login-orb login-orb-one"></div><div class="login-orb login-orb-two"></div><form @submit.prevent="apiLogin"><div class="brand">{{t('brand')}}</div><h1>{{t('welcome')}}</h1><p>{{t('signInPrompt')}}</p><input v-model="username" :placeholder="t('adminUsername')" autocomplete="username" required/><input v-model="password" type="password" :placeholder="t('password')" autocomplete="current-password" required/><button>{{t('signIn')}}</button><small v-if="error">{{error}}</small></form></div><div v-else class="shell"><aside><div class="brand">{{t('brand')}}</div><nav><button :class="{active:view==='dashboard'}" @click="view='dashboard';load()">▦ {{t('dashboard')}}</button><button :class="{active:view==='users'}" @click="view='users';load()">♙ {{t('users')}}</button><button :class="{active:view==='trips'}" @click="view='trips';load()">⇄ {{t('trips')}}</button></nav><button class="logout" @click="logout">{{t('signOut')}}</button></aside><main><header><div><span class="eyebrow">{{t('adminConsole')}}</span><h1>{{title}}</h1></div><div class="header-actions"><button class="language-toggle" @click="toggleLocale" :aria-label="t('languageLabel')">中 / EN</button><button class="refresh" @click="load">↻ {{t('refresh')}}</button></div></header><div v-if="error" class="error">{{error}}</div><section v-if="view==='dashboard' && dashboard" class="cards"><article><span>{{t('totalUsers')}}</span><strong>{{dashboard.users}}</strong></article><article><span>{{t('totalTrips')}}</span><strong>{{dashboard.trips}}</strong></article><article><span>{{t('pendingTrips')}}</span><strong>{{dashboard.pendingTrips}}</strong></article><article><span>{{t('completedTrips')}}</span><strong>{{dashboard.completedTrips}}</strong></article></section><section v-if="view==='users'" class="panel"><table><thead><tr><th>{{t('name')}}</th><th>{{t('phone')}}</th><th>{{t('joined')}}</th><th>{{t('id')}}</th></tr></thead><tbody><tr v-for="u in users" :key="u.id"><td>{{u.name || '—'}}</td><td>{{u.phone || '—'}}</td><td>{{formatDate(u.createdAt)}}</td><td class="muted">{{u.id}}</td></tr></tbody></table></section><section v-if="view==='trips'" class="panel"><table><thead><tr><th>{{t('route')}}</th><th>{{t('region')}}</th><th>{{t('scheduled')}}</th><th>{{t('status')}}</th></tr></thead><tbody><tr v-for="trip in trips" :key="trip.id"><td><b>{{trip.origin}}</b><br/><span class="muted">→ {{trip.destination}}</span></td><td>{{translateRegion(trip.region)}}</td><td>{{formatDate(trip.scheduledAt, true)}}</td><td><span class="status" :class="trip.status.toLowerCase()">{{translateStatus(trip.status)}}</span></td></tr></tbody></table></section><div v-if="loading" class="loading">{{t('loading')}}</div></main></div>` }
createApp(App).mount('#app')
