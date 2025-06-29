<template>
  <transition name="romantic-mask-fade">
    <div v-if="show" class="romantic-mask">
      <div class="romantic-heart" v-for="n in 18" :key="n" :style="randomStyle(n)">❤</div>
      <div class="romantic-flower" v-for="n in 8" :key="'f' + n" :style="randomStyle(n + 100)">❀</div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ show: boolean }>();

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
