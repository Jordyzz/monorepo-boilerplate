import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import LoadAssets from "./src/components/LoadAssets";
import { AuthenticationNavigator } from "./src/Authentication";
import { HomeNavigator } from "./src/Home";
import { AppRoutes } from "./src/utils/Navigation";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/FontsFree-Net-SFProText-Bold-1.ttf"),
  "SFProText-Semibold": require("./assets/fonts/FontsFree-Net-SFProText-Semibold.ttf"),
  "SFProText-Regular": require("./assets/fonts/FontsFree-Net-SFProText-Regular.ttf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <SafeAreaProvider>
        <AppStack.Navigator headerMode="none">
          <AppStack.Screen
            name="Authentication"
            component={AuthenticationNavigator}
          />
          <AppStack.Screen name="Home" component={HomeNavigator} />
        </AppStack.Navigator>
      </SafeAreaProvider>
    </LoadAssets>
  );
}
