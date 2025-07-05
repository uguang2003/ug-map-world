import * as mars3d from "mars3d";

// 存储所有点位的引用，key为索引
const loveSpotGraphicsMap = new Map<number, any>();

export const loveSpots = [
  {
    name: "第一次见面的教室",
    position: [115.830707,28.737097,35.9],
    camera: { "lat":28.736042,"lng":115.830789,"alt":204.6,"heading":356.3,"pitch":-56.9 },
    image: "/img/loveVestigeImg/1.jpg"
  },
  {
    name: "第二次见面的台球厅",
    position: [115.833854,28.737129,19.5],
    camera: { "lat":28.735782,"lng":115.833828,"alt":166.6,"heading":360,"pitch":-45 },
    // image: "/img/loveVestigeImg/2.jpg"
  },
  {
    name: "第一次约会的七星岭滑雪场",
    position: [114.187427,28.440878,1285],
    camera: { "lat":28.409027,"lng":114.185226,"alt":6647.4,"heading":355.3,"pitch":-61.4 },
    image: "/img/loveVestigeImg/3.jpg"
  },
  {
    name: "第二次约会的凤凰沟",
    position: [116.002269,28.370908,29.9],
    camera: { "lat":28.357365,"lng":116.002558,"alt":1819,"heading":357.3,"pitch":-51.1 },
    image: "/img/loveVestigeImg/4.png"
  },
  {
    name: "第三次约会的再现博物馆",
    position: [115.851192,28.689322,16.9],
    camera: { "lat":28.687993,"lng":115.850978,"alt":172,"heading":360,"pitch":-45 },
    image: "/img/loveVestigeImg/5.png"
  },
  {
    name: "表白地点",
    position: [115.877362,28.720723,11.4],
    camera: { "lat":28.719812,"lng":115.87712,"alt":259.8,"heading":1.6,"pitch":-68.8 },
    image: "/img/loveVestigeImg/6.jpg"
  },
  {
    name: "人民公园划船",
    position: [115.910119,28.684166,16.3],
    camera: { "lat":28.682564,"lng":115.909894,"alt":319.4,"heading":352.6,"pitch":-62.4 },
    image: "/img/loveVestigeImg/7.png"
  },
  {
    name: "天香园拍拍立得",
    position: [115.951298,28.656871,13.5],
    camera: { "lat":28.654743,"lng":115.950727,"alt":727.8,"heading":356.9,"pitch":-71.9 },
    image: "/img/loveVestigeImg/8.png"
  },
  {
    name: "梦时代未来玩家",
    position: [115.934739,28.675635,17],
    camera: { "lat":28.674605,"lng":115.934857,"alt":178.3,"heading":347.9,"pitch":-57.4 },
    image: "/img/loveVestigeImg/9.jpg"
  },
  {
    name: "环球公园探险",
    position: [115.836537,28.730698,27.8],
    camera: { "lat":28.729461,"lng":115.836274,"alt":179.5,"heading":2.4,"pitch":-45 },
    image: "/img/loveVestigeImg/10.jpg"
  },
  {
    name: "杭州西湖旅游",
    position: [120.062728,30.272254,13.5],
    camera: { "lat":30.264689,"lng":120.064552,"alt":1262.2,"heading":343.1,"pitch":-59 },
    image: "/img/loveVestigeImg/11.jpg"
  },
  {
    name: "盖骨里做戒指",
    position: [115.861787,28.706084,12.6],
    camera: { "lat":28.704268,"lng":115.861524,"alt":201.3,"heading":0,"pitch":-45 },
    image: "/img/loveVestigeImg/12.jpg"
  },
  {
    name: "连续待了三星期的图书馆",
    position: [115.831191,28.737465,36.7],
    camera: { "lat":28.736301,"lng":115.831127,"alt":183,"heading":359.2,"pitch":-49 },
    image: "/img/loveVestigeImg/13.jpg"
  },
  {
    name: "隔了很久才去的滕王阁",
    position: [115.875686, 28.684046, 30],
    camera: { "lat":28.682785,"lng":115.875742,"alt":234.7,"heading":350.6,"pitch":-57.4 },
    image: "/img/loveVestigeImg/14.jpg"
  },
  {
    name: "上一次约会地点-南昌之星摩天轮",
    position: [115.845911, 28.659224, 15],
    camera: { "lat":28.657746,"lng":115.84567,"alt":299.6,"heading":1.6,"pitch":-62.4 },
    image: "/img/loveVestigeImg/15.png"
  },
];

export function addLoveSpots(graphicLayer: any) {
  loveSpots.forEach((spot, idx) => {
    const point = new mars3d.graphic.PointEntity({
      position: spot.position,
      style: {
        pixelSize: 18,
        color: "#ff69b4",
        outline: true,
        outlineColor: "#fff",
        label: {
          text: spot.name,
          font_size: 30,
          color: "#e75480",
          outline: true,
          outlineColor: "#fff",
          outlineWidth: 2,
          pixelOffsetY: -30,
        },
      },
      attr: { spot, idx },
      popup: `<div style="padding:10px 0;min-width:180px;text-align:center;">
        <div style='font-weight:700;font-size:18px;margin-bottom:8px;'>${spot.name}</div>
        ${spot.image
          ? `<img src='${spot.image}' alt='${spot.name}' style='max-width:220px;max-height:140px;border-radius:10px;box-shadow:0 2px 8px #ffb6c1cc;margin-bottom:6px;' />`
          : `<div style='color:#bbb;font-size:15px;margin:18px 0 12px 0;'>没拍照片！！</div>`}
      </div>`
    });
    graphicLayer.addGraphic(point);
    loveSpotGraphicsMap.set(idx, point);
  });
}

/**
 * 根据 idx 显示对应 popup，并关闭其他 popup
 */
export function showLoveSpotPopup(idx: number) {
  loveSpotGraphicsMap.forEach((graphic, i) => {
    if (i === idx) {
      // 自动弹出时，弹窗位置更高（只影响自动弹出，不影响手动点击）
      graphic.openPopup();
    } else {
      graphic.closePopup();
    }
  });
}

