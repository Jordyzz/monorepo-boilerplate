import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

import SocialLogin from "../SocialLogin";
import { themeService } from "../../core/ThemeService";
import { FooterProps } from "./Footer.interface";

const styles = StyleSheet.create({
  textReg: {
    fontFamily: "SFProText-Regular",
    color: themeService.theme.colors.white,
    textAlign: "center",
  },
  textHighlighed: {
    color: themeService.theme.colors.primary,
  },
});

const Footer = ({ onPress, title, action }: FooterProps) => {
  return (
    <>
      <SocialLogin />
      <View style={{ alignItems: "center", marginTop: 16 }}>
        <TouchableWithoutFeedback {...{ onPress }}>
          <Text style={styles.textReg}>
            <Text>{`${title} `}</Text>
            <Text style={styles.textHighlighed}>{`${action}`}</Text>
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default Footer;
