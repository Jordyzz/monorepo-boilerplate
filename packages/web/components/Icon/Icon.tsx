import React from "react";
import classNames from "classnames";

import { IconProps } from "./Icon.interface";
import { iconMap } from "./iconMap";
import styles from "./Icon.module.scss";

const Icon = ({ type, disabled = false, onClick, className }: IconProps) => {
  const icon = iconMap[type!];
  return (
    <div
      dangerouslySetInnerHTML={{ __html: icon }}
      className={classNames(
        styles.iconContainer,
        className,
        disabled && styles.disabledIcon
      )}
      onClick={onClick}
    />
  );
};

export default Icon;
