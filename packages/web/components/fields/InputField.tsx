import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldProps } from "formik";
import classNames from "classnames";

import styles from "./InputField.module.scss";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <div className={styles.container}>
      <input {...field} {...props} className={classNames(styles.input)} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};
