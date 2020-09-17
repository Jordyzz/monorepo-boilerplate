import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SubSlideProps } from "./SubSlide.interface";
import Button from "../../../components/Button";
import { themeService } from "../../../core/ThemeService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 34,
    paddingBottom: 15,
  },
  subtitle: {
    fontFamily: "SFProText-Semibold",
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 8,
    marginTop: 8,
    color: themeService.theme.colors.secondary,
    textAlign: "center",
  },
  description: {
    fontFamily: "SFProText-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: themeService.theme.colors.secondary,
    textAlign: "center",
    marginBottom: 30,
  },
});

const SubSlide = ({ subtitle, description, last, onPress }: SubSlideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
        {...{ onPress }}
      />
    </View>
  );
};

export default SubSlide;
