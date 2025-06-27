# 芝加昌数字孪生 (ZJC-3D)

> 基于 Mars3D 和 Vue 3 构建的芝加昌（南昌）数字孪生系统

## 📋 项目简介

芝加昌数字孪生是一个基于现代 Web 技术栈构建的三维数字孪生平台，专注于展示和管理芝加昌（南昌）地区的地理信息和空间数据。项目采用 Mars3D 三维引擎、Vue 3 框架和 TypeScript 语言开发，提供高性能的三维可视化体验。

## ✨ 主要特性

- 🌍 **三维地球展示** - 基于 Mars3D 和 Cesium 的高性能三维渲染
- 🗺️ **多地图底图支持** - 支持百度、高德、谷歌、天地图等多种地图源
- 📍 **图形标注功能** - 支持点、线、面等多种图形的绘制和编辑
- 📷 **相机视角管理** - 支持多个预设视角的保存和切换
- 🎬 **动画效果** - 支持飞行路线、缩放动画等动态效果
- 📱 **响应式设计** - 适配桌面端和移动端设备
- 🔧 **组件化开发** - 基于 Vue 3 的组件化架构，易于扩展和维护

## 🛠️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **三维引擎**: Mars3D + Cesium
- **构建工具**: Vite
- **样式语言**: Less
- **空间分析**: Turf.js

## 📦 项目结构

```
zjc-3d/
├── public/                 # 静态资源
│   ├── config/            # 配置文件
│   └── img/              # 图片资源
│       ├── basemaps/     # 底图图标
│       ├── marker/       # 标记图标
│       └── textures/     # 纹理贴图
├── src/                   # 源代码
│   ├── components/       # Vue 组件
│   │   └── mars-work/   # Mars3D 相关组件
│   ├── App.vue          # 根组件
│   ├── main.ts          # 入口文件
│   └── style.css        # 全局样式
├── index.html            # HTML 模板
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发环境启动

```bash
# 启动开发服务器
npm run dev

# 或
npm run serve
```

访问 http://localhost:5173 查看项目

### 生产环境构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🔧 配置说明

### 地图配置

地图相关配置位于 `public/config/config.json` 文件中，您可以根据需要修改：

- 默认视角位置
- 底图图层配置
- 地形数据源
- 影像图层设置

### 底图支持

项目已集成多种底图资源：

- **国内地图**: 百度地图、高德地图、天地图、腾讯地图
- **国外地图**: Google Maps、ArcGIS、Bing Maps、Mapbox
- **开源地图**: OpenStreetMap、Stamen 地图
- **离线地图**: 支持本地离线底图

## 📖 核心功能模块

### 1. 地图组件 (mars-map.vue)

主要的三维地图展示组件，负责地图的初始化、视角控制和基础交互。

### 2. 图形绘制模块

- **CanvasBillboard.js**: Canvas 画布广告牌功能
- **标记系统**: 支持自定义图标的点标记

### 3. 任务模块

- **CameraList.js**: 相机视角列表管理
- **CameraView.js**: 相机视角切换
- **RouteLine.js**: 路线规划和展示
- **MapRotate.js**: 地图旋转动画
- **ZoomIn/ZoomOut.js**: 缩放动画效果
- **FlickerEntity.js**: 实体闪烁效果
- **PointRotate.js**: 点位旋转动画

## 🎯 使用示例

### 基础地图初始化

```typescript
import { ref, onMounted } from "vue";
import * as mars3d from "mars3d";

const mapInstance = ref<mars3d.Map>();

onMounted(() => {
  // 初始化地图
  mapInstance.value = new mars3d.Map("map-container", {
    scene: {
      center: { lat: 28.682892, lng: 115.858197, alt: 50000 },
    },
  });
});
```

### 添加图形标注

```typescript
// 添加点标记
const addMarker = (position: any) => {
  const graphic = new mars3d.graphic.BillboardEntity({
    position: position,
    style: {
      image: "/img/marker/mark-blue.png",
      scale: 1,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  });

  mapInstance.value?.graphicLayer.addGraphic(graphic);
};
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 开源协议

本项目基于 Apache-2.0 协议开源，详见 [LICENSE](LICENSE) 文件。

## 📞 联系我们

- **作者**: UG
- **邮箱**: uguang2003@gmail.cn
- **主页**: https://ug666.top/
- **问题反馈**: [GitHub Issues](https://github.com/uguang2003/ZJC-3D/issues)

## 🙏 致谢

- [Mars3D](http://mars3d.cn/) - 基于 Cesium 的三维地球框架
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Cesium](https://cesium.com/) - 开源三维地球和地图引擎
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

---

🌟 如果这个项目对您有帮助，请给我们一个 Star！
