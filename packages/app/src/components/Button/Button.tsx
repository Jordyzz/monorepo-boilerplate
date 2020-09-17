import React from "react";
import { Text, StyleSheet } from "react-native";
import { ButtonProps } from "./Button.interface";
import { RectButton } from "react-native-gesture-handler";
import { themeService } from "../../core/ThemeService";

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "SFProText-Regular",
    fontSize: 15,
    textAlign: "center",
  },
});
const Button = ({ label, variant = "default", onPress }: ButtonProps) => {
  const backgroundColor =
    variant === "primary"
      ? themeService.theme.colors.secondary
      : variant === "transparent"
      ? "transparent"
      : themeService.theme.colors.grey;
  const color =
    variant === "primary"
      ? themeService.theme.colors.white
      : themeService.theme.colors.secondary;

  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </RectButton>
  );
};

export default Button;
