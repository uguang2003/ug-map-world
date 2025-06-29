<template>
  <div :id="withKeyId" class="mars3d-container"></div>
</template>
<script setup lang="ts">
import * as mars3d from "mars3d";
import "./expand/index"; // 引入插件或注册扩展js

import { computed, onUnmounted, onMounted, toRaw } from "vue";
// import { $alert, $message } from "@mars/components/mars-ui/index"

const props = withDefaults(
  defineProps<{
    mapKey?: string; // 多个地图时,可传入key区分地图
    url?: string; // 传入的地图构造参数url，可为空，只传options
    options?: any; // 传入的地图构造参数options，可覆盖url内的参数
  }>(),
  {
    mapKey: "default",
    url: undefined,
    options: undefined,
  }
);

// 用于存放地球组件实例
let map: mars3d.Map; // 地图对象

// 使用用户传入的 mapKey 拼接生成 withKeyId 作为当前显示容器的id
const withKeyId = computed(() => `mars3d-container-${props.mapKey}`);

// onload事件将在地图渲染后触发
const emit = defineEmits(["onload"]);

const initMars3d = async () => {
  // 获取配置
  let mapOptions;
  if (props.url) {
    // 存在url时才读取
    mapOptions = await mars3d.Util.fetchJson({ url: props.url });
    if (props.options) {
      mapOptions = mars3d.Util.merge(mapOptions, toRaw(props.options)); // 合并配置
    }
  } else if (props.options) {
    mapOptions = toRaw(props.options);
  }
  console.log("Map地图构造参数", mapOptions);

  map = new mars3d.Map(withKeyId.value, mapOptions);

  // 针对不同终端的优化配置
  if (mars3d.Util.isPCBroswer()) {
    map.zoomFactor = 2.0; // 鼠标滚轮放大的步长参数

    // IE浏览器优化
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 0) {
      map.viewer.targetFrameRate = 20; // 限制帧率
      map.scene.requestRenderMode = false; // 取消实时渲染
    }
  } else {
    map.zoomFactor = 5.0; // 鼠标滚轮放大的步长参数

    // 移动设备上禁掉以下几个选项，可以相对更加流畅
    map.scene.requestRenderMode = false; // 取消实时渲染
    map.scene.fog.enabled = false;
    map.scene.skyAtmosphere.show = false;
    map.scene.globe.showGroundAtmosphere = false;
  }

  // 二三维切换不用动画
  if (map.viewer.sceneModePicker) {
    map.viewer.sceneModePicker.viewModel.duration = 0.0;
  }

  // 绑定当前项目的默认右键菜单
  // map.bindContextMenu(getContextMenu())

  // webgl渲染失败后，刷新页面
  // map.on(mars3d.EventType.renderError, async () => {
  //   await $alert("程序内存消耗过大，请重启浏览器")
  //   window.location.reload()
  // })

  onMapLoad(); // map构造完成后的一些处理

  emit("onload", map);
};

// 拦截Canvas绘制操作，阻止logo绘制
function interceptCanvasDrawing() {
  const logoSignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAA8CAYAAAAjW/WRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENDU0N0QxOEE5RTQxMUU5OTc1MEVDNEZERkI2N0U4OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENDU0N0QxOUE5RTQxMUU5OTc1MEVDNEZERkI2N0U4OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ0NTQ3RDE2QTlFNDExRTk5NzUwRUM0RkRGQjY3RTg5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ0NTQ3RDE3QTlFNDExRTk5NzUwRUM0RkRGQjY3RTg5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MFni3AAAIpNJREFUeNrsXQmcFMW5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'

  // 创建一个透明图片用于替换logo
  function createTransparentImage(width: number = 88, height: number = 20): HTMLImageElement {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, width, height)
    const img = new Image()
    img.src = canvas.toDataURL('image/png')
    return img
  }

  // 拦截Image对象的创建和加载
  const OriginalImage = window.Image
  window.Image = function (this: HTMLImageElement, width?: number, height?: number) {
    const img = new OriginalImage(width, height)
    let originalSrc = ''
    // 只在src属性可配置时defineProperty，防止TypeError
    try {
      const desc = Object.getOwnPropertyDescriptor(img, 'src')
      if (!desc || desc.configurable) {
        Object.defineProperty(img, 'src', {
          configurable: true,
          enumerable: true,
          get() {
            return originalSrc
          },
          set(value: string) {
            if (value && value.includes(logoSignature)) {
              console.log('拦截Mars3D logo图片加载，替换为透明图片')
              const transparentImg = createTransparentImage()
              originalSrc = transparentImg.src
              img.setAttribute('src', originalSrc)
            } else {
              originalSrc = value
              img.setAttribute('src', value)
            }
          }
        })
      }
    } catch (e) {
      // 忽略defineProperty失败，避免报错
    }
    return img
  } as any
}

