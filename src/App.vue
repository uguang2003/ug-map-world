<template>
  <div class="ug-app-layout">
    <div class="ug-main">
      <MarsMap :url="configUrl" map-key="ug-default-map" @onload="marsOnload" />
      <UgLocationList :mapInstance="mapInstance" :show="showLocationList" />
      <UgHeader class="ug-header-float" @toggle-list="toggleLocationList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MarsMap from "./components/mars-work/mars-map.vue";
import UgHeader from "./layout/UgHeader.vue";
import UgLocationList from "./layout/UgLocationList.vue";
import { initMap } from "./data/mapInit";
import { ref } from "vue";
const configUrl = "config/config.json";

const mapInstance = ref<any>(null);
const showLocationList = ref(true);

const toggleLocationList = () => {
  showLocationList.value = !showLocationList.value;
};

const marsOnload = (map: any) => {
  mapInstance.value = map;
  initMap(map);
};
</script>

<style scoped>
.ug-app-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
