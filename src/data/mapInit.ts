import * as mars3d from "mars3d";
import { jxufeData } from "./jxufeMap/jxufeData";
import { handleDormLabelClick } from "./jxufeMap/jxufeMapActions";

export function initMap(map: mars3d.Map) {
  const graphicLayer = new mars3d.layer.GraphicLayer();
  map.addLayer(graphicLayer);

  // 绑定常用事件
  graphicLayer.on(mars3d.EventType.click, (event: any) => {
    handleDormLabelClick(map, event);
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

  // 添加数据
  jxufeData.addJXUFE(graphicLayer);
}
