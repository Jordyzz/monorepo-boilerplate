import { IconType } from "../../Icon/Icon.interface";

interface RadioGroupInputProps {
  name: string;
  label: string;
  items: Array<Item>;
}

export type Item = { label: string; icon: IconType; value: string };
