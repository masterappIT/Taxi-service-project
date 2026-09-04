<template>
  <view class="page" :style="responsiveStyle">
    <view class="header">
      <view class="back-button" @tap="goBack"><image src="/static/vehicles/back.svg" mode="aspectFit" /></view>
      <view class="route-summary" @tap="editSheetOpen = true">
        <image class="origin-icon" src="/static/vehicles/origin.svg" mode="aspectFit" /><text class="origin">{{ originLabel }}</text>
        <image class="route-icon" src="/static/vehicles/route.svg" mode="aspectFit" />
        <image class="destination-icon" src="/static/vehicles/destination.svg" mode="aspectFit" /><text class="destination">{{ destinationLabel }}</text>
        <text class="booking-time">預約時間 ： {{ bookingTime }}</text>
      </view>
      <view class="tabs"><view v-for="tab in tabs" :key="tab.value" :class="['tab',{active:activeCategory===tab.value}]" @tap="activeCategory=tab.value"><text>{{ tab.label }}</text><image v-if="activeCategory===tab.value" src="/static/vehicles/tab-line.svg" mode="scaleToFill" /></view></view>
    </view>
    <scroll-view class="vehicle-scroll" scroll-y :show-scrollbar="false">
      <view v-for="group in visibleGroups" :key="group.category" class="vehicle-group">
        <text class="group-label">{{ group.title }}</text>
        <VehicleCard v-for="vehicle in group.vehicles" :key="vehicle.id" :vehicle="vehicle" :selected="selectedVehicle === vehicle.id" @select="handleVehicleSelect" />
      </view><view class="bottom-space" />
    </scroll-view>
    <TripEditSheet
      v-if="editSheetOpen"
      :origin="tripStore.activeTrip?.origin || '香港 · 九龍站'"
      :destination="tripStore.activeTrip?.destination || '廣東 · 深圳灣口岸'"
      :departure-time="tripStore.departureTime"
      @close="editSheetOpen = false"
      @confirm="saveTripChanges"
    />
  </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'
