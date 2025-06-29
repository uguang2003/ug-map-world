<template>
  <transition name="ug-float-slide-right-bounce">
    <aside v-if="show" class="ug-float-list">
      <div class="ug-float-list-title">快速定位</div>
      <div v-for="(section, idx) in locationList" :key="section.title">
        <div :class="['ug-float-list-section-title', collapsedSections[idx] ? 'collapsed' : '']"
          @click="toggleSection(idx)">
          {{ section.title }}
        </div>
        <ul v-show="!collapsedSections[idx]">
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

import { ref } from "vue";
const collapsedSections = ref<boolean[]>(locationList.map(() => false));

function toggleSection(idx: number) {
  collapsedSections.value[idx] = !collapsedSections.value[idx];
}

function handleClick(item: any) {
  if (props.mapInstance && item.cameraView) {
    flyToPosition(props.mapInstance, item.cameraView);
  }
}
</script>

<style scoped>
.ug-float-slide-right-bounce-enter-active {
  animation: ug-float-bounce-in-x 0.48s cubic-bezier(0.23, 1.12, 0.32, 1) both;
}

.ug-float-slide-right-bounce-leave-active {
  animation: ug-float-bounce-out-x 0.32s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes ug-float-bounce-in-x {
  0% {
    opacity: 0;
    transform: translateX(120px) scale(0.92);
    filter: blur(4px) brightness(1.12);
  }

  60% {
    opacity: 1;
    transform: translateX(-10px) scale(1.04);
    filter: blur(1.2px) brightness(1.02);
  }

  80% {
    opacity: 1;
    transform: translateX(3px) scale(0.98);
    filter: blur(0.2px) brightness(1);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: blur(0) brightness(1);
  }
}

@keyframes ug-float-bounce-out-x {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: blur(0) brightness(1);
  }

  40% {
    opacity: 0.7;
    transform: translateX(16px) scale(0.96);
    filter: blur(1.2px) brightness(1.03);
  }

  100% {
    opacity: 0;
    transform: translateX(80px) scale(0.92);
    filter: blur(4px) brightness(1.12);
  }
}

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
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  position: relative;
}

.ug-float-list-section-title::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  margin-right: 8px;
  transform: rotate(-45deg) scale(0.9);
  transition: transform 0.2s;
}

.ug-float-list-section-title.collapsed::before {
  transform: rotate(-135deg) scale(0.9);
}

.ug-float-list-section-title:hover {
  color: #4caf50;
}

.ug-float-list ul {
  list-style: none;
  margin: 0;
  padding: 0 0 0 18px;
  transition: max-height 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
  overflow: hidden;
  max-height: 500px;
  opacity: 1;
}

.ug-float-list ul[style*="display: none"] {
  max-height: 0 !important;
  opacity: 0 !important;
  padding: 0 0 0 18px;
}

.arrow {
  display: inline-block;
  transition: transform 0.2s;
  margin-right: 6px;
}

.arrow.collapsed {
  transform: rotate(90deg);
}

.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
  opacity: 1;
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
