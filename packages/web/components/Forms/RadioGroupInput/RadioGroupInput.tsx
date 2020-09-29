import React from "react";
import { useField } from "formik";
import classNames from "classnames";

import styles from "./RadioGroupInput.module.scss";
import Icon from "../../Icon";
import { RadioGroupInputProps } from "./RadioGroupInput.interface";

const RadioGroupInput = (props: RadioGroupInputProps) => {
  const [field, { value }, { setValue }] = useField(props.name);
  return (
    <div className={styles.container}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.radioContainer}>
        {props.items.map((item) => (
          <div
            key={item.label}
            onClick={() => setValue(item.value)}
            className={classNames(
              styles.radioItem,
              item.value === value && styles.radioSelected
            )}
          >
            {item.icon ? <Icon type={item.icon} /> : item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroupInput;
