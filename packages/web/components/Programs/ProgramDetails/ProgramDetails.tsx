import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";

import Icon from "../../Icon";
import Button from "../../Button";
import DetailItem from "./DetailItem";
import styles from "./ProgramDetails.module.scss";
import { ProgramDetailsProps } from "./ProgramDetails.interface";
import { DetailItemProps } from "./DetailItem/DetailItem.interface";

const ProgramDetails = ({
  id,
  title,
  description,
  chapters,
  updatedAt,
  duration,
  language,
  level,
}: ProgramDetailsProps) => {
  const [isChaptersOpen, setIsChaptersOpen] = useState(false);
  const router = useRouter();
  const itemDetails: Array<DetailItemProps> = useMemo(
    () => [
      {
        title: "Language",
        value: language,
        icon: "language",
        backgroundColor: "#C7E1FF",
      },
      {
        title: "Duration",
        value: duration,
        icon: "duration",
        backgroundColor: "#FFE1F0",
      },
      {
        title: "Level",
        value: level,
        icon: "level",
        backgroundColor: "#FFD4B4",
      },
    ],
    [language, duration, level]
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.chapterBox}>
        <div className={styles.chaptersHeader}>
          Chapters
          <Icon
            type={isChaptersOpen ? "upArrow" : "downArrow"}
            onClick={() => setIsChaptersOpen((prev) => !prev)}
          />
        </div>
        {isChaptersOpen &&
          chapters.map((c, idx) => (
            <div
              key={c.title}
              className={styles.chapter}
              onClick={() => {
                console.log("chapter");
                router.push({
                  pathname: `/program/${id}`,
                  query: { chapter: idx },
                });
              }}
            >
              <div className={styles.shapeContainer}>
                <div className={styles.circle} />
                <div className={styles.line} />
              </div>
              <div className={styles.chapterDetails}>
                <div className={styles.chapterTitle} title={c.title}>
                  {c.title}
                </div>
                <div
                  className={styles.chapterDescription}
                  title={c.description}
                >
                  {c.description}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.itemsContainer}>
        {itemDetails.map((item) => (
          <DetailItem key={item.value} {...item} />
        ))}
      </div>
      <div className={styles.updatedAt}>{updatedAt}</div>
      <Button
        className={styles.btn}
        onClick={() => router.push(`/program/${id}`)}
      >
        <div className={styles.btntext}>Start Program</div>
        <Icon type="rightArrow" />
      </Button>
    </div>
  );
};

export default ProgramDetails;
