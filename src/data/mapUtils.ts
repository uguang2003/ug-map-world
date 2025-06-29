import type { Map } from "mars3d";

/**
 * 通用：地图飞行到指定坐标
 */
export interface CameraView {
  lng: number;
  lat: number;
  alt?: number;
  heading?: number;
  pitch?: number;
  roll?: number;
}

/**
 * 通用：地图飞行到完整相机参数
 */
export function flyToPosition(map: Map, view: CameraView) {
  if (!map || !view) return;
  map.setCameraView({
    lng: view.lng,
    lat: view.lat,
    alt: view.alt ?? 500,
    heading: view.heading ?? 0,
    pitch: view.pitch ?? -60,
    roll: view.roll ?? 0,
  });
}

/**
 * 通用：地图飞行到指定经纬度（无高程）
 */
export function flyToLatLng(map: Map, lat: number, lng: number, alt = 500, heading = 0, pitch = -60) {
  if (!map) return;
  map.setCameraView({ lat, lng, alt, heading, pitch });
}
