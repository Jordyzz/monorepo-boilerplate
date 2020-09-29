import { IconType } from "../../Icon/Icon.interface";

export interface MenuItemProps {
  title?: string;
  iconType: IconType;
  label: string;
  path: string;
  active: boolean;
}
