import React from "react";

import styles from "./GlobalBI.module.scss";
import Icon from "../Icon";

const GlobalBI = () => {
  return (
    <div className={styles.container}>
      <Icon type="spinner" />
    </div>
  );
};

export default GlobalBI;
