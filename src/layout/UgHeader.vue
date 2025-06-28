<template>
  <header class="ug-header">
    <h1 class="ug-title">UG的地图世界</h1>
    <button class="ug-list-toggle-btn" @click="$emit('toggle-list')" title="显示/隐藏定位列表">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
  </header>
</template>

<script setup lang="ts">
defineEmits(['toggle-list']);
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
.ug-list-toggle-btn {
  background: rgba(26,137,23,0.18);
  border: none;
  outline: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  margin-right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px #0002;
}
.ug-list-toggle-btn:hover {
  background: rgba(26,137,23,0.32);
}
.ug-list-toggle-btn svg {
  display: block;
}
</style>
