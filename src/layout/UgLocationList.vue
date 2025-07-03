<template>
  <transition name="ug-float-slide-right-bounce">
    <aside v-if="show" :class="['ug-float-list', { 'romantic-list': romantic }]">
      <div v-if="romantic" class="romantic-list-title">
        <span class="romantic-title-heart">💖</span>
        <span class="romantic-title-text">快速定位</span>
        <span class="romantic-title-flower">❀</span>
        <div class="romantic-title-divider"></div>
      </div>
      <div v-else class="ug-float-list-title">快速定位</div>
      <!-- romantic 模式下，所有点合并为一组，支持高亮和点击联动 -->
      <template v-if="romantic">
        <!-- <div class="romantic-section-title">
          <span class="romantic-arrow">💗</span>
          <span class="section-title-text ">爱情点位</span>
          <span class="romantic-section-flower">❀</span>
        </div> -->
        <ul class="ug-float-list-ul-scroll">
          <li v-for="(item, idx) in flatLoveList" :key="item.id"
              :class="['ug-float-list-item', 'romantic-list-item', { 'active': isActiveLove(idx) }]"
              @click="handleLoveClick(item, idx)">
            <span class="romantic-heart-mini">♥</span>
            <span class="romantic-item-text">{{ item.name }}</span>
          </li>
        </ul>
      </template>
      <!-- 非 romantic 模式下，原有分组渲染 -->
      <template v-else>
        <div v-for="(section, idx) in locationList" :key="section.title">
          <div :class="['ug-float-list-section-title', collapsedSections[idx] ? 'collapsed' : '']"
            @click="toggleSection(idx)">
            <span class="section-title-text">{{ section.title }}</span>
          </div>
          <ul v-show="!collapsedSections[idx]" class="ug-float-list-ul-scroll">
            <li v-for="item in section.items" :key="item.id" class="ug-float-list-item" @click="handleClick(item)">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </template>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { flyToPosition } from "../data/mapUtils";
import { computed, ref, watch } from "vue";
import { getLocationListData } from "../data/locationListData";
import type { LocationListSection } from "../data/locationListData";

// 新增：支持 activeLoveIdx 联动
const props = defineProps<{
  mapInstance: any;
  show: boolean;
  romantic?: boolean;
  activeLoveIdx?: number; // 当前高亮的爱情点索引
}>();
const emits = defineEmits<{ (e: 'update:activeLoveIdx', idx: number): void }>();

const romantic = computed(() => props.romantic ?? false);
// 动态获取定位列表，支持模式切换
const locationList = computed<LocationListSection[]>(() => getLocationListData(romantic.value));
const collapsedSections = ref<boolean[]>([]);

// 仅 romantic 模式下，所有点合并为一维数组
const flatLoveList = computed(() => {
  if (!romantic.value) return [];
  return locationList.value.flatMap(section => section.items);
});

// 监听 locationList 变化，自动重置折叠状态
watch(locationList, (newList) => {
  collapsedSections.value = newList.map(() => false);
}, { immediate: true });

function toggleSection(idx: number) {
  collapsedSections.value[idx] = !collapsedSections.value[idx];
}

// 计算当前高亮的点（仅 romantic 模式下）
function isActiveLove(idx: number) {
  return romantic.value && props.activeLoveIdx === idx;
}

// 处理点击点位：emit 索引，地图定位
function handleLoveClick(item: any, idx: number) {
  emits("update:activeLoveIdx", idx);
  if (props.mapInstance && item.cameraView) {
    flyToPosition(props.mapInstance, item.cameraView);
  }
}

// 非 romantic 模式下的普通点击
function handleClick(item: any) {
  if (props.mapInstance && item.cameraView) {
    flyToPosition(props.mapInstance, item.cameraView);
  }
}
</script>

<style scoped>

