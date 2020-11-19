import React from "react";
import { View, Text } from "react-native";
import { themeService } from "../../../core/ThemeService";
import { FooterProps } from "./Footer.interface";
import Button from "../../../components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Footer = ({ label, onPress, height }: FooterProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: themeService.theme.colors.secondary,
        padding: themeService.theme.spacing.m,
        borderTopLeftRadius: 65,
        height,
      }}
    >
      <View
        style={{
          paddingBottom: insets.bottom,
          alignItems: "center",
        }}
      >
        <Button variant="primary" {...{ label, onPress }} />
      </View>
    </View>
  );
};

export default Footer;
