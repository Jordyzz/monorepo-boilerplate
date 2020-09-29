import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import classNames from "classnames";

import styles from "./InputField.module.scss";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const InputField = (props: InputFieldProps) => {
  const [field, { touched, error }] = useField(props);
  return (
    <div className={styles.container}>
      <div className={styles.label}>{props.label}</div>
      <input
        {...field}
        {...props}
        className={classNames(styles.input, props.className)}
      />
      {touched && error ? <div style={{ color: "red" }}>{error}</div> : null}
    </div>
  );
};

export default InputField;
