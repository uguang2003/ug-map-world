export interface LocationListItem {
  id: string;
  name: string;
  type: 'dorm' | 'spot';
  cameraView: {
    lng: number;
    lat: number;
    alt: number;
    heading?: number;
    pitch?: number;
    roll?: number;
  };
}

export interface LocationListSection {
  title: string;
  items: LocationListItem[];
}

import { nanchangSpots } from "./famousSpots/nanchangSpots";
import { ugDormData } from "./jxufeMap/jxufeData";
import { loveSpots } from "./loveVestige/loveSpots";

export function getLocationListData(isRomantic: boolean): LocationListSection[] {
  if (isRomantic) {
    return [
      {
        title: "我们的足迹",
        items: loveSpots.map((s, idx) => ({
          id: `love-${idx}`,
          name: s.name,
          type: "spot",
          cameraView: s.camera
        }))
      }
    ];
  } else {
    return [
      {
        title: "校区定位",
        items: [
          {
            id: ugDormData.id,
            name: ugDormData.name,
            type: "dorm",
            cameraView: {
              lng: ugDormData.position[0],
              lat: ugDormData.position[1],
              alt: 380,
              heading: 0,
              pitch: -90
            }
          }
        ]
      },
      {
        title: "南昌著名景点",
        items: nanchangSpots.map((s, idx) => ({
          id: `spot-${idx}`,
          name: s.name,
          type: "spot",
          cameraView: {
            lng: s.position[0],
            lat: s.position[1],
            alt: 300,
            heading: 0,
            pitch: -90
          }
        }))
      }
    ];
  }
}
