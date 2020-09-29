import React, { useState, useEffect } from "react";
import { useField } from "formik";
import classNames from "classnames";

import styles from "./Chapter.module.scss";
import { ChapterProps, QuestionType } from "./Chapter.interface";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import Button from "../../Button";
import QuestionInput from "./QuestionInput";
import Icon from "../../Icon";

const initialQuestionState: QuestionType = {
  question: "",
  codeSample: "",
  options: { a: "", b: "", c: "", d: "" },
  correctAnswer: "a",
};

const Chapter = ({
  fieldName,
  questions,
  title,
  description,
  index,
}: ChapterProps) => {
  const [field, { value }, { setValue }] = useField(fieldName);
  const [isExpanded, setIsExpanded] = useState(true);
  const [titleInput, setTitle] = useState(title);
  const [descriptionInput, setDescription] = useState(description);
  const [questionsInput, setQuestions] = useState(questions);

  useEffect(() => {
    const allChapters = [...value];
    allChapters[index] = {
      title: titleInput,
      description: descriptionInput,
      questions: questionsInput,
    };
    setValue(allChapters);
  }, [titleInput, descriptionInput, questionsInput]);

  return (
    <div className={styles.container}>
      <Icon
        type={isExpanded ? "downArrow" : "upArrow"}
        onClick={() => setIsExpanded((prevState) => !prevState)}
        className={styles.expansionIcon}
      />
      {isExpanded ? (
        <>
          <InputField
            name={`title${index}`}
            label={`Chapter ${index + 1} Title`}
            onChange={(e) => setTitle(e.target.value)}
            value={titleInput}
            autoFocus={true}
          />
          <TextAreaField
            name={`description${index}`}
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={descriptionInput}
          />

          <div className={styles.questionsContainer}>
            <div className={styles.questionsHeader}>Questions</div>
            {questionsInput &&
              questionsInput.map((question, i) => (
                <QuestionInput
                  key={question.question + i}
                  index={i}
                  {...{ setQuestions }}
                  {...question}
                />
              ))}
            <div className={styles.emptyChapter}>
              <Button
                className={styles.addChapter}
                onClick={() =>
                  setQuestions((prevState) => [
                    ...prevState,
                    { ...initialQuestionState },
                  ])
                }
              >
                Add Question
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.closedTitle}>{title}</div>
          <div className={styles.closedDescription}>{description}</div>
        </>
      )}
    </div>
  );
};

export default Chapter;