// map构造完成后的一些处理，可以按需注释和选用
function onMapLoad() {
  // Mars3D地图内部使用，如右键菜单弹窗
  // @ts-ignore
  // window.globalAlert = $alert;
  // // @ts-ignore
  // window.globalMsg = $message;
}

onMounted(() => {
  interceptCanvasDrawing();

  initMars3d();
});
// 组件卸载之前销毁mars3d实例
onUnmounted(() => {
  if (map) {
    map.destroy();
    map = null;
  }
  console.log("map销毁完成", map);
});
</script>

<style lang="less">
/**cesium 工具按钮栏*/
.cesium-viewer-toolbar {
  top: auto !important;
  bottom: 35px !important;
  left: 12px !important;
  right: auto !important;
}

.cesium-toolbar-button img {
  width: 22px;
  height: 100%;
}

.cesium-toolbar-button:hover img {
  width: 28px;
}

.cesium-svgPath-svg {
  scale: 0.8;
}

.cesium-svgPath-svg:hover {
  scale: 1;
}

.cesium-button .cesium-baseLayerPicker-selected {
  width: 100%;
}

.cesium-button:hover .cesium-baseLayerPicker-selected {
  width: 100%;
}

.cesium-viewer-toolbar>.cesium-toolbar-button,
.cesium-navigationHelpButton-wrapper,
.cesium-viewer-geocoderContainer {
  margin-bottom: 5px;
  float: left;
  clear: both;
  text-align: center;
}

.cesium-viewer-geocoderContainer form .cesium-geocoder-input {
  border-width: 1px;
  border-image: url("//data.mars3d.cn/img/control/border.svg") 1 round stretch;
}

.cesium-button {
  background-color: rgba(39, 44, 54, 0.8);

  border-radius: 2px;
  border-width: 1px;
  border-image: url("//data.mars3d.cn/img/control/border.svg") 1 round stretch;

  color: #ffffff;
  fill: #e6e6e6;
  line-height: 38px;
}

.cesium-button:hover {
  background-color: rgba(51, 133, 255, 1);
  box-shadow: none;
  border: none;
}

/**cesium 底图切换面板*/
.cesium-baseLayerPicker-dropDown {
  bottom: 0;
  left: 40px;
  max-height: 700px;
  margin-bottom: 5px;
  background-color: rgba(23, 49, 71, 0.7);
}

/**cesium 帮助面板*/
.cesium-navigation-help {
  top: auto;
  bottom: 0;
  left: 40px;
  transform-origin: left bottom;
  background: none;
  background-color: rgba(23, 49, 71, 0.8);

  .cesium-navigation-help-instructions,
  .cesium-navigation-button {
    background: none;
  }

  .cesium-navigation-button-selected,
  .cesium-navigation-button-unselected:hover {
    background-color: rgba(1, 35, 22, 1);
  }
}

/**cesium 二维三维切换*/
.cesium-sceneModePicker-wrapper {
  width: auto;
}

.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  float: right;
  margin: 0 3px;
}

/**cesium POI查询输入框*/
.cesium-viewer-geocoderContainer .search-results {
  left: 0;
  right: 40px;
  width: auto;
  z-index: 9999;
}

