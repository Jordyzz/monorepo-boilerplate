import { ReactNode } from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "default" | "transparent";
  label?: string;
  onPress: () => void;
  children?: ReactNode;
}
