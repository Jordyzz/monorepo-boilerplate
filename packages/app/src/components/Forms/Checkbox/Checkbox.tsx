import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { CheckboxProps } from "./Checkbox.interface";
import { themeService } from "../../../core/ThemeService";
import { RectButton } from "react-native-gesture-handler";

const { white, primary } = themeService.theme.colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    borderRadius: 5,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: primary,
    marginRight: themeService.theme.spacing.s,
  },
});

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <RectButton style={{ justifyContent: "center" }} onPress={() => onChange()}>
      <View style={styles.container}>
        <View
          style={[
            styles.checkbox,
            { backgroundColor: checked ? primary : white },
          ]}
        >
          <Icon name="check" color={white} />
        </View>
        <Text>{label}</Text>
      </View>
    </RectButton>
  );
};

export default Checkbox;