import { useTripStore } from '../../stores/trip'
import { openCachedPage } from '../../utils/navigation'
import TripEditSheet from '../../components/home/TripEditSheet.vue'
import VehicleCard, { type VehicleCardData } from '../../components/vehicles/VehicleCard.vue'
type Category='all'|'standard-mpv'|'premium-mpv'|'standard-car'|'premium-car'
interface Vehicle extends VehicleCardData { imageClass?: string }
interface VehicleGroup{category:Exclude<Category,'all'>;title:string;vehicles:Vehicle[]}
const {responsiveStyle}=useResponsiveCanvas();const tripStore=useTripStore();const activeCategory=ref<Category>('all');const selectedVehicle=ref('premium-alphard');const editSheetOpen=ref(false)
const tabs:Array<{label:string;value:Category}>=[{label:'全部',value:'all'},{label:'普通MPV',value:'standard-mpv'},{label:'高級MPV',value:'premium-mpv'},{label:'普通轎車',value:'standard-car'},{label:'頂級轎車',value:'premium-car'}]
const groups:VehicleGroup[]=[
{category:'standard-mpv',title:'普通跨境商務車',vehicles:[{id:'standard-mpv',seats:6,price:700,image:'/static/vehicles/alphard.png',modelChoice:true}]},
{category:'premium-mpv',title:'高級跨境商務車',vehicles:[{id:'premium-vellfire',brand:'Toyota',model:'Vellfire',series:'20系',seats:7,price:800,image:'/static/vehicles/vellfire.png',selectable:true},{id:'premium-alphard',brand:'Toyota',model:'Alphard',series:'30系',seats:6,price:800,image:'/static/vehicles/alphard.png',selectable:true}]},
{category:'standard-car',title:'普通跨境轎車',vehicles:[{id:'tesla-s',brand:'Tesla',model:'Model',series:'S',seats:5,price:800,image:'/static/vehicles/tesla-s.png',selectable:true,imageClass:'tesla-s'},{id:'tesla-x',brand:'Tesla',model:'Model',series:'X',seats:7,price:800,image:'/static/vehicles/tesla-x.png',selectable:true},{id:'tesla-y',brand:'Tesla',model:'Model',series:'Y',seats:5,price:800,image:'/static/vehicles/tesla-y.png',selectable:true},{id:'tesla-3',brand:'Tesla',model:'Model',series:'3',seats:5,price:800,image:'/static/vehicles/tesla-3.png',selectable:true}]},
{category:'premium-car',title:'頂級跨境轎車',vehicles:[]}]
const visibleGroups=computed(()=>activeCategory.value==='all'?groups.filter(group=>group.vehicles.length):groups.filter(group=>group.category===activeCategory.value))
const cityName=(value:string|undefined,fallback:string)=>{
  const text=value?.trim() || ''
  if (text.includes('香港')) return '香港'
  if (text.includes('深圳') || text.includes('廣東')) return '深圳'
  if (text.includes('廣州')) return '廣州'
  if (text.includes('珠海')) return '珠海'
  if (text.includes('澳門')) return '澳門'
  return text.split(/[·，,\s]/)[0] || fallback
}
const originLabel=computed(()=>cityName(tripStore.activeTrip?.origin,'香港'))
const destinationLabel=computed(()=>cityName(tripStore.activeTrip?.destination,'深圳'))
const bookingTime=computed(()=>tripStore.departureTime||'March 15 2024 14:00')
const saveTripChanges=(origin:string,destination:string,departureTime:string)=>{tripStore.setRoute(origin,destination);tripStore.setDepartureTime(departureTime);editSheetOpen.value=false}
const handleVehicleSelect=(id:string)=>{const vehicle=groups.flatMap(group=>group.vehicles).find(item=>item.id===id);if(!vehicle)return;selectedVehicle.value=id;tripStore.setSelectedVehicle({...vehicle});openCachedPage('/pages/vehicles/selected')}
const goBack=()=>openCachedPage('/pages/index/index')
</script>
<style scoped>
:global(html),:global(body),:global(#app){width:100%;min-width:0;height:100%;margin:0;overflow:hidden;overscroll-behavior:none}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;border-radius:35px;background:#56657e;color:#38434a;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center}.header{position:absolute;z-index:3;top:0;left:0;width:430px;height:155px;overflow:hidden;border-radius:25px;background:#56657e;color:#fff}.back-button{position:absolute;top:53px;left:25px;width:28px;height:40px;display:flex;align-items:center;justify-content:center}.back-button image{width:16px;height:29px}.route-summary{position:absolute;top:56px;left:53px;width:324px;height:59px}.origin-icon{position:absolute;top:12px;left:69px;width:8px;height:14.517px}.origin{position:absolute;top:9px;left:94px;font-size:14px;font-weight:700;line-height:20px}.route-icon{position:absolute;top:4px;left:139px;width:30px;height:30px}.destination-icon{position:absolute;top:13px;left:186px;width:8px;height:11.978px}.destination{position:absolute;top:9px;left:214px;font-size:14px;font-weight:700;line-height:20px}.booking-time{position:absolute;top:39px;left:62px;font-size:14px;font-weight:100;line-height:20px;white-space:nowrap}.tabs{position:absolute;bottom:0;left:26px;width:378px;height:30px;display:flex;justify-content:space-between}.tab{position:relative;height:30px;font-size:14px;line-height:20px;white-space:nowrap}.tab.active{color:#1effaa;font-weight:700}.tab image{position:absolute;bottom:1px;left:0;width:32px;height:2px}.vehicle-scroll{position:absolute;top:155px;left:0;width:430px;height:calc(100% - 155px)}.vehicle-group{padding-top:10px}.group-label{display:flex;width:max-content;height:18px;margin:0 0 5px 24px;padding:0 6px;align-items:center;border-radius:25px;background:#d9d9d9;font-size:8px;font-weight:500;line-height:12px}.bottom-space{height:20px}@media (max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale,1));transform-origin:top left}}
</style>
