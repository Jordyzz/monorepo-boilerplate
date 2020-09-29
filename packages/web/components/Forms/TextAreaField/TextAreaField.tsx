import React, { TextareaHTMLAttributes } from "react";
import { useField } from "formik";
import classNames from "classnames";

import styles from "./TextAreaField.module.scss";

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
};

const TextAreaField = (props: TextAreaFieldProps) => {
  const [field, { touched, error }] = useField(props);
  return (
    <div className={styles.container}>
      <div className={styles.label}>{props.label}</div>
      <textarea
        {...field}
        {...props}
        className={classNames(styles.input, props.className)}
      />
      {touched && error ? <div style={{ color: "red" }}>{error}</div> : null}
    </div>
  );
};

export default TextAreaField;
