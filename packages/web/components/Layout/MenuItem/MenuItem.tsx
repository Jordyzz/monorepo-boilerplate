import React from "react";
import Link from "next/link";
import classNames from "classnames";

import Icon from "../../Icon";
import styles from "./MenuItem.module.scss";
import { MenuItemProps } from "./MenuItem.interface";

const MenuItem = ({ iconType, title, path, label, active }: MenuItemProps) => {
  return (
    <Link href={path}>
      <div>
        {title && <div className={styles.title}>{title}</div>}
        <div
          className={classNames(
            styles.container,
            active && styles.activeContainer
          )}
        >
          <Icon type={iconType} />
          <a className={styles.label}>{label}</a>
          {active && (
            <div className={styles.activeArrow}>
              <Icon type="rightArrow" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
