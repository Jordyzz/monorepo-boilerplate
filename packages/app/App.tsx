import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Onboarding from "./src/Authentication/Onboarding";
import Welcome from "./src/Authentication/Welcome";
import LoadAssets from "./src/components/LoadAssets";
import { Routes } from "./src/utils/Navigation";
import Login from "./src/Authentication/Login";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/FontsFree-Net-SFProText-Bold-1.ttf"),
  "SFProText-Semibold": require("./assets/fonts/FontsFree-Net-SFProText-Semibold.ttf"),
  "SFProText-Regular": require("./assets/fonts/FontsFree-Net-SFProText-Regular.ttf"),
};

const AuthenticationStack = createStackNavigator<Routes>();
const AuthenticationNavigator = () => (
  <AuthenticationStack.Navigator headerMode="none">
    <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
    <AuthenticationStack.Screen name="Welcome" component={Welcome} />
    <AuthenticationStack.Screen name="Login" component={Login} />
  </AuthenticationStack.Navigator>
);

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <AuthenticationNavigator />
    </LoadAssets>
  );
}
