import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { ContainerProps } from "./Container.interface";
import { themeService } from "../../core/ThemeService";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const assets = [
  require("../../../assets/patterns/pattern1.png"),
] as const;
const { width, height: wHeight } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

const styles = StyleSheet.create({
  container: {
    height: wHeight,
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
    justifyContent: "center",
  },
  content: {
    borderRadius: 75,
    borderTopLeftRadius: 0,
    backgroundColor: themeService.theme.colors.white,
    flex: 1,
  },
  footer: {
    backgroundColor: themeService.theme.colors.secondary,
    padding: themeService.theme.spacing.m,
  },
});

const Container = ({ children, footer, pattern }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const asset = assets[pattern];

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={{ backgroundColor: themeService.theme.colors.white }}>
          <View style={styles.imageContainer}>
            <Image
              source={asset}
              style={{ width, height, borderBottomLeftRadius: 75 }}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Image
            source={asset}
            style={{
              ...StyleSheet.absoluteFillObject,
              width,
              height,
              top: -height * 0.61,
              backgroundColor: themeService.theme.colors.white,
            }}
          />
          <View style={styles.content}>{children}</View>
          <View style={styles.footer}>
            {footer}
            <View style={{ height: insets.bottom }} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Container;
