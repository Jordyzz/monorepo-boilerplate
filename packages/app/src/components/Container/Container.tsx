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

export const assets = [require("../../../assets/patterns/pattern1.png")];
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

const Container = ({ children, footer }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView>
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
          <ScrollView style={styles.content}>{children}</ScrollView>
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
