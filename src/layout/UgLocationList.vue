<template>
  <transition name="fade">
    <aside v-if="show" class="ug-float-list">
      <div class="ug-float-list-title">快速定位</div>
      <ul>
        <li class="ug-float-list-item" @click="handleClick('ug-dorm')">UG的宿舍</li>
        <!-- 后续可扩展更多项 -->
      </ul>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { flyToDormLabelView } from "../data/jxufeMap/jxufeMapActions";
import { defineProps } from "vue";

const props = defineProps<{ mapInstance: any; show: boolean }>();

function handleClick(id: string) {
  if (id === 'ug-dorm' && props.mapInstance) {
    flyToDormLabelView(props.mapInstance);
  }
}
</script>

<style scoped>
.ug-float-list {
  position: absolute;
  top: 80px; /* 顶部标题栏高度56px+间距 */
  right: 32px;
  width: 200px;
  background: linear-gradient(120deg, #1a8917cc 0%, #4caf50cc 100%); /* 半透明渐变 */
  border-radius: 14px;
  box-shadow: 0 4px 24px #0003;
  padding: 16px 0 8px 0;
  z-index: 20;
  user-select: none;
  transition: opacity 0.2s;
  backdrop-filter: blur(8px);
  border: 1.5px solid #fff3;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
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
  background: rgba(255,255,255,0.13);
  color: #fff;
  box-shadow: 0 2px 8px #1a8917cc;
}
</style>
