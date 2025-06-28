import * as mars3d from "mars3d";

const Cesium = mars3d.Cesium;

export const jxufeData = {
  addJXUFE: (graphicLayer: mars3d.layer.GraphicLayer) => {
    const graphic = new mars3d.graphic.LabelEntity({
      position: new mars3d.LngLatPoint(115.831852, 28.736464, 0),
      style: {
        text: "UG的宿舍",
        font_size: 22,
        font_family: "微软雅黑",
        color: "#1a8917",
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        visibleDepth: false,
      },
      attr: { remark: "UG的宿舍", id: "ug-dorm" },
    });
    graphicLayer.addGraphic(graphic);
  },
};
