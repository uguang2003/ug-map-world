<template>
  <transition name="fade">
    <aside v-if="show" class="ug-float-list">
      <div class="ug-float-list-title">快速定位</div>
      <div v-for="section in locationList" :key="section.title">
        <div class="ug-float-list-section-title">{{ section.title }}</div>
        <ul>
          <li v-for="item in section.items" :key="item.id" class="ug-float-list-item" @click="handleClick(item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { flyToLatLng, flyToPosition, CameraView } from "../data/mapUtils";
import { defineProps } from "vue";
import { locationListData, LocationListSection } from "../data/locationListData";

const props = defineProps<{ mapInstance: any; show: boolean }>();

const locationList: LocationListSection[] = locationListData;

function handleClick(item: any) {
  if (props.mapInstance && item.cameraView) {
    flyToPosition(props.mapInstance, item.cameraView);
  }
}
</script>

<style scoped>
.ug-float-list {
  position: absolute;
  top: 80px;
  /* 顶部标题栏高度56px+间距 */
  right: 32px;
  width: 200px;
  background: linear-gradient(120deg, #1a8917cc 0%, #4caf50cc 100%);
  /* 半透明渐变 */
  border-radius: 14px;
  box-shadow: 0 4px 24px #0003;
  padding: 16px 0 8px 0;
  z-index: 20;
  user-select: none;
  transition: opacity 0.2s;
  backdrop-filter: blur(8px);
  border: 1.5px solid #fff3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.ug-float-list-title {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  padding: 0 20px 8px 20px;
  border-bottom: 1px solid #ffffff33;
  margin-bottom: 8px;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px #1a8917cc, 0 1px 0 #2228;
}

.ug-float-list-section-title {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  padding: 0 20px 4px 20px;
  margin-top: 8px;
  margin-bottom: 2px;
  letter-spacing: 1px;
  text-shadow: 0 1px 4px #1a8917cc, 0 1px 0 #2228;
}

.ug-float-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ug-float-list-item {
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  margin: 0 8px 6px 8px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  text-shadow: 0 1px 4px #1a8917cc, 0 1px 0 #2228;
}

.ug-float-list-item:hover {
  background: rgba(255, 255, 255, 0.13);
  color: #fff;
  box-shadow: 0 2px 8px #1a8917cc;
}
</style>
