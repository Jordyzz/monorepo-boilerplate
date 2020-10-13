import React from "react";

import styles from "./DetailItem.module.scss";
import { DetailItemProps } from "./DetailItem.interface";
import Icon from "../../../Icon";

const DetailItem = ({
  title,
  value,
  backgroundColor,
  icon,
}: DetailItemProps) => {
  return (
    <div className={styles.itemBox}>
      <div className={styles.iconBox} style={{ backgroundColor }}>
        <Icon type={icon} />
      </div>
      <div className={styles.textBox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
};

export default DetailItem;
