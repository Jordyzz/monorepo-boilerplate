import React from "react";
import { View } from "react-native";
import { themeService } from "../../../core/ThemeService";
import Svg, { Path } from "react-native-svg";

interface TopCurveProps {
  footerHeight: number;
}

const TopCurve = ({ footerHeight }: TopCurveProps) => {
  const size = themeService.theme.sizes.xl;
  return (
    <Svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        bottom: footerHeight,
        right: 0,
      }}
      viewBox="0 0 1 1"
    >
      <Path
        d="M 0 1 A 0 0, 0, 0, 0, 1 0 L 1 1"
        fill={themeService.theme.colors.secondary}
      ></Path>
    </Svg>
  );
};

export default TopCurve;
