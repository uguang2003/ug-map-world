import type { Map } from "mars3d";


// 跳转到“UG的宿舍”标注视角
export function flyToDormLabelView(map: Map) {
  map.setCameraView({
    lat: 28.736464,
    lng: 115.831852,
    alt: 380,
    heading: 0,
    pitch: -90,
  });
}


// 处理“UG的宿舍”标注点击事件
export function handleDormLabelClick(map: Map, event: any) {
  if (event.graphic && event.graphic.attr && event.graphic.attr.id === "ug-dorm") {
    flyToDormLabelView(map);
    // 超链接跳转到https://ug666.top/vr
    // window.open("https://ug666.top/vr", "_blank");
  }
}
