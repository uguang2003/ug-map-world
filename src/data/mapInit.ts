import * as mars3d from "mars3d";
import { jxufeData } from "./jxufeMap/jxufeData";
import { addNanchangSpots } from "./famousSpots/nanchangSpots";
import { addLoveSpots } from "./loveVestige/loveSpots";

// 保证全局只存在一个 graphicLayer
let globalGraphicLayer: any = null;

export function initMap(map: mars3d.Map, isRomantic: boolean) {
  // 清除旧图层
  if (globalGraphicLayer) {
    map.removeLayer(globalGraphicLayer, true);
    globalGraphicLayer = null;
  }

  const graphicLayer = new mars3d.layer.GraphicLayer();
  map.addLayer(graphicLayer);
  globalGraphicLayer = graphicLayer;

  // 绑定常用事件
  graphicLayer.on(mars3d.EventType.click, (event: any) => {

  });
  graphicLayer.on(mars3d.EventType.mouseOver, (event: any) => {
    // 可自定义鼠标移入事件
  });
  graphicLayer.on(mars3d.EventType.mouseOut, (event: any) => {
    // 可自定义鼠标移出事件
  });

  // 右键菜单
  graphicLayer.bindContextMenu([
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      callback: (e: any) => {
        const graphic = e.graphic;
        if (graphic) graphicLayer.removeGraphic(graphic);
      },
    } as any,
  ]);

  if (isRomantic) {
    // 添加爱情专属地点
    addLoveSpots(graphicLayer);
  } else {
    // 添加数据
    jxufeData.addJXUFE(graphicLayer);
    // 添加南昌著名景点标注
    addNanchangSpots(graphicLayer);
  }
}
