<template>
  <header class="ug-header">
    <h1 class="ug-title">UG的地图世界</h1>
    <button class="ug-list-toggle-btn" :class="{ expanded: showList }" @click="$emit('toggle-list')" title="显示/隐藏定位列表">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2" />
        <path v-if="!showList" d="M8 12h8M12 8v8" stroke="#fff" stroke-width="2" stroke-linecap="round" />
        <path v-else d="M8 12h8" stroke="#fff" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <button class="ug-romantic-btn" @click="$emit('toggle-romantic')" title="进入女朋友模式">
      <span class="heart-icon">❤</span>
    </button>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const emit = defineEmits(['toggle-list', 'toggle-romantic']);
const props = defineProps<{ showList?: boolean }>();
const showList = computed(() => props.showList ?? false);
</script>

<style scoped>
.ug-header {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  z-index: 10;
  position: relative;
}

.ug-title {
  color: #fff;
  font-size: 26px;
  font-weight: 800;
  margin-left: 40px;
  letter-spacing: 3px;
  text-shadow:
    0 2px 12px #1a8917cc,
    0 1px 0 #2228,
    1px 1px 0 #222,
    -1px 1px 0 #222,
    1px -1px 0 #222,
    -1px -1px 0 #222;
  flex: 1;
}

.ug-romantic-btn {
  background: linear-gradient(90deg, #ffb6c1 0%, #ffe4e1 100%);
  color: #d81b60;
  border: none;
  outline: none;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Comic Sans MS', 'Segoe Script', 'FangSong', cursive, sans-serif;
  padding: 8px 14px 8px 14px;
  margin-right: 18px;
  margin-left: 0;
  box-shadow: 0 2px 8px #ffb6c1cc;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  position: relative;
}

.ug-romantic-btn:hover {
  background: #ffe4e1;
  color: #ad1457;
  box-shadow: 0 4px 16px #ffb6c1cc;
}

.heart-icon {
  font-size: 18px;
  color: #e57373;
  animation: heart-beat 1.2s infinite;
}

@keyframes heart-beat {

  0%,
  100% {
    transform: scale(1);
  }

  10% {
    transform: scale(1.2);
  }

  20% {
    transform: scale(0.95);
  }

  30% {
    transform: scale(1.1);
  }

  50% {
    transform: scale(1.25);
  }

  70% {
    transform: scale(1);
  }
}

.ug-list-toggle-btn {
  background: rgba(26, 137, 23, 0.18);
  border: none;
  outline: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px #0002;
  position: relative;
  overflow: visible;
}

.ug-list-toggle-btn:hover {
  background: #ffe4e1;
  box-shadow: 0 4px 16px #ffb6c1cc;
  transform: scale(1.12) rotate(-10deg);
}

.ug-list-toggle-btn.expanded {
  background: linear-gradient(90deg, #ffb6c1 0%, #ffe4e1 100%);
  box-shadow: 0 4px 16px #ffb6c1cc;
  transform: scale(1.08) rotate(0deg);
}

.ug-list-toggle-btn svg {
  display: block;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.ug-list-toggle-btn:hover svg {
  transform: scale(1.15);
}
</style>
