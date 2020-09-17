import React from "react";
import { View } from "react-native";
import { PaginationDotProps } from "./PaginationDot.interface";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import { themeService } from "../../../core/ThemeService";

const PaginationDot = ({ index, currentIndex }: PaginationDotProps) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ scale }],
        backgroundColor: themeService.theme.colors.primary,
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4,
      }}
    ></Animated.View>
  );
};

export default PaginationDot;
