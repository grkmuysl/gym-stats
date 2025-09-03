import React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";

interface ExerciseIconProps {
  type: "chest" | "back" | "shoulder" | "leg" | "biceps" | "triceps" | "abs";
  width?: number;
  height?: number;
  color?: string;
}

const ExerciseIcon: React.FC<ExerciseIconProps> = ({
  type,
  width = 24,
  height = 24,
  color = "#000",
}) => {
  const renderIcon = () => {
    switch (type) {
      case "chest":
        return (
          <G>
            <Path
              d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
              fill={color}
            />
            {/* Göğüs SVG path'leri */}
          </G>
        );
      case "back":
        return (
          <G>
            {/* Sırt SVG path'leri */}
            <Path d="..." fill={color} />
          </G>
        );
      case "shoulder":
        return (
          <G>
            {/* Omuz SVG path'leri */}
            <Path d="..." fill={color} />
          </G>
        );
      case "leg":
        return (
          <G>
            {/* Bacak SVG path'leri */}
            <Path d="..." fill={color} />
          </G>
        );
      case "biceps":
        return (
          <G>
            {/* Biceps SVG path'leri */}
            <Path d="..." fill={color} />
          </G>
        );
      case "triceps":
        return (
          <G>
            {/* Triceps SVG path'leri */}
            <Path d="..." fill={color} />
          </G>
        );
      case "abs":
        return (
          <G>
            {/* Karın SVG path'leri */}
            <Path d="..." fill={color} />
          </G>
        );
      default:
        return <Circle cx="12" cy="12" r="10" fill={color} />;
    }
  };

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      {renderIcon()}
    </Svg>
  );
};

export default ExerciseIcon;
