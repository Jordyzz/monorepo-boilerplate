import React from "react";
import { View, Text } from "react-native";

import { HeaderProps } from "./Header.interface";
import RoundedIconButton from "../RoundedIconButton";
import { themeService } from "../../core/ThemeService";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { white, secondary, lightGrey } = themeService.theme.colors;

const Header = ({ title, left, right, dark = false }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const color = dark ? white : secondary;
  const backgroundColor = dark ? secondary : lightGrey;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: insets.top,
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <RoundedIconButton
        name={left.icon}
        size={44}
        iconRatio={0.5}
        {...{ color, backgroundColor }}
        onPress={left.onPress}
      />
      <Text style={{ fontSize: 13, color, fontFamily: "SFProText-Regular" }}>
        {title}
      </Text>
      <RoundedIconButton
        name={right ? right.icon : "x"}
        size={44}
        iconRatio={0.5}
        color={right ? color : dark ? secondary : white}
        backgroundColor={right ? backgroundColor : dark ? secondary : white}
        onPress={right ? right.onPress : () => {}}
      />
    </View>
  );
};

export default Header;
