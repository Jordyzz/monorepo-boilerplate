import React, { forwardRef } from "react";
import { View, StyleSheet, TextInput as RNTextInput } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { TextInputProps } from "./TextInput.interface";
import { themeService } from "../../../core/ThemeService";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  validatorIcon: {
    height: 25,
    width: 25,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ touched, error, icon, ...props }: TextInputProps, ref) => {
    const { text, danger, primary } = themeService.theme.colors;
    const color = error ? danger : touched ? primary : text;

    return (
      <View style={[styles.container, { borderColor: color }]}>
        <View style={{ paddingRight: 8 }}>
          <Icon name={icon} {...{ color }} size={16} />
        </View>
        <View style={{ flex: 1 }}>
          <RNTextInput
            {...{ ref }}
            underlineColorAndroid="transparent"
            placeholderTextColor={color}
            {...props}
          />
        </View>
        {touched && (
          <View style={[styles.validatorIcon, { backgroundColor: color }]}>
            <Icon name={!error ? "check" : "x"} color="white" size={16} />
          </View>
        )}
      </View>
    );
  }
);

export default TextInput;
