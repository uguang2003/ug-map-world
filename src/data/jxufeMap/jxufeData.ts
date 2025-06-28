import * as mars3d from "mars3d";

const Cesium = mars3d.Cesium;

export const jxufeData = {
  addJXUFE: (graphicLayer: mars3d.layer.GraphicLayer) => {
    const graphic = new mars3d.graphic.LabelEntity({
      position: new mars3d.LngLatPoint(115.831852, 28.736464, 30),
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
      popup: `<div style="padding:8px 0;min-width:120px;text-align:center;">
        <div style='font-weight:700;font-size:16px;margin-bottom:8px;'>UG的宿舍</div>
        <button id='ug-dorm-fly-btn' style='background:#1a8917;color:#fff;border:none;border-radius:6px;padding:6px 18px;cursor:pointer;font-size:15px;'>点击进入</button>
      </div>`
    });
    graphicLayer.addGraphic(graphic);
    // 事件绑定：弹窗按钮点击跳转
    graphicLayer.on('popupOpen', function (event) {
      if (event.graphic && event.graphic.attr && event.graphic.attr.id === 'ug-dorm') {
        setTimeout(() => {
          const btn = document.getElementById('ug-dorm-fly-btn');
          if (btn) {
            btn.onclick = function () {
              // 超链接跳转
              window.open("https://ug666.top/vr", "_blank");
            };
          }
        }, 0);
      }
    });
  },
};
