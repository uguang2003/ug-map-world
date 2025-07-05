<template>
  <transition name="romantic-mask-fade">
    <div v-if="show" class="romantic-mask">
      <div class="romantic-heart" v-for="n in 18" :key="n" :style="randomStyle(n)">❤</div>
      <div class="romantic-flower" v-for="n in 8" :key="'f' + n" :style="randomStyle(n + 100)">❀</div>
      <div class="romantic-nav-btns">
        <button class="romantic-nav-btn" @click="gotoPrevSpot" :disabled="activeLoveIdx === 0">←</button>
        <button class="romantic-nav-btn" @click="toggleAutoPlay" :class="{ playing: isAutoPlaying }">
          <span v-if="isAutoPlaying">⏸</span>
          <span v-else>▶</span>
        </button>
        <button class="romantic-nav-btn" @click="gotoNextSpot" :disabled="activeLoveIdx === loveSpots.length - 1">→</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

import { ref, watch, onUnmounted } from 'vue';
import { loveSpots } from '../data/loveVestige/loveSpots';
import { flyToPosition } from '../data/mapUtils';

const props = defineProps<{ show: boolean; mapInstance: any; activeLoveIdx: number }>();
const emits = defineEmits<{ (e: 'update:activeLoveIdx', idx: number): void }>();

const isAutoPlaying = ref(false);
let timer: number | null = null;

function toggleAutoPlay() {
  isAutoPlaying.value = !isAutoPlaying.value;
}

function clearAutoPlay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

watch([isAutoPlaying, () => props.show], ([auto, show]) => {
  clearAutoPlay();
  if (auto && show) {
    timer = window.setInterval(() => {
      if (props.activeLoveIdx < loveSpots.length - 1) {
        emits('update:activeLoveIdx', props.activeLoveIdx + 1);
      } else {
        emits('update:activeLoveIdx', 0);
      }
    }, 7000);
  }
});

onUnmounted(() => {
  clearAutoPlay();
});

// 关闭遮罩时自动停止
watch(() => props.show, (val) => {
  if (!val && timer) {
    isAutoPlaying.value = false;
    clearInterval(timer);
    timer = null;
  }
});

// 切换点位时自动飞行
watch(() => props.show, (val) => {
  if (val) gotoSpot(props.activeLoveIdx);
});
watch(() => props.activeLoveIdx, (idx) => {
  if (props.show) gotoSpot(idx);
});

function gotoSpot(idx: number) {
  const spot = loveSpots[idx];
  if (props.mapInstance && spot) {
    flyToPosition(props.mapInstance, spot.camera);
  }
}

function gotoPrevSpot() {
  if (props.activeLoveIdx > 0) {
    emits('update:activeLoveIdx', props.activeLoveIdx - 1);
  }
}
function gotoNextSpot() {
  if (props.activeLoveIdx < loveSpots.length - 1) {
    emits('update:activeLoveIdx', props.activeLoveIdx + 1);
  }
}

function randomStyle(seed: number) {
  // 伪随机生成不同的飘落位置和动画
  const left = (seed * 53) % 100;
  const duration = 3.5 + (seed % 5) * 0.7;
  const delay = (seed % 7) * 0.5;
  const size = 22 + (seed % 3) * 8;
  const rotate = (seed * 13) % 360;
  return {
    left: `${left}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    fontSize: `${size}px`,
    transform: `rotate(${rotate}deg)`
  };
}
</script>

<style scoped>
.romantic-mask {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: linear-gradient(120deg, #fff0f511 0%, #ffe4e111 100%);
  /* 极为透明 */
  animation: romantic-mask-fadein 0.8s;
  overflow: hidden;
}

.romantic-nav-btns {
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 10001;
  display: flex;
  gap: 18px;
  pointer-events: auto;
}

.romantic-nav-btn {
  background: linear-gradient(90deg, #ffb6c1 0%, #ffe4e1 100%);
  color: #d81b60;
  border: none;
  outline: none;
  border-radius: 18px;
  font-size: 17px;
  font-weight: 700;
  font-family: 'Comic Sans MS', 'Segoe Script', 'FangSong', cursive, sans-serif;
  padding: 10px 22px;
  box-shadow: 0 2px 8px #ffb6c1cc;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  border: 2px solid #fff0f5;
  pointer-events: auto;
}

.romantic-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.romantic-heart,
.romantic-flower {
  position: absolute;
  top: -40px;
  opacity: 0.7;
  user-select: none;
  pointer-events: none;
  animation-name: romantic-float-down;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-iteration-count: infinite;
}

.romantic-flower {
  opacity: 0.5;
  color: #f06292;
  filter: blur(0.5px);
}

.romantic-heart {
  color: #e57373;
  text-shadow: 0 2px 8px #ffb6c1cc;
  filter: blur(0.2px);
}

@keyframes romantic-float-down {
  0% {
    top: -40px;
    opacity: 0.7;
  }

  80% {
    opacity: 1;
  }

  100% {
    top: 110vh;
    opacity: 0.2;
  }
}

.romantic-mask-fade-enter-active,
.romantic-mask-fade-leave-active {
  transition: opacity 0.5s;
}

.romantic-mask-fade-enter-from,
.romantic-mask-fade-leave-to {
  opacity: 0;
}

.romantic-mask-fade-enter-to,
.romantic-mask-fade-leave-from {
  opacity: 1;
}

@keyframes romantic-mask-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
