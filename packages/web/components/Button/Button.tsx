import React from "react";
import classNames from "classnames";

import { ButtonProps } from "./Button.interface";
import styles from "./Button.module.scss";

function Button({
  children,
  onClick,
  className,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        styles.button,
        className,
        disabled ? styles.disabled : ""
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
