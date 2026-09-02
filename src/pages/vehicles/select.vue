<template>
  <view class="page" :style="responsiveStyle">
    <view class="header">
      <view class="back-button" @tap="goBack"><image src="/static/vehicles/back.svg" mode="aspectFit" /></view>
      <view class="route-summary">
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
        <view v-for="vehicle in group.vehicles" :key="vehicle.id" class="vehicle-card" @tap="selectedVehicle=vehicle.id">
          <view v-if="vehicle.brand" class="vehicle-name"><text class="brand">{{ vehicle.brand }}</text><text> {{ vehicle.model }}</text><text class="series">{{ vehicle.series }}</text></view>
          <image v-if="vehicle.selectable" class="radio" :src="selectedVehicle===vehicle.id?'/static/vehicles/radio-selected.svg':'/static/vehicles/radio.svg'" mode="aspectFit" />
          <view v-if="vehicle.doubleImage" class="double-image"><image src="/static/vehicles/alphard.png" mode="aspectFill"/><image src="/static/vehicles/vellfire.png" mode="aspectFill"/></view>
          <image v-else class="vehicle-image" :class="vehicle.imageClass" :src="vehicle.image" mode="aspectFit" />
          <view class="spec seat"><image src="/static/vehicles/seat.svg" mode="aspectFit"/><text>{{ vehicle.seats }}座</text></view><view class="spec color">不限颜色</view><view v-if="vehicle.modelChoice" class="spec model-choice">不限車款</view>
          <view class="price">RMB¥{{ vehicle.price }}</view><text class="discount">已減 ¥200</text>
        </view>
      </view><view class="bottom-space" />
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useResponsiveCanvas } from '../../composables/useResponsiveCanvas'
import { useTripStore } from '../../stores/trip'
import { openCachedPage } from '../../utils/navigation'
type Category='all'|'standard-mpv'|'premium-mpv'|'standard-car'|'premium-car'
interface Vehicle{id:string;brand?:string;model?:string;series?:string;seats:number;price:number;image:string;imageClass?:string;doubleImage?:boolean;selectable?:boolean;modelChoice?:boolean}
interface VehicleGroup{category:Exclude<Category,'all'>;title:string;vehicles:Vehicle[]}
const {responsiveStyle}=useResponsiveCanvas();const tripStore=useTripStore();const activeCategory=ref<Category>('all');const selectedVehicle=ref('premium-alphard')
const tabs:Array<{label:string;value:Category}>=[{label:'全部',value:'all'},{label:'普通MPV',value:'standard-mpv'},{label:'高級MPV',value:'premium-mpv'},{label:'普通轎車',value:'standard-car'},{label:'頂級轎車',value:'premium-car'}]
const groups:VehicleGroup[]=[
{category:'standard-mpv',title:'普通跨境商務車',vehicles:[{id:'standard-mpv',seats:6,price:700,image:'',doubleImage:true,modelChoice:true}]},
{category:'premium-mpv',title:'高級跨境商務車',vehicles:[{id:'premium-vellfire',brand:'Toyota',model:'Vellfire',series:'20系',seats:7,price:800,image:'/static/vehicles/vellfire.png',selectable:true},{id:'premium-alphard',brand:'Toyota',model:'Alphard',series:'30系',seats:6,price:800,image:'/static/vehicles/alphard.png',selectable:true}]},
{category:'standard-car',title:'普通跨境轎車',vehicles:[{id:'tesla-s',brand:'Tesla',model:'Model',series:'S',seats:5,price:800,image:'/static/vehicles/tesla-s.png',selectable:true,imageClass:'tesla-s'},{id:'tesla-x',brand:'Tesla',model:'Model',series:'X',seats:7,price:800,image:'/static/vehicles/tesla-x.png',selectable:true},{id:'tesla-y',brand:'Tesla',model:'Model',series:'Y',seats:5,price:800,image:'/static/vehicles/tesla-y.png',selectable:true},{id:'tesla-3',brand:'Tesla',model:'Model',series:'3',seats:5,price:800,image:'/static/vehicles/tesla-3.png',selectable:true}]},
{category:'premium-car',title:'頂級跨境轎車',vehicles:[]}]
const visibleGroups=computed(()=>activeCategory.value==='all'?groups.filter(group=>group.vehicles.length):groups.filter(group=>group.category===activeCategory.value))
const shortPlace=(value:string|undefined,fallback:string)=>value?.split(/[·]/)[0].trim()||fallback
const originLabel=computed(()=>shortPlace(tripStore.activeTrip?.origin,'香港'));const destinationLabel=computed(()=>shortPlace(tripStore.activeTrip?.destination,'深圳'));const bookingTime=computed(()=>tripStore.departureTime||'March 15 2024 14:00')
const goBack=()=>openCachedPage('/pages/index/index')
</script>
<style scoped>
:global(html),:global(body),:global(#app){width:100%;min-width:0;height:100%;margin:0;overflow:hidden;overscroll-behavior:none}.page{position:fixed;top:50%;left:50%;width:430px;height:932px;overflow:hidden;border-radius:35px;background:#56657e;color:#38434a;font-family:'Noto Sans TC',sans-serif;transform:translate(-50%,-50%) scale(min(1,calc(100vw / 430px),calc(100dvh / 932px)));transform-origin:center}.header{position:absolute;z-index:3;top:0;left:0;width:430px;height:155px;overflow:hidden;border-radius:25px;background:#56657e;color:#fff}.back-button{position:absolute;top:53px;left:25px;width:28px;height:40px;display:flex;align-items:center;justify-content:center}.back-button image{width:16px;height:29px}.route-summary{position:absolute;top:56px;left:53px;width:324px;height:59px}.origin-icon{position:absolute;top:12px;left:69px;width:8px;height:14.517px}.origin{position:absolute;top:9px;left:94px;font-size:14px;font-weight:700;line-height:20px}.route-icon{position:absolute;top:4px;left:139px;width:30px;height:30px}.destination-icon{position:absolute;top:13px;left:186px;width:8px;height:11.978px}.destination{position:absolute;top:9px;left:214px;font-size:14px;font-weight:700;line-height:20px}.booking-time{position:absolute;top:39px;left:62px;font-size:14px;font-weight:100;line-height:20px;white-space:nowrap}.tabs{position:absolute;bottom:0;left:26px;width:378px;height:30px;display:flex;justify-content:space-between}.tab{position:relative;height:30px;font-size:14px;line-height:20px;white-space:nowrap}.tab.active{color:#1effaa;font-weight:700}.tab image{position:absolute;bottom:1px;left:0;width:32px;height:2px}.vehicle-scroll{position:absolute;top:155px;left:0;width:430px;height:calc(100% - 155px)}.vehicle-group{padding-top:10px}.group-label{display:flex;width:max-content;height:18px;margin:0 0 5px 24px;padding:0 6px;align-items:center;border-radius:25px;background:#d9d9d9;font-size:8px;font-weight:500;line-height:12px}.vehicle-card{position:relative;width:380px;height:180px;margin:0 auto 10px;overflow:hidden;border-radius:25px;background:#fff;color:#25292f}.vehicle-name{position:absolute;z-index:2;top:43px;left:27px;width:95px;font-size:8px;font-weight:900;line-height:12px}.vehicle-name .brand{font-weight:100}.vehicle-name .series{display:block;margin-left:7px;font-size:12px;line-height:17px}.radio{position:absolute;z-index:2;top:24px;left:43px;width:20px;height:20px}.vehicle-image{position:absolute;top:0;left:150px;width:230px;height:153px}.vehicle-image.tesla-s{height:132px}.double-image{position:absolute;top:0;left:0;width:380px;height:153px;display:flex}.double-image image{width:230px;height:153px;flex:none}.double-image image+image{margin-left:-80px}.spec{position:absolute;z-index:2;top:141px;height:20px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;border-radius:25px;background:#d9d9d9;color:#000;font-size:10px;line-height:14px}.seat{left:27px;width:54px}.seat image{width:16px;height:16px;margin-right:6px}.color{left:85px;width:54px;font-weight:350}.model-choice{left:145px;width:54px;background:#fff;font-weight:700}.price{position:absolute;z-index:2;top:141px;left:255px;width:98px;height:20px;border-radius:25px;background:#1effaa;font-size:14px;font-weight:700;line-height:20px;text-align:center}.discount{position:absolute;z-index:2;top:161px;left:276px;color:#f95c5c;font-size:12px;line-height:17px}.vehicle-group:first-child .spec,.vehicle-group:first-child .price{top:143px}.bottom-space{height:20px}@media (max-width:599px){.page{top:0;left:0;height:var(--mobile-height,100dvh);border-radius:0;transform:scale(var(--mobile-scale,1));transform-origin:top left}}
</style>
