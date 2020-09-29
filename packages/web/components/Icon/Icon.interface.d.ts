import { iconMap } from "./iconMap";

export interface IconProps {
  type: IconType;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export type IconType = keyof typeof iconMap | undefined;
