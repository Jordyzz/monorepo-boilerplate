import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent, { DRAWER_WIDTH } from "./Drawer";
import Programs from "./Programs";
import { HomeRoutes } from "../utils/Navigation";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => (
  <Drawer.Navigator
    drawerContent={DrawerContent}
    drawerStyle={{ width: DRAWER_WIDTH }}
  >
    <Drawer.Screen name="Programs" component={Programs} />
  </Drawer.Navigator>
);
