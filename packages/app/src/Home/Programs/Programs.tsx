import React from "react";
import { View } from "react-native";
import Header from "../../components/Header";
import { themeService } from "../../core/ThemeService";
import { HomeNavigationProps } from "../../utils/Navigation";

const Programs = ({ navigation }: HomeNavigationProps<"Programs">) => {
  return (
    <View style={{ flex: 1, backgroundColor: themeService.theme.colors.white }}>
      <Header
        title="PROGRAMS"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
      />
    </View>
  );
};

export default Programs;
