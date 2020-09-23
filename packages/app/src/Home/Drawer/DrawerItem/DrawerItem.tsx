import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { DrawerItemProps } from "./DrawerItem.interface";
import { RectButton } from "react-native-gesture-handler";
import RoundedIcon from "../../../components/RoundedIcon";
import { themeService } from "../../../core/ThemeService";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  label: {
    ...themeService.theme.textVariants.button,
    textAlign: "center",
    color: themeService.theme.colors.secondary,
    marginLeft: themeService.theme.spacing.m,
  },
});

const DrawerItem = ({ icon, label, screen, color }: DrawerItemProps) => {
  return (
    <RectButton>
      <View style={styles.container}>
        <RoundedIcon
          name={icon}
          backgroundColor={color}
          color={themeService.theme.colors.white}
          size={40}
          iconRatio={0.5}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </RectButton>
  );
};

export default DrawerItem;
