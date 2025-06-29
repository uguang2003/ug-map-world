export const nanchangSpots = [
  {
    name: "滕王阁",
    position: [115.857964, 28.682892, 30],
  },
  {
    name: "八一起义纪念馆",
    position: [115.893528, 28.689455, 30],
  },
  {
    name: "南昌之星摩天轮",
    position: [115.930278, 28.698056, 30],
  },
  {
    name: "秋水广场",
    position: [115.857222, 28.684444, 30],
  },
];

import * as mars3d from "mars3d";
/**
 * 将南昌景点批量添加到图层
 */
export function addNanchangSpots(graphicLayer: any) {
  nanchangSpots.forEach(spot => {
    const point = new mars3d.graphic.PointEntity({
      position: spot.position,
      style: {
        pixelSize: 16,
        color: "#ff7800",
        outline: true,
        outlineColor: "#fff",
        label: {
          text: spot.name,
          font_size: 18,
          color: "#1e90ff",
          outline: true,
          outlineColor: "#fff",
          outlineWidth: 2,
          pixelOffsetY: -30,
        },
      },
    });
    graphicLayer.addGraphic(point);
  });
}
