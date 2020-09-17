import { ReactElement } from "react";

export interface LoadAssetsProps {
  fonts?: any;
  assets?: Array<number>;
  children: ReactElement | Array<ReactElement>;
}
