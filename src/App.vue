<template>
  <MarsMap :url="configUrl" map-key="ug-default-map" @onload="marsOnload" />
</template>

<script setup lang="ts">
import MarsMap from "./components/mars-work/mars-map.vue";
import { initMap } from "./data/mapInit";
const configUrl = "config/config.json";

const marsOnload = (map: any) => {
  initMap(map);
};
</script>

<style scoped>
</style>