.cesium-geocoder-searchButton {
  width: 38px;
  height: 38px;
  background-color: rgba(39, 44, 54, 0.8);
  border-radius: 2px;
  border-width: 1px;
  border-image: url("//data.mars3d.cn/img/control/border.svg") 1 round stretch;
  fill: #e6e6e6;
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  height: 40px;
  width: 40px;
  background-color: rgba(63, 72, 84, 0.7);
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  background-color: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

.cesium-viewer-geocoderContainer .search-results {
  background-color: rgba(23, 49, 71, 0.8);
}

/**cesium info信息框*/
.cesium-infoBox {
  top: 50px;
  background: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

.cesium-infoBox-title {
  background-color: rgba(23, 49, 71, 0.8);
}

/**cesium 任务栏的FPS信息*/
.cesium-performanceDisplay-defaultContainer {
  top: auto;
  bottom: 35px;
  right: 50px;
}

.cesium-performanceDisplay-ms,
.cesium-performanceDisplay-fps {
  color: #fff;
}

/**cesium tileset调试信息面板*/
.cesium-viewer-cesiumInspectorContainer {
  top: 10px;
  left: 10px;
  right: auto;
}

.cesium-cesiumInspector {
  background-color: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

/**覆盖mars3d内部控件的颜色等样式*/
.mars3d-compass .mars3d-compass-outer {
  fill: rgba(39, 44, 54, 0.8);
}

.mars3d-compass .mars3d-compass-inner {
  background: rgba(39, 44, 54, 0.8);
  fill: #fff;
}

.mars3d-contextmenu-ul,
.mars3d-sub-menu {
  background-color: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

.mars3d-contextmenu-ul {
  border-radius: 2px;
  border-width: 1px;
  border-image: url("//data.mars3d.cn/img/control/border.svg") 1 round stretch;
}

.mars3d-contextmenu-ul>li>a:hover,
.mars3d-sub-menu>li>a:hover,
.mars3d-contextmenu-ul>li>a:focus,
.mars3d-sub-menu>li>a:focus,
.mars3d-contextmenu-ul>li>.active,
.mars3d-sub-menu>li>.active {
  background-color: var(--mars-hover-color, #3ea6ff);
}

.mars3d-contextmenu-ul>.active>a,
.mars3d-sub-menu>.active>a,
.mars3d-contextmenu-ul>.active>a:hover,
.mars3d-sub-menu>.active>a:hover,
.mars3d-contextmenu-ul>.active>a:focus,
.mars3d-sub-menu>.active>a:focus {
  background-color: var(--mars-hover-color, #3ea6ff);
}

/* Popup样式*/
.mars3d-popup-color {
  color: var(--mars-text-color, #ffffff);
}

.mars3d-popup-background {
  // background: none会导致剖面的popup没有颜色
  background: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

// .mars3d-popup-content-wrapper {
//   box-shadow: none !important;
//   padding: 0 !important;
//   background: var(--mars-base-border) !important;
//   border-radius: 4px;
// }

.mars3d-popup-content {
  margin: 15px;
}

.mars3d-popup-btn-custom {
  padding: 3px 10px;
  border: 1px solid #209ffd;
  background: #209ffd1c;
  color: var(--mars-text-color);
}

.mars3d-tooltip {
  color: var(--mars-text-color, #ffffff);
  background: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
  border: 1px solid var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

.mars3d-tooltip-top:before {
  border-top-color: var(--mars-bg-base, rgba(23, 49, 71, 0.8));
}

.mars3d-tooltip-bottom:before {
  border-bottom-color: var(--mars-bg-base, rgba(23, 49, 71, 0.8));
}

.mars3d-tooltip-left:before {
  border-left-color: var(--mars-bg-base, rgba(23, 49, 71, 0.8));
}

.mars3d-tooltip-right:before {
  border-right-color: var(--mars-bg-base, rgba(23, 49, 71, 0.8));
}

.mars3d-template-content label {
  padding-right: 6px;
}

/* all 中的html样式 */
.mars3d-template-titile {
  height: 33px;
  line-height: 33px;
  padding-left: 10px;
  border-radius: 4px 4px 0px 0px;
  box-shadow: 0px 6px 12px -2px rgba(50, 50, 93, 0.15),
    0px 3px 7px -3px rgba(0, 0, 0, 0.2);
  color: var(--mars-control-text) !important;
  background: var(--mars-msg-title-bg);
  font-family: var(--mars-font-family);

  a {
    font-size: 16px;
    color: var(--mars-msg-title-color, #479be0);
    text-decoration: none;
  }
}

.mars3d-template-content {
  margin-top: 0 !important;
  background-color: var(--mars-dropdown-bg);
  padding: 10px;
  color: #eaf2ff;

  label {
    padding-right: 6px;
  }

  input {
    color: var(--mars-text-color);
    background-color: transparent !important;
    padding: 4px 5px;
  }

  input::placeholder {
    color: #cdcdcd !important;
  }

  textarea {
    color: var(--mars-base-color);
    background-color: transparent !important;
    padding: 4px 5px;
  }

  textarea::placeholder {
    color: #cdcdcd !important;
  }
}

.mars3d-popup-btn-custom {
  padding: 3px 10px;
  border: 1px solid #209ffd;
  background: #209ffd1c;
  color: var(--mars-text-color, #ffffff);
}

.mars3d-popup-content {
  margin: 15px;
}

.mars3d-divGraphic:hover {
  z-index: 999 !important;
}
</style>
