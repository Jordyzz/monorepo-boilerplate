import { TextInputProps as RNTextInputProps } from "react-native";
import { RefObject } from "react";

export interface TextInputProps extends RNTextInputProps {
  icon: string;
  touched?: boolean;
  error?: string;
}
