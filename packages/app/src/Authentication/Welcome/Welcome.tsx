import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../../components/Button";
import { StackNavigationProps, Routes } from "../../utils/Navigation";
import { themeService } from "../../core/ThemeService";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeService.theme.colors.white,
  },
  topSection: {
    flex: 0.39,
    borderBottomRightRadius: 75,
    backgroundColor: "rgba(12, 13, 52, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    flex: 0.61,
    borderTopLeftRadius: 75,
  },
  contentBox: {
    backgroundColor: themeService.theme.colors.white,
    borderTopLeftRadius: 75,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 34,
  },
  title: {
    fontFamily: "SFProText-Semibold",
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 8,
    marginTop: 8,
    color: themeService.theme.colors.secondary,
    textAlign: "center",
  },
  subtext: {
    fontFamily: "SFProText-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: themeService.theme.colors.secondary,
    textAlign: "center",
  },
});

const Welcome = ({ navigation }: StackNavigationProps<Routes, "Welcome">) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}></View>
      <View style={styles.bottomSection}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: themeService.theme.colors.grey,
          }}
        ></View>
        <View style={styles.contentBox}>
          <Text style={styles.title}>Let's get started</Text>
          <Text style={styles.subtext}>
            Login to your account below or signup to browse our programs
          </Text>
          <Button
            variant="primary"
            label="Have an account? Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button variant="default" label="Register" onPress={() => {}} />
          <Button
            variant="transparent"
            label="Forgot password?"
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default Welcome;
