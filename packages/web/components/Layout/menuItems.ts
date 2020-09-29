import { IconType } from "../Icon/Icon.interface";

interface MenuItems {
  label: string;
  path: string;
  iconType: IconType;
  title?: string;
  authRequired?: boolean;
}

export const menuItems: MenuItems[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    iconType: "dashboard",
  },

  {
    label: "Categories",
    path: "/categories",
    iconType: "categories",
  },
  {
    label: "Programs",
    path: "/programs",
    iconType: "programs",
  },
  {
    label: "Create Program",
    path: "/program/create",
    iconType: "create",
    authRequired: true,
  },
  {
    label: "Register",
    path: "/register",
    iconType: "chat",
  },
  {
    label: "Forgot Password",
    path: "/forgot-password",
    iconType: "chat",
  },
  {
    title: "Personal Area",
    label: "Messages",
    path: "/about",
    iconType: "chat",
  },
  {
    label: "Notifications",
    path: "/login",
    iconType: "notification",
  },
];
