import React from "react";
import { View, StyleSheet, Image, Dimensions, Text } from "react-native";

import { themeService } from "../../core/ThemeService";
import DrawerItem from "./DrawerItem";
import { DrawerItemProps } from "./DrawerItem/DrawerItem.interface";
import RoundedIconButton from "../../components/RoundedIconButton";

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const { white, primary, secondary, primaryLight } = themeService.theme.colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallContainer: {
    flex: 0.15,
    backgroundColor: white,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: white,
    borderTopLeftRadius: 75,
    borderBottomRightRadius: 75,
    justifyContent: "center",
    padding: themeService.theme.spacing.xl,
  },
  profileIcon: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: primary,
    left: DRAWER_WIDTH / 2 - 50,
    top: -50,
    borderRadius: 50,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

const items: Array<DrawerItemProps> = [
  {
    icon: "zap",
    label: "Program Categories",
    screen: "Categories",
    color: primary,
  },
  {
    icon: "heart",
    label: "All Programs",
    screen: "Programs",
    color: "#FA4716",
  },
  {
    icon: "clock",
    label: "Program History",
    screen: "History",
    color: "#F17A98",
  },
  {
    icon: "user",
    label: "Edit Profile",
    screen: "EditProfile",
    color: "#FFBF00",
  },
  {
    icon: "settings",
    label: "Notification Settings",
    screen: "NotificationSettings",
    color: "#4F33B4",
  },
  {
    icon: "log-out",
    label: "Logout",
    screen: "Logout",
    color: secondary,
  },
];

const Drawer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.smallContainer}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            borderBottomRightRadius: 75,
            backgroundColor: secondary,
            flexDirection: "row",
            paddingTop: 22,
            justifyContent: "space-between",
            paddingHorizontal: themeService.theme.spacing.m,
          }}
        >
          <RoundedIconButton
            name="x"
            size={24}
            color={white}
            backgroundColor={secondary}
            onPress={() => true}
          />
          <Text style={{ fontSize: 13, color: white }}>MY PROFILE</Text>
          <RoundedIconButton
            name="x"
            size={24}
            color={secondary}
            backgroundColor={secondary}
            onPress={() => true}
          />
        </View>
      </View>
      <View style={{ flex: 0.85 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: secondary,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: primaryLight,
          }}
        />
        <Image
          style={{
            position: "absolute",
            bottom: -height * 0.5,
            left: 0,
            right: 0,
            width: DRAWER_WIDTH,
            height,
          }}
          source={require("../../../assets/patterns/pattern1.png")}
        />
        <View style={styles.content}>
          <View style={styles.profileIcon} />
          <View style={{ marginVertical: 30 }}>
            <Text
              style={{
                ...themeService.theme.textVariants.title1,
                textAlign: "center",
              }}
            >
              Yarden Sagi
            </Text>
            <Text
              style={{
                ...themeService.theme.textVariants.body,
                textAlign: "center",
              }}
            >
              joe@gmail.com
            </Text>
          </View>
          {items.map((item) => (
            <DrawerItem key={item.screen} {...item} />
          ))}
        </View>
      </View>
      <View
        style={{
          backgroundColor: white,
          width: DRAWER_WIDTH,
          height: height * 0.5,
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
          }}
          source={require("../../../assets/patterns/pattern1.png")}
        />
      </View>
    </View>
  );
};

export default Drawer;
