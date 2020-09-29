import React from "react";
import { View, StyleSheet, Image, Dimensions, Text } from "react-native";
import { useApolloClient } from "@apollo/client";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";

import { MeDocument } from "@tango/controllers";
import { themeService } from "../../core/ThemeService";
import DrawerItem from "./DrawerItem";
import { DrawerItemProps } from "./DrawerItem/DrawerItem.interface";
import Header from "../../components/Header";

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const { white, primary, secondary } = themeService.theme.colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallContainer: {
    flex: 0.18,
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
    left: DRAWER_WIDTH / 2 - 40,
    top: -40,
    borderRadius: 50,
    width: 80,
    height: 80,
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

const Drawer = ({}: DrawerContentComponentProps<DrawerContentOptions>) => {
  const navigation = useNavigation();
  const apolloClient = useApolloClient();

  const {
    me: { email, name },
  } = apolloClient.readQuery({ query: MeDocument }) || {
    me: { email: "", name: "" },
  };

  return (
    <View style={styles.container}>
      <View style={styles.smallContainer}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            borderBottomRightRadius: 75,
            backgroundColor: secondary,
          }}
        >
          <Header
            title="MY PROFILE"
            left={{
              icon: "x",
              onPress: () => navigation.dispatch(DrawerActions.closeDrawer),
            }}
            dark
          />
        </View>
      </View>
      <View style={{ flex: 0.82 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: secondary,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: secondary,
          }}
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
              {name}
            </Text>
            <Text
              style={{
                ...themeService.theme.textVariants.body,
                textAlign: "center",
              }}
            >
              {email}
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
          height: height * 0.48,
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
            borderTopLeftRadius: 75,
          }}
          source={require("../../../assets/patterns/pattern1.png")}
        />
      </View>
    </View>
  );
};

export default Drawer;
