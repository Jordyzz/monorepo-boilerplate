import React from "react";
import { default as ReactSelect, components } from "react-select";
import { useField } from "formik";

import styles from "./Select.module.scss";

const customStyles = () => {
  return {
    control: () => ({
      display: "flex",
      alignItems: "center",
      backgroundColor: "var(--white)",
      borderRadius: 15,
      height: 45,
      border: "1px solid var(--primary)",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      display: "flex",
      marginLeft: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "var(--white)" : "var(--fontPrimary)",
      backgroundColor: state.isSelected ? "var(--primary)" : "transparent",
      "&:hover": {
        backgroundColor: !state.isSelected && "var(--primaryLight)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--fontPrimary)",
    }),
    input: (provided) => ({
      ...provided,
      color: "var(--fontPrimary)",
    }),
  };
};

function Select(props) {
  const { options, placeholder, className } = props;
  const [field, { value: selectValue }, { setValue }] = useField(props.name);

  const handleChange = (newVal) => {
    setValue(newVal.label);
  };

  const Placeholder = (props) => {
    return (
      <components.Placeholder {...props}>
        {props.children}
      </components.Placeholder>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>{props.label}</div>
      <ReactSelect
        className={className}
        placeholder={placeholder || ""}
        onChange={handleChange}
        value={options.find((o) => o.label == selectValue)}
        components={{
          Placeholder,
        }}
        options={options}
        styles={customStyles()}
        isClearable={true}
      />
    </div>
  );
}

export default Select;
