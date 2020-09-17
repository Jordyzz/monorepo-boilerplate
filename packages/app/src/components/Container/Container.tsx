import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { ContainerProps } from "./Container.interface";
import { themeService } from "../../core/ThemeService";

export const assets = [require("../../../assets/patterns/pattern1.png")];
const { width } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeService.theme.colors.secondary,
  },
  imageContainer: {
    borderBottomLeftRadius: 75,
    overflow: "hidden",
    height: height * 0.61,
    backgroundColor: themeService.theme.colors.white,
  },
  contentContainer: {
    flex: 1,
    overflow: "hidden",
  },
  content: {
    borderRadius: 75,
    borderTopLeftRadius: 0,
    backgroundColor: themeService.theme.colors.white,
    flex: 1,
  },
  footer: {
    backgroundColor: themeService.theme.colors.secondary,
    height: 100,
  },
});

const Container = ({ children, footer }: ContainerProps) => {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: themeService.theme.colors.white }}>
        <View style={styles.imageContainer}>
          <Image
            source={assets[0]}
            style={{ width, height, borderBottomLeftRadius: 75 }}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={assets[0]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
            height,
            top: -height * 0.61,
            backgroundColor: themeService.theme.colors.white,
          }}
        />

        <View style={styles.content}>{children}</View>
        <View style={styles.footer}>{footer}</View>
      </View>
    </View>
  );
};

export default Container;