/* 高亮当前爱情点位 */
.romantic-list-item.active {
  background: linear-gradient(90deg, #ffd6e6 0%, #f8bbd0 100%) !important;
  color: #c2185b !important;
  box-shadow: 0 2px 12px #ffb6c1cc;
  transform: scale(1.06);
  border: 2px solid #f06292;
}

/* 保证romantic模式下collapsed时不会100%宽度 */
.romantic-section-title.collapsed {
  height: auto !important;
  width: auto !important;
  max-width: 100% !important;
}

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
  max-width: 95vw;
  box-sizing: border-box;
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
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
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

.romantic-list {
  background: linear-gradient(135deg, #ffe4ec 0%, #e0c3fc 100%) !important;
  border: 1.5px solid #fff6 !important;
  box-shadow: 0 8px 32px #ffb6c1aa, 0 2px 8px #fff6 !important;
  border-radius: 28px;
  backdrop-filter: blur(18px) !important;
  padding: 20px 0 16px 0;
  width: 260px;
  min-width: 180px;
  max-width: 95vw;
  transition: background 0.3s;
  overflow: hidden;
  box-sizing: border-box;
  height: 60%;
}

.romantic-list-title {
  display: flex;
  align-items: center;
  position: relative;
  font-family: 'Comic Sans MS', 'Segoe Script', 'FangSong', cursive, sans-serif;
  font-size: 22px;
  font-weight: bold;
  color: #d81b60;
  letter-spacing: 2px;
  background: transparent;
  padding: 0 0 10px 0;
  margin: 0 24px 8px 24px;
  border-radius: 20px 20px 0 0;
  text-shadow: 0 2px 8px #ffb6c1cc, 0 1px 0 #fff0f5;
}

.romantic-title-heart {
  font-size: 26px;
  margin-right: 10px;
  animation: heart-beat 1.6s infinite;
}

.romantic-title-text {
  flex: 1;
  text-align: left;
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(90deg, #ff69b4 0%, #d81b60 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 8px #ffb6c1cc, 0 1px 0 #f34881;
}

.romantic-title-flower {
  font-size: 20px;
  margin-left: 10px;
  animation: flower-rotate 2.5s linear infinite;
}

.romantic-title-divider {
  position: absolute;
  left: 0; right: 0; bottom: -6px;
  height: 3px;
  background: linear-gradient(90deg, #ffb6c1 0%, #e0c3fc 100%);
  border-radius: 2px;
  opacity: 0.5;
}

.romantic-section-title {
  display: flex;
  align-items: center;
  font-family: 'Comic Sans MS', 'Segoe Script', 'FangSong', cursive, sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #d81b60;
  background: #fff0f5;
  border-radius: 14px;
  box-shadow: 0 1px 4px #ffb6c1cc;
  border-bottom: 1.5px dashed #f8bbd0;
  margin: 10px 18px 6px 18px;
  padding: 8px 18px 8px 38px;
  min-height: 36px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s, color 0.2s;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}

.romantic-arrow {
  position: absolute;
  left: 12px;
  font-size: 20px;
  transition: transform 0.3s;
  transform: rotate(0deg);
}

.romantic-arrow.collapsed {
  opacity: 0.2;
  height: auto !important;
}

.romantic-section-flower {
  margin-left: 8px;
  font-size: 16px;
  opacity: 0.7;
  animation: flower-rotate 2.5s linear infinite;
}

.section-title-text {
  flex: 1;
  text-align: left;
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
}

.romantic-list-item {
  background: linear-gradient(90deg, #fff0f5 0%, #ffe4e1 100%);
  border-radius: 12px;
  color: #d81b60;
  font-family: 'Comic Sans MS', 'Segoe Script', 'FangSong', cursive, sans-serif;
  font-size: 15px;
  font-weight: 600;
  margin: 2px 18px 10px 18px;
  padding: 12px 18px 12px 36px;
  box-shadow: 0 1px 4px #ffb6c1cc;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 38px;
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  width: calc(100% - 36px);
  max-width: 100%;
  box-sizing: border-box;
}

.romantic-list-item:hover {
  background: #ffe4e1;
  color: #ad1457;
  box-shadow: 0 2px 8px #ffb6c1cc;
  transform: scale(1.04);
}

.romantic-heart-mini {
  color: #e57373;
  font-size: 16px;
  margin-right: 8px;
  vertical-align: middle;
  animation: heart-beat 1.8s infinite;
}

.romantic-item-text {
  flex: 1;
  text-align: left;
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
}

@keyframes heart-beat {
  0%, 100% { transform: scale(1); }
  10% { transform: scale(1.2); }
  20% { transform: scale(0.95); }
  30% { transform: scale(1.1); }
  50% { transform: scale(1.25); }
  70% { transform: scale(1); }
}

@keyframes flower-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
/* 单个section的ul滚动条样式，最大高度自适应 */
/* section 列表滚动，且不被父级 overflow:hidden 裁切 */
/* section 列表滚动，简洁风格 */
.ug-float-list-ul-scroll {
  max-height: 220px;
  min-height: 0;
  overflow-y: auto !important;
  padding-right: 4px;
  margin: 0;
  margin-top: 10px;
  background: transparent;
  position: relative;
  z-index: 2;
  height: 88%;
}

/* 极细极简滚动条，兼容主流Webkit内核浏览器 */
.ug-float-list-ul-scroll::-webkit-scrollbar {
  width: 7px !important;
  height: 7px !important;
  background: transparent !important;
}
.ug-float-list-ul-scroll::-webkit-scrollbar-thumb {
  background: #ffaef3 !important;
  border-radius: 8px !important;
  min-height: 30px !important;
  border: none !important;
}
.ug-float-list-ul-scroll::-webkit-scrollbar-thumb:hover {
  background: #ff68b9 !important;
}
.ug-float-list-ul-scroll::-webkit-scrollbar-corner {
  background: transparent !important;
}
.ug-float-list-ul-scroll::-webkit-scrollbar-button {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}

/* 让section父容器不裁切ul滚动条 */
.ug-float-list > div,
.romantic-list > div {
  overflow: visible !important;
}

/* 让ul和li的父容器撑满，避免overflow被父级hidden裁切 */
.ug-float-list,
.romantic-list {
  overflow: visible !important;
}

</style>
