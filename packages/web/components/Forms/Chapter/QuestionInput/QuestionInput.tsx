import React, { useState, useEffect } from "react";

import styles from "./QuestionInput.module.scss";
import { QuestionInputProps } from "./QuestionInput.interface";
import InputField from "../../InputField";
import TextAreaField from "../../TextAreaField";
import { QuestionOptions } from "../Chapter.interface";

type OptionKeys = keyof QuestionOptions | "";

const optionIds: Array<OptionKeys> = ["a", "b", "c", "d"];

const QuestionInput = ({
  correctAnswer,
  options,
  question,
  codeSample,
  index,
  setQuestions,
}: QuestionInputProps) => {
  const [questionInput, setQuestion] = useState(question);
  const [optionsInput, setOptions] = useState(options);
  const [codeSampleInput, setCodeSample] = useState(codeSample);
  const [correctAnswerInput, setCorrectAnswer] = useState(correctAnswer);

  useEffect(() => {
    setQuestions((prevState) => {
      const allQuestions = [...prevState];
      allQuestions[index] = {
        question: questionInput,
        options: optionsInput,
        codeSample: codeSampleInput,
        correctAnswer: correctAnswerInput,
      };

      return allQuestions;
    });
  }, [questionInput, optionsInput, codeSampleInput, correctAnswerInput]);

  return (
    <div className={styles.container}>
      <div className={styles.questionFields}>
        <InputField
          name={`question${index}`}
          label={`Question ${index + 1}`}
          onChange={(e) => setQuestion(e.target.value)}
          value={questionInput}
          autoFocus={true}
        />
        <TextAreaField
          name={`codeSample${index}`}
          label="Code Sample (optional)"
          onChange={(e) => setCodeSample(e.target.value)}
          value={codeSampleInput}
        />
        <InputField
          name={`answer${index}`}
          label="Correct Answer"
          placeholder="'a', 'b', 'c' or 'd'"
          onChange={(e) => {
            const value = e.target.value as OptionKeys;
            if (optionIds.includes(value) || value == "")
              setCorrectAnswer(value);
          }}
          value={correctAnswerInput}
        />
      </div>
      <div className={styles.optionsFields}>
        {optionIds.map((option) => (
          <InputField
            key={option}
            name={option}
            label={`Answer ${option}:`}
            onChange={(e) =>
              setOptions((prevState) => {
                const allOptions = { ...prevState };
                allOptions[option] = e.target.value;
                return allOptions;
              })
            }
            value={optionsInput[option]}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionInput;
