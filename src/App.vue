<template>
  <div class="ug-app-layout" :class="{ 'romantic-mode': isRomantic }">
    <div class="ug-main">
      <MarsMap :url="configUrl" map-key="ug-default-map" @onload="marsOnload" />
      <UgLocationList
        :mapInstance="mapInstance"
        :show="showLocationList"
        :romantic="isRomantic"
        :activeLoveIdx="activeLoveIdx"
        @update:activeLoveIdx="onActiveLoveIdxUpdate"
      />
      <UgHeader class="ug-header-float" :showList="showLocationList" :romantic="isRomantic"
        @toggle-list="toggleLocationList" @toggle-romantic="toggleRomantic" />
      <RomanticMask
        :mapInstance="mapInstance"
        :show="isRomantic"
        :activeLoveIdx="activeLoveIdx"
        @update:activeLoveIdx="onActiveLoveIdxUpdate"
      />
      <!-- 女朋友模式音乐播放器 -->
      <audio
        ref="romanticAudio"
        src="music/xintiao.mp3"
        loop
        preload="auto"
        style="display:none;"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MarsMap from "./components/mars-work/mars-map.vue";
import UgHeader from "./layout/UgHeader.vue";
import UgLocationList from "./layout/UgLocationList.vue";
import RomanticMask from "./layout/RomanticMask.vue";
import { initMap } from "./data/mapInit";
import { showLoveSpotPopup } from "./data/loveVestige/loveSpots";
import { ref, watch, onMounted } from "vue";

const configUrl = "config/config.json";
const romanticAudio = ref<HTMLAudioElement | null>(null);


const mapInstance = ref<any>(null);
const showLocationList = ref(false);
const isRomantic = ref(false);
const activeLoveIdx = ref(0);
// 联动处理函数
function onActiveLoveIdxUpdate(idx: number) {
  activeLoveIdx.value = idx;
  // 只在浪漫模式下弹出popup
  if (isRomantic.value) {
    showLoveSpotPopup(idx);
  }
}

const toggleLocationList = () => {
  showLocationList.value = !showLocationList.value;
};

const toggleRomantic = () => {
  isRomantic.value = !isRomantic.value;
  if (mapInstance.value) {
    // 重新初始化地图，只显示对应点位
    initMap(mapInstance.value, isRomantic.value);
    // 切换到浪漫模式时，自动弹出当前activeLoveIdx的popup
    if (isRomantic.value) {
      showLoveSpotPopup(activeLoveIdx.value);
    }
  }
};

// 监听浪漫模式切换，自动播放/暂停音乐
watch(isRomantic, (val) => {
  if (romanticAudio.value) {
    if (val) {
      romanticAudio.value.currentTime = 0;
      romanticAudio.value.play();
    } else {
      romanticAudio.value.pause();
    }
  }
});

onMounted(() => {
  // 兼容浏览器自动播放策略，首次用户交互后再播放
  document.body.addEventListener('click', () => {
    if (isRomantic.value && romanticAudio.value) {
      romanticAudio.value.play();
    }
  }, { once: true });
});

const marsOnload = (map: any) => {
  mapInstance.value = map;
  initMap(map, isRomantic.value);
  // 如果初始就是浪漫模式，弹出当前activeLoveIdx的popup
  if (isRomantic.value) {
    showLoveSpotPopup(activeLoveIdx.value);
  }
};
</script>

<style scoped>
.ug-app-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7faf7;
  transition: background 0.5s;
}

.romantic-mode {
  background: linear-gradient(135deg, #ffe4ec 0%, #ffe0f7 100%) !important;
  animation: romantic-bg-float 8s ease-in-out infinite alternate;
}

@keyframes romantic-bg-float {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

.ug-main {
  flex: 1;
  display: flex;
  position: relative;
  min-height: 0;
}

.ug-header-float {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  /* 不再阻断事件，保证按钮可点 */
}
</style>
