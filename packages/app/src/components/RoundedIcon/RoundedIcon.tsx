import React from "react";
import { View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { RoundedIconProps } from "./RoundedIcon.interface";

const RoundedIcon = ({
  name,
  color,
  backgroundColor,
  size,
  iconRatio = 0.7,
}: RoundedIconProps) => {
  const iconSize = size * iconRatio;
  return (
    <View
      style={{
        backgroundColor,
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: size / 2,
      }}
    >
      <Icon
        {...{ name }}
        {...{ color }}
        size={iconSize}
        style={{ textAlign: "center" }}
      />
    </View>
  );
};

export default RoundedIcon;
