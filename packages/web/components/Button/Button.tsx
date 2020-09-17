import React from "react";
import classNames from "classnames";

import { ButtonProps } from "./Button.interface";
import styles from "./Button.module.scss";

function Button(props: ButtonProps) {
  const { children, onClick, className, type = "button" } = props;

  return (
    <button
      type={type}
      className={classNames(styles.button, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
