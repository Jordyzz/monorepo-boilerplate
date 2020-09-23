import { ReactNode } from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "default";
  label?: string;
  onPress: () => void;
  children?: ReactNode;
}
