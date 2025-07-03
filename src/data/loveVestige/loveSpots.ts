import * as mars3d from "mars3d";

export const loveSpots = [
  {
    name: "第一次见面的教室",
    position: [115.830707,28.737097,35.9],
  },
  {
    name: "第二次见面的台球厅",
    position: [115.833854,28.737129,19.5],
  },
  {
    name: "第一次约会的七星岭滑雪场",
    position: [114.187427,28.440878,1285],
  },
  {
    name: "第二次约会的凤凰沟",
    position: [116.002269,28.370908,29.9],
  },
  {
    name: "第三次约会的再现博物馆",
    position: [115.851192,28.689322,16.9],
  },
  {
    name: "表白地点",
    position: [115.877362,28.720723,11.4],
  },
  {
    name: "人民公园划船",
    position: [115.910119,28.684166,16.3],
  },
  {
    name: "天香园拍拍立得",
    position: [115.951298,28.656871,13.5],
  },
  {
    name: "梦时代未来玩家",
    position: [115.934739,28.675635,17],
  },
  {
    name: "环球公园探险",
    position: [115.836537,28.730698,27.8],
  },
  {
    name: "杭州西湖旅游",
    position: [120.062728,30.272254,13.5],
  },
  {
    name: "盖骨里做戒指",
    position: [115.861787,28.706084,12.6],
  },
  {
    name: "连续待了三星期的博物馆",
    position: [115.831191,28.737465,36.7],
  },
  {
    name: "隔了很久才去的滕王阁",
    position: [115.875686, 28.684046, 30],
  },
  {
    name: "上一次约会地点-南昌之星摩天轮",
    position: [115.845911, 28.659224, 15],
  },
];

export function addLoveSpots(graphicLayer: any) {
  loveSpots.forEach(spot => {
    const point = new mars3d.graphic.PointEntity({
      position: spot.position,
      style: {
        pixelSize: 18,
        color: "#ff69b4",
        outline: true,
        outlineColor: "#fff",
        label: {
          text: spot.name,
          font_size: 20,
          color: "#e75480",
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

