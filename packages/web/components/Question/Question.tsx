import React, { useState } from "react";
import classNames from "classnames";

import { QuestionOptionsInput } from "@tango/controllers";

import { QuestionProps } from "./Question.interface";
import styles from "./Question.module.scss";

const answerIds: Array<keyof QuestionOptionsInput> = ["a", "b", "c", "d"];

const Question = ({
  question,
  codeSample,
  correctAnswer,
  options,
  selectedAnswer,
  setSelectedAnswer,
}: QuestionProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.question}>{question}</div>
      <code className={styles.codeSample}>{codeSample}</code>
      <div className={styles.options}>
        {answerIds.map((answer) => (
          <div key={answer} className={styles.radioBox}>
            <div
              onClick={() => setSelectedAnswer(answer)}
              className={classNames(
                styles.radioBtn,
                answer !== selectedAnswer
                  ? ""
                  : selectedAnswer === correctAnswer
                  ? styles.radioCorrect
                  : styles.radioIncorrect
              )}
            >
              {`${answer}. ${options[answer]}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
