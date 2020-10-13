import React from "react";
import classNames from "classnames";

import styles from "./ProgramThumbnail.module.scss";
import { ProgramThumbnailProps } from "./ProgramThumbnail.interface";
import { themeService } from "../../../core/ThemeService";

const ProgramThumbnail = ({
  index,
  id,
  title,
  description,
  upVotes,
  language,
  onClick,
  isSelected,
}: ProgramThumbnailProps) => {
  const {
    backgroundColor,
    primary,
    secondary,
    tretiary,
  } = themeService.getProgramPallete(index);

  const imageNumber = index % 3 == 0 ? 3 : index % 2 == 0 ? 2 : 1;
  const rating = !upVotes.length
    ? null
    : (upVotes.filter((v) => v.value === 1).length / upVotes.length) * 100;

  return (
    <div
      className={classNames(styles.container, isSelected && styles.selected)}
      style={{
        backgroundColor,
        border: isSelected ? `2px solid ${secondary}` : "none",
      }}
      onClick={() => onClick(id)}
    >
      <div
        className={styles.progressBar}
        style={{ backgroundColor: secondary }}
      />
      <div
        className={styles.image}
        style={{
          backgroundImage: `url("/images/isometric${imageNumber}.png")`,
        }}
      />
      <div className={styles.details}>
        <div className={styles.languageBox}>{language}</div>
        <div className={styles.title} style={{ color: primary }}>
          {title}
        </div>
        <div className={styles.description} style={{ color: tretiary }}>
          {description}
        </div>
      </div>
      {rating && (
        <div
          className={styles.ratingWrapper}
          style={{
            backgroundImage: `conic-gradient(${secondary} ${rating}%, transparent ${rating}%)`,
          }}
        >
          <div className={styles.rating}>
            {rating}
            <span className={styles.percent}>%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramThumbnail;
