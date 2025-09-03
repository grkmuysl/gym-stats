import * as React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";
const BicepsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    id="dumbbell"
    {...props}
  >
    <Rect width={41} height={8} x={11} y={28} fill="#232732" />
    <Rect width={11} height={24} x={45} y={20} fill="#2e3442" rx={2} />
    <Path
      fill="#232732"
      d="M56,24h3a2,2,0,0,1,2,2V38a2,2,0,0,1-2,2H56a0,0,0,0,1,0,0V24A0,0,0,0,1,56,24Z"
    />
    <Rect
      width={11}
      height={24}
      x={8}
      y={20}
      fill="#2e3442"
      rx={2}
      transform="rotate(-180 13.5 32)"
    />
    <Path
      fill="#232732"
      d="M3,24H6a2,2,0,0,1,2,2V38a2,2,0,0,1-2,2H3a0,0,0,0,1,0,0V24A0,0,0,0,1,3,24Z"
      transform="rotate(-180 5.5 32)"
    />
    <Circle cx={49} cy={34} r={1} fill="#232732" />
    <Path fill="#232732" d="M48,24v6a1,1,0,0,0,2,0V24a1,1,0,0,0-2,0Z" />
    <Path
      fill="#ffc107"
      d="M15.5 54.5a1 1 0 00.707-.293l4.5-4.5a1 1 0 00-1.414-1.414l-4.5 4.5A1 1 0 0015.5 54.5zM47.793 54.207a1 1 0 001.414-1.414l-4.5-4.5a1 1 0 00-1.414 1.414zM32 57a1 1 0 001-1V49a1 1 0 00-2 0v7A1 1 0 0032 57zM19.293 15.707a1 1 0 001.414-1.414l-4.5-4.5a1 1 0 00-1.414 1.414zM44 16a1 1 0 00.707-.293l4.5-4.5a1 1 0 00-1.414-1.414l-4.5 4.5A1 1 0 0044 16zM32 16a1 1 0 001-1V8a1 1 0 00-2 0v7A1 1 0 0032 16z"
    />
  </Svg>
);
export default BicepsIcon;
